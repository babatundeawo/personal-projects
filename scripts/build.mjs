#!/usr/bin/env node
/**
 * Build Log site builder. Runs inside GitHub Actions (you never run it yourself).
 *
 *   node scripts/build.mjs            assemble the site into _site/
 *   node scripts/build.mjs --check    assemble, then verify the result (fails on a broken site)
 *
 * What it does:
 *   1. Works out the public address and base path from the repository name (or a CNAME file).
 *   2. Copies the repository into _site/ (leaving out files that only matter on GitHub).
 *   3. Builds every page from the templates in the repository root plus partials/.
 *   4. Builds the project index from data/projects.json.
 *   5. Copies the self-hosted fonts, then writes sw.js, site.webmanifest, sitemap.xml and robots.txt.
 *   6. With --check: confirms nothing is missing or broken.
 *
 * It has no dependencies: Node's own libraries only.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";

const ROOT = process.cwd();
const OUT = path.join(ROOT, process.env.OUT_DIR || "_site");
const CHECK = process.argv.includes("--check");
const site = JSON.parse(fs.readFileSync(path.join(ROOT, "data/site.json"), "utf8"));

const problems = [];
const warnings = [];
const fail = (msg) => problems.push(msg);
const warn = (msg) => warnings.push(msg);

/* ---------- 1. Address and base path ---------- */
function resolveAddress() {
  const cname = path.join(ROOT, "CNAME");
  if (fs.existsSync(cname)) {
    const domain = fs.readFileSync(cname, "utf8").split(/\r?\n/)[0].trim();
    if (domain) return { origin: `https://${domain}`, base: "/" };
  }
  if (process.env.SITE_URL) {
    const u = new URL(process.env.SITE_URL);
    const base = u.pathname.endsWith("/") ? u.pathname : `${u.pathname}/`;
    return { origin: u.origin, base };
  }
  const slug = process.env.GITHUB_REPOSITORY || `${site.githubUser}/${site.githubRepo}`;
  const [owner, repo] = slug.split("/");
  const origin = `https://${owner.toLowerCase()}.github.io`;
  const userSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
  return { origin, base: userSite ? "/" : `/${repo}/` };
}
const { origin: ORIGIN, base: BASE } = resolveAddress();
const SITE = `${ORIGIN}${BASE}`;
console.log(`Address: ${SITE}  (base path ${BASE})`);

/* ---------- Helpers ---------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const write = (rel, data) => {
  const dest = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, data);
};
const sha256 = (data) => crypto.createHash("sha256").update(data).digest();

/** Finds a path ignoring upper/lower case in folder names (the repository may differ from the list on Windows). */
function findPath(rel) {
  let cur = ROOT;
  const parts = rel.split("/").filter(Boolean);
  const real = [];
  for (const part of parts) {
    let names;
    try { names = fs.readdirSync(cur); } catch { return null; }
    const hit = names.includes(part) ? part : names.find((n) => n.toLowerCase() === part.toLowerCase());
    if (!hit) return null;
    real.push(hit);
    cur = path.join(cur, hit);
  }
  return real.join("/");
}

/* ---------- 2. Copy the repository ---------- */
const SKIP_TOP = new Set([
  ".git", ".github", "_site", "node_modules", ".fonts", "docs", "scripts", "partials", "data",
  "README.md", "CONTRIBUTING.md", "SECURITY.md", ".gitignore", ".gitattributes", ".htmlvalidate.json", "package.json", "package-lock.json",
]);
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
function copyTree(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const src = path.join(dir, entry.name);
    const rel = path.relative(ROOT, src).split(path.sep);
    if (rel.length === 1 && SKIP_TOP.has(rel[0])) continue;
    if (rel.includes("node_modules") || rel.includes(".git")) continue;
    if (entry.name.startsWith(".") && entry.name !== ".nojekyll") continue; // keeps .env files and editor files out
    if (src === OUT) continue;
    if (entry.isDirectory()) copyTree(src);
    else if (entry.isFile()) {
      const dest = path.join(OUT, ...rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    }
  }
}
copyTree(ROOT);
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

