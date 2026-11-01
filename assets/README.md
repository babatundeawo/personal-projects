# assets

Shared styles, scripts and pictures for the site pages in the repository root.

| Path | Used by |
| --- | --- |
| `css/site.css` | Every page: colors, type, spacing, header, footer, buttons, install interface |
| `css/home.css` | Home, 404 and offline pages |
| `css/projects.css`, `js/projects.js` | Projects page (search and filters) |
| `css/about.css` | About page |
| `css/contact.css`, `js/contact.js` | Contact page |
| `js/theme-init.js` | Placed inline in every page head so the theme is right before the first paint |
| `js/site.js` | Every page: theme, header, menu, toasts, reveals |
| `js/pwa.js` | Every page: install prompt, offline notice, update prompt |
| `js/offline.js` | Offline page (Try again button) |
| `fonts/` | Filled in automatically on every publish |
| `screenshots/` | Pictures for the install prompt |
| `css/base.css`, `css/portfolio-nav.css`, `js/portfolio-nav.js`, `js/animations.js` | Used only by `safe-calculator`, `smart-form-validator`, `student-report-card` and the ecommerce live demo. Leave them alone. |

`js/home.js` is no longer used by the site. It is safe to delete.
