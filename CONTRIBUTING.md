# Contributing

Thanks for taking a look. Small fixes and ideas are welcome.

## Report a bug or suggest an idea

1. Go to the **Issues** tab and choose **New issue**.
2. Pick **Report a bug** or **Suggest an idea** and fill in the short form.

## Open a pull request

You can do everything from the GitHub website:

1. Open the file you want to change and click the pencil icon (**Edit this file**).
2. Make your change and choose **Propose changes**. GitHub creates a branch for you.
3. Click **Create pull request** and describe the change in a sentence or two.

Automated checks run on every pull request. A red cross means a check found a problem; open it to read why.

## Working on the site locally (developers)

The site is plain HTML, CSS and JavaScript, so any static file server works:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Guidelines:

- The site's design tokens (colors, type, spacing, motion) live at the top of `assets/css/site.css`. Use them rather than hard-coded values.
- `assets/css/base.css`, `portfolio-nav.css`, `assets/js/portfolio-nav.js` and `animations.js` are still used by `safe-calculator`, `smart-form-validator`, `student-report-card` and the ecommerce live demo. Do not change them without checking those pages.
- Keep each project self-contained in its own folder.
