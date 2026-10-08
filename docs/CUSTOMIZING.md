# Customizing the site

Edit any file on github.com by opening it and clicking the pencil icon. Save with **Commit changes**.

## Colors

Open `assets/css/site.css`. Near the top, find `:root` (light mode) and `:root[data-theme="dark"]` (dark mode). Change the color codes there:

| Name | What it controls |
| --- | --- |
| `--primary` | The orange used for buttons and highlights |
| `--accent` | The teal used for "stable" labels |
| `--bg`, `--bg-elev`, `--bg-sunk` | Page, card and footer backgrounds |
| `--text`, `--text-2`, `--text-3` | Main, secondary and quiet text |

Keep text readable: the light button color needs white text with a contrast of at least 4.5. A free checker is at webaim.org/resources/contrastchecker.

## Text

Each page is a plain `.html` file in the repository root: `index.html`, `projects.html`, `about.html`, `contact.html`, `404.html`. Edit the words between tags, such as `<p>…</p>`. Leave the tags themselves alone.

The email address appears in `contact.html` and in `assets/js/contact.js`; change both.

## Fonts

Fonts load from Google Fonts in the `<link rel="stylesheet" href="https://fonts.googleapis.com/…">` line in each page's `<head>`. The font names are set in `site.css` by `--font-display`, `--font-body`, `--font-serif` and `--font-mono`. If you change families, update that link in all five pages.

## Images and icons

| File | Purpose |
| --- | --- |
| `favicon.svg`, `favicon.ico` | Browser tab icon |
| `apple-touch-icon.png` | iPhone home screen icon (180 by 180) |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | App icons listed in `site.webmanifest` |
| `og-image.png` | The preview picture shown when the site is shared (1200 by 630) |

To replace one, open the repository folder, click **Add file > Upload files**, and upload a file with the same name.

## Project list

See "Add a new project" in [DEPLOYMENT.md](DEPLOYMENT.md).

## Search engines

`sitemap.xml` lists the pages. Add a `<url><loc>…</loc></url>` entry if you add a new page.

## Page address and Content Security Policy

Each page has a `Content Security Policy` line in its `<head>`. It lists the only places the page may load code, styles and fonts from. If you add a script, style sheet or font from another website, add that website to the line, or the browser will block it.