/* ---------- 3. Fonts ---------- */
const FONT_DIR = path.resolve(ROOT, process.env.FONT_SRC || ".fonts");
const FONT_FILES = [
  ["geist-latin-wght-normal.woff2", "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2"],
  ["geist-mono-latin-wght-normal.woff2", "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2"],
  ["instrument-serif-latin-400-normal.woff2", "@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2"],
  ["instrument-serif-latin-400-italic.woff2", "@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2"],
];
const fontsPresent = [];
fs.mkdirSync(path.join(OUT, "assets/fonts"), { recursive: true });
for (const [name, rel] of FONT_FILES) {
  const src = path.join(FONT_DIR, "node_modules", rel);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(OUT, "assets/fonts", name));
    fontsPresent.push(name);
  }
}
if (fontsPresent.length !== FONT_FILES.length) {
  warn(`Fonts: ${fontsPresent.length} of ${FONT_FILES.length} font files found. The site still works with system fonts. In GitHub Actions the "Download the fonts" step normally provides them.`);
}

/* ---------- 4. Projects ---------- */
const projectData = JSON.parse(read("data/projects.json"));
const LIVE_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 11l6-6M6 5h5v5"/></svg>';
const listedTop = new Set();
let nProjects = 0;
let nLive = 0;
const directory = [];
const filters = [`            <button class="filter" type="button" data-group="all" aria-pressed="true">All <span>__TOTAL__</span></button>`];

for (const group of projectData.groups) {
  const lis = [];
  for (const item of group.items) {
    nProjects += 1;
    const real = findPath(item.path);
    if (!real) warn(`Project not found in the repository: "${item.path}" (${item.name}). It is listed without an Open link.`);
    const use = real || item.path;
    listedTop.add(use.split("/")[0].toLowerCase());
    const isFile = /\.html?$/i.test(use);
    const gh = `https://github.com/${site.githubUser}/${site.githubRepo}/${isFile ? "blob" : "tree"}/main/${use.split("/").map(encodeURIComponent).join("/")}`;
    let live = null;
    if (real) {
      if (isFile) live = real;
      else if (fs.existsSync(path.join(ROOT, real, "index.html"))) live = `${real}/index.html`;
    }
    let li = `              <li class="dir-item"><a class="dir-item__name" href="${esc(gh)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.name)}, code on GitHub (opens in a new tab)">${esc(item.name)}</a>`;
    if (live) {
      nLive += 1;
      li += `<a class="dir-item__live" href="${esc(live.split("/").map(encodeURIComponent).join("/"))}" aria-label="Open ${esc(item.name)} in your browser">Open ${LIVE_ICON}</a>`;
    }
    lis.push(li + "</li>");
  }
  const count = group.items.length;
  directory.push(`          <section class="group reveal" id="${group.id}" data-group="${group.id}" aria-labelledby="${group.id}-t">
            <div class="group__head"><h2 id="${group.id}-t">${esc(group.title)}</h2><span class="group__count">${count}</span></div>${group.note ? `\n            <p class="group__note">${esc(group.note)}</p>` : ""}
            <ul class="dir-list">
${lis.join("\n")}
            </ul>
          </section>`);
  filters.push(`            <button class="filter" type="button" data-group="${group.id}" aria-pressed="false">${esc(group.title)} <span>${count}</span></button>`);
}
const nStandalone = projectData.groups[0] ? projectData.groups[0].items.length : 0;

// Tell the owner about folders that are not in data/projects.json (informational).
const NOT_PROJECTS = new Set([...SKIP_TOP].map((s) => s.toLowerCase()).concat(["assets"]));
const unlisted = fs.readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith(".") && !NOT_PROJECTS.has(d.name.toLowerCase()) && !listedTop.has(d.name.toLowerCase()))
  .map((d) => d.name);
