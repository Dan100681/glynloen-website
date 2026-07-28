# Glynloen Insurance Consulting — Website

Static website for Glynloen Insurance Consulting (GIC), maintained by Claude Code.

## Structure
- `site/` — the published website (HTML/CSS/assets). This folder is what goes live.
- `_capture/` — local reference material captured from the original WordPress site (content, design tokens, original media). **Not published** (gitignored).

## How updates work
1. Edit files in `site/`.
2. Commit and push to `main`.
3. The GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-publishes `site/` to GitHub Pages.

## Local preview
```
python -m http.server 8080 --directory site
```
Then open http://localhost:8080

## Pages
Home · About · Expert Witness Services · Other Services · Our Team · Announcements · Contact
