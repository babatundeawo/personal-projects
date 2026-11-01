# Customizing the site

Edit any file on github.com by opening it and clicking the pencil icon. Save with **Commit changes**. The site republishes by itself.

## Words

Each page is a plain `.html` file in the top folder: `index.html`, `projects.html`, `about.html`, `contact.html`, `404.html`, `offline.html`. Change the words between tags such as `<p>...</p>`. Leave the tags and the first two lines (the `<!doctype html>` line and the `<!--meta ...-->` line) alone. The `<!--meta ...-->` line holds that page's title and search description; you can edit the text inside the quote marks.

The header and footer are shared and live in `partials/header.html` and `partials/footer.html`. Change them once and every page follows.

## Colors

Open `assets/css/site.css`. The color block near the top defines every color twice: a hex value and a more precise `oklch` value. Change both for a color. The most useful ones:

| Name | What it controls |
| --- | --- |
| `--primary` | The orange used for buttons and the accents |
| `--primary-text` | The orange when used as text |
| `--accent` | The teal used for "stable" labels and Open links |
| `--bg`, `--elev`, `--sunk` | Page, card and footer backgrounds |
| `--text`, `--text-2`, `--text-3` | Main, secondary and quiet text |

Keep text readable: aim for a contrast of at least 4.5 (checker: webaim.org/resources/contrastchecker). The current colors were all measured and pass in light and dark.

## The project list

`data/projects.json` is the one list that feeds the Projects page, the filters, the counts and the Open links. See "Adding a new project" in [DEPLOYMENT.md](DEPLOYMENT.md).

## Email address

It appears in `contact.html` and in `assets/js/contact.js`. Change both.

## Names

`data/site.json` holds the site name and your GitHub names. They feed page titles, sharing previews and search-engine data.

## Fonts

The fonts are downloaded and served from the site itself on every publish (Geist, Geist Mono, Instrument Serif). To use different ones, edit the `@font-face` lines at the top of `assets/css/site.css`, the font list in `scripts/build.mjs` and the download line in `.github/actions/build-site/action.yml`.

## Icons and sharing picture

| File | Purpose |
| --- | --- |
| `favicon.svg`, `favicon.ico` | Browser tab icon |
| `apple-touch-icon.png` | iPhone home screen icon (180 by 180) |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | App icons used when installed |
| `og-image.png` | The picture shown when the site is shared (1200 by 630) |
| `assets/screenshots/wide.png`, `narrow.png` | Pictures in the install prompt on some browsers |

To replace one, open the folder, choose **Add file > Upload files** and upload a file with the same name. The maskable icon needs its picture inside the middle 60 percent, because phones crop the edges into a circle or squircle.

## Change the install prompt timing

In `assets/js/pwa.js`, the numbers `25000` (first visit) and `6000` (later visits) are milliseconds before the install card appears. `DISMISS_DAYS` is how long it stays away after "Not now".

## Search engines

`sitemap.xml` and `robots.txt` are regenerated on every publish from your pages. Nothing to edit.