if (unlisted.length) warn(`Folders not listed in data/projects.json (they are published but not shown on the Projects page): ${unlisted.join(", ")}`);

/* ---------- 5. Pages ---------- */
const partials = {};
for (const f of fs.readdirSync(path.join(ROOT, "partials"))) partials[f.replace(/\.html$/, "")] = read(`partials/${f}`).trimEnd();

const themeInit = read("assets/js/theme-init.js").trim();
const themeHash = crypto.createHash("sha256").update(themeInit).digest("base64");
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'sha256-${themeHash}'`,
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

const pageFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html") && read(f).startsWith("<!doctype html>\n<!--meta "));
if (!pageFiles.includes("index.html")) fail("index.html is missing or has lost its first two lines (the <!doctype> and the <!--meta ...--> comment).");

function jsonLd(meta, canonical) {
  const id = (frag) => ({ "@id": `${SITE}#${frag}` });
  const graph = [];
  if (meta.type === "home") {
    graph.push({ "@type": "WebSite", "@id": `${SITE}#website`, url: SITE, name: site.siteName, inLanguage: "en", publisher: id("person") });
    graph.push({ "@type": "Person", "@id": `${SITE}#person`, name: site.author, url: `https://github.com/${site.githubUser}`, sameAs: [`https://github.com/${site.githubUser}`] });
  } else if (["collection", "about", "contact"].includes(meta.type)) {
    const type = { collection: "CollectionPage", about: "AboutPage", contact: "ContactPage" }[meta.type];
    graph.push({ "@type": type, "@id": `${canonical}#webpage`, url: canonical, name: meta.title, description: meta.description, inLanguage: "en", isPartOf: id("website") });
  } else return "";
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}

const builtPages = [];
for (const file of pageFiles) {
  let html = read(file);
  const m = html.match(/<!--meta (\{.*?\})-->\n?/s);
  if (!m) { fail(`${file}: the <!--meta ...--> line is not valid.`); continue; }
  let meta;
  try { meta = JSON.parse(m[1]); } catch { fail(`${file}: the <!--meta ...--> line is not valid JSON.`); continue; }
  html = html.replace(m[0], "");

  const root = meta.abs ? BASE : "";
  const canonical = meta.path === "index.html" ? SITE : `${SITE}${meta.path}`;

  // Includes
  html = html.replace(/<!--@include ([\w-]+)-->/g, (_, name) => {
    if (!(name in partials)) { fail(`${file}: unknown include "${name}".`); return ""; }
    return partials[name];
  });

  const pageCss = (meta.css || []).map((c) => `<link rel="stylesheet" href="${root}assets/css/${c}.css" />`).join("\n    ");
  const scripts = ["site", "pwa", ...(meta.scripts || [])].map((s) => `<script src="${root}assets/js/${s}.js" defer></script>`).join("\n    ");
  const fontPreload = fontsPresent.includes(FONT_FILES[0][0])
    ? `<link rel="preload" href="${root}assets/fonts/${FONT_FILES[0][0]}" as="font" type="font/woff2" crossorigin />` : "";

  const tokens = {
    TITLE: esc(meta.title), DESCRIPTION: esc(meta.description), CANONICAL: canonical, SITE, BASE, ROOT: root,
    SITE_NAME: esc(site.siteName), CSP, THEME_INIT: themeInit, PAGE_CSS: pageCss, SCRIPTS: scripts, FONT_PRELOAD: fontPreload,
    ROBOTS_TAG: meta.robots ? `<meta name="robots" content="${meta.robots}" />` : "",
    JSONLD: jsonLd(meta, canonical),
    N_PROJECTS: String(nProjects), N_STANDALONE: String(nStandalone), N_LIVE: String(nLive),
    FILTERS: filters.join("\n").replace("__TOTAL__", String(nProjects)), DIRECTORY: directory.join("\n"),
  };
  // Case-tolerant links to folders in the repository ({{P:folder/file}} and {{GH:folder}}).
  html = html.replace(/\{\{P:([^}]+)\}\}/g, (_, rel) => findPath(rel) || rel);
  html = html.replace(/\{\{GH:([^}]+)\}\}/g, (_, rel) => `https://github.com/${site.githubUser}/${site.githubRepo}/tree/main/${(findPath(rel) || rel).split("/").map(encodeURIComponent).join("/")}`);
  // Order matters: tokens may contain other tokens (e.g. ROOT inside partials), so replace repeatedly.
  for (let pass = 0; pass < 3; pass++) {
    html = html.replace(/\{\{([A-Z_]+)\}\}/g, (all, key) => (key in tokens ? tokens[key] : all));
  }

  // Mark the current page in the navigation.
  html = html.replace(/ data-nav="(\w+)"/g, (_, name) => (name === meta.current ? ' aria-current="page"' : ""));
  html = html.replace(/\n{3,}/g, "\n\n");

  write(file, html);
  builtPages.push({ file, meta, canonical });
}

