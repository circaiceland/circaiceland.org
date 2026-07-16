# circaiceland.org

The official website of **Circa** (Circa Iceland) — a grassroots non-profit in Reykjavík
working to weave environmental and social sustainability into everyday life in Iceland.

It is a fast, dependency-free static site (plain HTML/CSS/JS) designed to be hosted on
**GitHub Pages** with the custom domain **circaiceland.org**.

## Structure

```
.
├── index.html          # the whole one-page site (About · Projects · Contact)
├── projects/           # one sub-page per project/initiative
│   ├── eco-rangers.html
│   ├── healing-people.html
│   ├── growing-green.html
│   ├── reduce-co2.html
│   ├── green-banks.html
│   └── sustainable-leader.html
├── css/styles.css      # core design system
├── css/pages.css       # social stripe + project sub-page styles
├── js/main.js          # nav, filtering, carousel, click-to-play, reveals
├── assets/             # logo, imagery, QR codes, video thumbnail
├── CNAME               # custom domain for GitHub Pages
├── .nojekyll           # serve files as-is (skip Jekyll)
├── robots.txt
└── sitemap.xml
```

## Deploying to GitHub Pages

1. **Push these files** to the repository `circaiceland/circaiceland.org`
   (they should sit at the repository root, not in a subfolder):

   ```bash
   git init
   git add .
   git commit -m "Launch Circa Iceland website"
   git branch -M main
   git remote add origin https://github.com/circaiceland/circaiceland.org.git
   git push -u origin main
   ```

2. In the repo, open **Settings → Pages** and set:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` / `/ (root)`

3. Under **Settings → Pages → Custom domain**, confirm `circaiceland.org`
   (the `CNAME` file sets this automatically) and tick **Enforce HTTPS**.

4. **DNS** — at your domain registrar, point the domain to GitHub Pages:
   - Four `A` records for the apex `circaiceland.org` →
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One `AAAA` set (optional, IPv6) →
     `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - A `CNAME` record for `www` → `circaiceland.github.io`

   DNS changes can take up to 24 hours to propagate; HTTPS is issued shortly after.

## Editing content

The home page is `index.html`. Each project has a card there (an `<article class="card">`
in the Projects section) **and** a full sub-page in `projects/`. To add a project: copy an
existing card, point its `Explore project` link at a new `projects/<slug>.html`, set the
card's `data-cat` to `education` or `research` (used by the filter buttons), then copy an
existing sub-page as your template.

Images live in `assets/`; replace a file with the same name to swap it site-wide.

### The social stripe ("From our channels")

The stripe between Projects and Contact is a **curated carousel**, not an auto-updating
feed — a static site on GitHub Pages can't securely pull live Instagram/YouTube feeds
without a third-party service. It contains one real, click-to-play YouTube video plus cards
linking to the channels.

- **Add a YouTube video:** duplicate the first `.slide` in the `#stripe` list, drop the
  video's thumbnail into `assets/`, and set the play button's
  `data-embed="https://www.youtube-nocookie.com/embed/VIDEO_ID?autoplay=1&rel=0"`.
- **Want a genuinely live feed?** Add a lightweight widget such as **Behold** or
  **LightWidget** (Instagram) — note this loads an external script and cookies, a small
  departure from the site's current no-tracker setup.

## Notes

- No external dependencies, trackers or web fonts — the site is self-contained,
  GDPR-friendly and works offline once loaded.
- Personal documents from the source archive (ID scans, attendance sheets, registration
  forms) are **deliberately excluded** and must never be committed to this public repo.
