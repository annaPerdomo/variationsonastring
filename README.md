<div align="center">

# Variations on a String

### Storyteller. Problem solver. One string at a time.

My developer portfolio and contract-work landing page — a fast, dependency-free site built with vanilla **HTML, CSS, and JavaScript**. No framework, no build step, no runtime: the browser loads three static files directly. It leads with five data-backed builds (KaraoQ, Ballet Folklórico Mi Herencia, SEJSCC, Tangodachi, Intermezzo), each with a screenshot/video gallery, a lightbox, and a detail panel that opens under its toggle and widens past the media column, then my experience, my creative work as an artisan, musician, and video editor, and an About section that closes the page with who I am and the kind of work I take on — all in a polished light/dark theme.

[![Live Site](https://img.shields.io/badge/Visit-variationsonastring.com-7C3AED?style=for-the-badge&logo=vercel&logoColor=white)](https://www.variationsonastring.com)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

<img src="docs/screenshot.png" alt="variationsonastring.com — developer portfolio" width="100%" />

</div>

## Project structure

| File         | Purpose                                                        |
| ------------ | -------------------------------------------------------------- |
| `index.html` | Markup and content only.                                       |
| `styles.css` | All styles. Design tokens (color, type, spacing) live at the top under `:root`; light/dark themes are driven by a `data-theme` attribute. |
| `main.js`    | Progressive enhancement: scroll reveals, dark-mode toggle, handmade gallery (from `data/crafts.json`), nav, mobile menu, proof-band count-ups, and the inline-SVG case-study charts (no chart library). Loaded as a deferred ES module. |
| `images/projects/` | WebP screenshots (and the KaraoQ hero demo loop) used in the case-study frames and galleries (captured Sept 2026). Gallery thumbnails and the lightbox share the same file. |
| `videos/` | Web-sized MP4 demos (720p, H.264, click-to-play) plus WebP posters: the BFMH hero film (shot and edited by Anna), Event Manager tour and La Chona walkthrough, the KaraoQ promo, and the Tangodachi overview. YouTube demos are embedded via youtube-nocookie from the lightbox instead of being hosted here. |
| `project-icons/` | Real favicons/app icons of each project. |
| `og-image.jpg`, `logo.png` | Social preview image and brand mark. |
| `vercel.json` | Zero-build deploy config (serves the repo root as static). |

The initial color theme is applied by a small render-blocking script in
`<head>` so the page never flashes the wrong palette before `styles.css`
and `main.js` load.

## Local development

No tooling required. Open `index.html` directly, or serve the folder so
the ES module loads over HTTP:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Hosted as a static site (Vercel / GitHub Pages). There is no build
command — every file in the repo root is served as-is. Pushing to `main`
publishes.

## Keeping the numbers honest

The proof band and case-study stat tiles are hard-coded snapshots (Vercel
Analytics, Vercel Usage, Formspree, and each repo's test suite), labelled
with the date they were taken. When you refresh them, update the
"30 days ending …" line in the proof band too. Chart data lives inline on
each `.chart__plot` element as a `data-series` JSON array, with a
visually-hidden `<table>` beside it for screen readers.

## Conventions

- Design changes go through the tokens in `styles.css` `:root`, not
  ad-hoc values, so light and dark modes stay in sync.
- `main.js` is intentionally small and framework-free; keep behaviour
  progressive (the page must remain readable with JS disabled).
- Editor settings are pinned in `.editorconfig`.