/* ---------- 6. Service worker, manifest, sitemap, robots ---------- */
const precache = [
  "", "index.html", "projects.html", "about.html", "contact.html", "offline.html", "site.webmanifest",
  "favicon.svg", "apple-touch-icon.png", "icon-192.png", "icon-512.png",
  "assets/css/site.css", "assets/css/home.css", "assets/css/projects.css", "assets/css/about.css", "assets/css/contact.css",
  "assets/js/site.js", "assets/js/pwa.js", "assets/js/projects.js", "assets/js/contact.js", "assets/js/offline.js",
  ...fontsPresent.map((f) => `assets/fonts/${f}`),
];

// Manifest first, because the service worker version includes its content.
const manifest = read("site.webmanifest").replace(/\{\{BASE\}\}/g, BASE);
write("site.webmanifest", manifest);

const hash = crypto.createHash("sha256");
for (const rel of precache) {
  const p = path.join(OUT, rel || "index.html");
  if (fs.existsSync(p)) hash.update(rel).update(fs.readFileSync(p));
  else fail(`Precache file missing from the built site: ${rel || "(home)"}`);
}
hash.update(read("sw.js"));
const VERSION = hash.digest("hex").slice(0, 12);
write("sw.js", read("sw.js").replace("{{VERSION}}", VERSION).replace(/\{\{BASE\}\}/g, BASE).replace("{{PRECACHE}}", JSON.stringify(precache)));

