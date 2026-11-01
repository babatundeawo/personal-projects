# Deployment

The site is published to GitHub Pages by GitHub Actions. There is nothing to run on your computer.

## What happens when you save a change

1. You commit a change to the `main` branch (for example by editing a file on github.com).
2. The **Deploy site** workflow starts (Actions tab).
3. It **builds** the site: it downloads the fonts, assembles the pages, builds the project list from `data/projects.json`, writes the offline service worker and app manifest, and **checks** the result.
4. If every check passes, it **publishes** to GitHub Pages.
5. It then **visits the live site** and confirms the home page, the install manifest and the offline worker are really there.

A green tick on all three steps means the live site is correct. This usually takes one to two minutes.

## One-time setup

1. Repository **Settings > Pages**. Under **Build and deployment > Source**, choose **GitHub Actions**.
2. Push or merge to `main` once. The first run publishes the site.

The address is `https://<your-username>.github.io/<repository-name>/` and is worked out automatically from the repository name. If you rename the repository, the next publish adapts by itself.

## Changing a pull request safely

When someone opens a pull request, **Check pull request** builds and checks it and attaches a **site-preview** download (Actions run page, bottom, Artifacts). Nothing is published until the change is merged.

## If a publish fails

Open the **Actions** tab, click the red run, then click the red step. The message says what is wrong in plain language, for example:

| Message | What it means | Fix |
| --- | --- | --- |
| `index.html is missing or has lost its first two lines` | The first two lines of a page were edited | Restore the `<!doctype html>` line and the `<!--meta ...-->` line below it |
| `broken link or file reference` | A page points to a file that does not exist | Fix the name, or add the file |
| `unknown include` | A `<!--@include name-->` line has a typo | Valid names: `head`, `header`, `footer`, `pwa-ui` |
| `inline style=""` | Someone added a `style="..."` attribute | Move the style into a `.css` file (the security policy blocks inline styles) |
| `Fonts: 0 of 4 font files found` (yellow warning) | The font download did not work this time | Nothing breaks; the site uses system fonts. Re-run the workflow |

You can re-run any workflow with **Re-run all jobs**, or start a publish by hand from **Actions > Deploy site > Run workflow**.

## Roll back

Publishing is just "build whatever is on `main`". To undo a bad change, open the commit on the **Commits** page and choose **Revert**, then merge. The site rebuilds from the reverted code.

## How updates reach visitors

The offline worker has a version number that changes whenever any site file changes. Visitors who already have the site see a small **A new version is ready. Refresh** prompt on their next visit. Their page is never reloaded without them tapping Refresh.

## Adding a new project

1. Add the folder to the repository as usual.
2. Open `data/projects.json`, click the pencil, and add a line like `{ "name": "My Project", "path": "my-project" }` inside the right collection. Mind the commas.
3. Commit. The count on every page, the search and the **Open** link (when the folder has an `index.html`) update automatically.

The workflow log lists any folder that is not in `data/projects.json`, so nothing is forgotten silently.

## Custom domain (optional)

Add a file named `CNAME` at the top of the repository containing only your domain (for example `example.com`), set the domain in **Settings > Pages**, and publish. The build detects the file and uses the domain for every address on the site.

## Security notes

- Each page carries a Content Security Policy that only allows files from this site. GitHub Pages cannot send HTTP security headers, so the policy is set in the page itself; it therefore cannot include `frame-ancestors`.
- The workflows request the least permission they need, and Dependabot proposes updates to them weekly.
- Nothing on the site stores personal data. The contact form opens the visitor's own email app.
