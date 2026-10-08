# Deployment guide

Everything here is done in your web browser, on github.com. You never need a terminal.

## How it works, in plain words

- Your website is the set of files in this repository.
- Whenever a change lands on the **main** branch, a robot called **GitHub Actions** copies the site, runs some checks, and publishes it to **GitHub Pages** at `https://babatundeawo.github.io/personal-projects/`.
- Changes you want to review first go on a separate **branch** and arrive as a **pull request**. The live site does not change until you **merge** the pull request.
- Every older version stays in the repository's history, so you can always go back.

## One-time setup: switch publishing to GitHub Actions

1. Open the repository on github.com.
2. Click **Settings** (top row of tabs).
3. In the left menu click **Pages**.
4. Under **Build and deployment**, find **Source** and choose **GitHub Actions**.

You should see the Source drop-down now says "GitHub Actions". This only needs doing once.

## Make a change and review it before it goes live

Use this for any edit you want to look at first.

1. Open the file on github.com and click the pencil icon (**Edit this file**).
2. Make your change. At the bottom choose **Create a new branch for this commit and start a pull request**, then click **Propose changes**.
3. Click **Create pull request**.
4. Wait about two minutes. At the bottom of the pull request you should see **Build and check** with a green tick. Click **Details**, scroll down to **Artifacts**, and download **site-preview**.
5. Unzip `site-preview` and double-click `index.html` to look at the site in your browser. Resize the window to check phone sizes too.
6. Happy? Click **Merge pull request**, then **Confirm merge**. The site updates within a minute or two. Not happy? Click **Close pull request**. The live site is untouched either way.

GitHub Pages cannot host a live preview of a pull request, so the downloadable preview stands in for one.

## Check that a deployment worked

1. Click the **Actions** tab.
2. Open the newest run called **Deploy site**.
3. A **green tick** means it worked: the site is live within a minute. A **red cross** means something failed.
4. Open your site address and refresh. If you still see the old page, hold **Shift** and click refresh.

## Reading an error

1. In the **Actions** tab click the run with the red cross.
2. Click the red step (for example **Build and check**).
3. Look for a line starting with `Error`. It names the file or problem.

| You see | What it means | What to do |
| --- | --- | --- |
| `Missing index.html` (or another page) | A required file was deleted or renamed | Put the file back, or revert the change (see below) |
| `Error: Get Pages site failed` or `Pages is not enabled` | The one-time setup was skipped | Follow "One-time setup" above, then click **Re-run all jobs** |
| Steps marked with an orange or grey warning but a green tick overall | Reports only (HTML lint, link check, Lighthouse) | Safe to ignore, or read them for hints |

## Update the text or images

Open a file on github.com, click the pencil icon, change it, and click **Commit changes**. Choose **Create a new branch and start a pull request** if you want to review first. See [CUSTOMIZING.md](CUSTOMIZING.md) for where each thing lives.

## Roll back to a previous version

1. Click **Pull requests**, then **Closed**, and open the pull request you want to undo.
2. Click **Revert** near the top.
3. Click **Create pull request**, then **Merge pull request**.

The site returns to how it was before that change.

## Use your own domain (optional)

1. Buy a domain from any registrar.
2. In the repository open **Settings > Pages**, type your domain under **Custom domain**, and click **Save**.
3. At your registrar open the DNS settings and add the records GitHub lists in [its custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
4. Back in **Settings > Pages** tick **Enforce HTTPS** once it becomes available.
5. Update the address in these places: the `canonical`, `og:url`, `og:image` and `twitter:image` lines in each page's `<head>`, `sitemap.xml`, and `robots.txt`. In `404.html`, replace `/personal-projects/` with `/` everywhere.

## Turn on GitHub's free security switches

1. **Settings > Code security** (or **Advanced Security**).
2. Switch on **Dependency graph**, **Dependabot alerts**, **Dependabot security updates**, **Secret scanning** and **Push protection**. Secret scanning warns you if a password or key is ever pasted into the repository.
3. Switch on **Private vulnerability reporting** so visitors can use the link in `SECURITY.md`.

The **CodeQL** workflow in `.github/workflows` scans the code every week and on every pull request. Results appear under the **Security** tab.

## Add a new project

1. Click **Add file > Create new file** and type `my-project/README.md` (the slash creates the folder).
2. Write a line or two about the project and commit.
3. Open `projects.html`, click the pencil, find the right group, copy one `<li class="dir-item">…</li>` line, and change the name and the folder name in the address. Also increase the count shown next to that group's title and the total (`130`) on the page.