const ORDER = ["index.html", "projects.html", "about.html", "contact.html"];
const sitemapPages = builtPages.filter((p) => p.meta.robots !== "noindex").sort((a, b) => (ORDER.indexOf(a.file) + 1 || 99) - (ORDER.indexOf(b.file) + 1 || 99));
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages.map((p) => `  <url><loc>${p.canonical}</loc></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);

console.log(`Built ${builtPages.length} pages, ${nProjects} projects (${nLive} open in the browser), service worker version ${VERSION}.`);

/* ---------- 7. Checks ---------- */
function runChecks() {
  const need = ["index.html", "projects.html", "about.html", "contact.html", "404.html", "offline.html", "sw.js", "site.webmanifest", "sitemap.xml", "robots.txt", "og-image.png", "favicon.svg", "favicon.ico", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "assets/css/site.css", "assets/js/site.js", "assets/js/pwa.js", ".nojekyll"];
  for (const f of need) if (!fs.existsSync(path.join(OUT, f))) fail(`Required file is missing: ${f}`);

  // Manifest and service worker
  try {
    const mf = JSON.parse(fs.readFileSync(path.join(OUT, "site.webmanifest"), "utf8"));
    for (const key of ["name", "short_name", "start_url", "scope", "display", "icons"]) if (!mf[key]) fail(`site.webmanifest has no "${key}".`);
    const sizes = new Set((mf.icons || []).map((i) => i.sizes));
    for (const s of ["192x192", "512x512"]) if (!sizes.has(s)) fail(`site.webmanifest needs a ${s} icon.`);
    if (!(mf.icons || []).some((i) => i.purpose === "maskable")) fail("site.webmanifest needs a maskable icon.");
    const refs = [...(mf.icons || []).map((i) => i.src), ...(mf.screenshots || []).map((s) => s.src), ...(mf.shortcuts || []).map((s) => s.url)];
    for (const ref of refs) {
      if (!ref.startsWith(BASE)) { fail(`Manifest path is outside the base path ${BASE}: ${ref}`); continue; }
      const rel = ref.slice(BASE.length).split("?")[0];
      if (!fs.existsSync(path.join(OUT, rel))) fail(`Manifest points to a missing file: ${ref}`);
    }
    if (!mf.start_url.startsWith(BASE) || !mf.scope.startsWith(BASE)) fail("Manifest start_url or scope is outside the base path.");
  } catch (e) { fail(`site.webmanifest is not valid JSON: ${e.message}`); }
  try { new vm.Script(fs.readFileSync(path.join(OUT, "sw.js"), "utf8")); } catch (e) { fail(`sw.js has a syntax error: ${e.message}`); }
  if (/\{\{[A-Z_]+\}\}/.test(fs.readFileSync(path.join(OUT, "sw.js"), "utf8"))) fail("sw.js still contains an unfilled {{PLACEHOLDER}}.");

  // Pages
  for (const { file, canonical } of builtPages) {
    const html = fs.readFileSync(path.join(OUT, file), "utf8");
    if (/\{\{[A-Za-z_:./-]+\}\}/.test(html)) fail(`${file}: an unfilled {{PLACEHOLDER}} is left in the page.`);
    if (/<!--@include/.test(html)) fail(`${file}: an include was not replaced.`);
    if (!html.includes(`href="${canonical}"`)) fail(`${file}: canonical link is wrong.`);
    if (/ style="/.test(html)) fail(`${file}: has an inline style="" attribute, which the Content Security Policy blocks.`);
    if (/\son[a-z]+="/.test(html)) fail(`${file}: has an inline event handler, which the Content Security Policy blocks.`);
    const inline = html.match(/<script>([\s\S]*?)<\/script>/);
    if (!inline || crypto.createHash("sha256").update(inline[1]).digest("base64") !== themeHash) fail(`${file}: the inline theme script does not match its Content Security Policy hash.`);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
    if (dup.length) fail(`${file}: duplicate id(s): ${[...new Set(dup)].join(", ")}`);
    if (!/<title>[^<]+<\/title>/.test(html) || !/<meta name="description" content="[^"]{20,}"/.test(html)) fail(`${file}: missing title or description.`);
    if (!/<h1[\s>]/.test(html)) fail(`${file}: missing an h1.`);
    for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
      const ref = m[1];
      if (!ref || /^(https?:|mailto:|tel:|data:|#|javascript:)/.test(ref)) continue;
      let rel;
      if (ref.startsWith("/")) { if (!ref.startsWith(BASE)) { fail(`${file}: link outside the base path: ${ref}`); continue; } rel = ref.slice(BASE.length); }
      else rel = ref;
      rel = decodeURIComponent(rel.split("#")[0].split("?")[0]);
      if (rel === "") rel = "index.html";
      const target = path.join(OUT, rel);
      if (!fs.existsSync(target) || (fs.statSync(target).isDirectory() && !fs.existsSync(path.join(target, "index.html")))) fail(`${file}: broken link or file reference: ${ref}`);
    }
  }
  const sm = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
  for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const rel = m[1].slice(SITE.length) || "index.html";
    if (!fs.existsSync(path.join(OUT, rel))) fail(`sitemap.xml lists a page that does not exist: ${m[1]}`);
  }
}

if (CHECK) runChecks();

for (const w of warnings) console.log(`::warning::${w}`);
if (problems.length) {
  for (const p of problems) console.log(`::error::${p}`);
  console.log(`\n${problems.length} problem(s) would have shipped a broken site. See the red lines above.`);
  process.exit(1);
}
if (CHECK) console.log("All checks passed.");
