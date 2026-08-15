# JamesWare

A zero-build website for **JamesWare** — retro CRT styling, five phosphor themes, hosted on GitHub Pages at `jamesware.dev`.

## Files

- `index.html` — studio homepage
- `ai-meter/index.html` — AI Meter product page (`jamesware.dev/ai-meter`)
- `daily-on-plan/index.html` — Daily On Plan (`jamesware.dev/daily-on-plan`)
- `bytequest/index.html` — fictional showcase and cloneable product template (`jamesware.dev/bytequest`)
- `assets/styles.css` — layout, CRT effects, product pages
- `assets/theme.js` — theme pick, ambient cycling, logo crossfade, favicon sync
- `assets/brand/` — square and full logo PNGs per theme
- `assets/products/{slug}/` — drop `hero.png` here for real screenshots
- `favicon.svg`, `CNAME`, `.nojekyll`

The design comps (`initial-side-design-idea-*.png`) are reference only.

## Theme behavior

The page picks a random phosphor set on every reload (green, amber, blue, purple, red) and slowly crossfades to the next set about once a minute. The five dots in the footer switch themes manually and pause the ambient cycle for that session.

`prefers-reduced-motion` turns off cycling, flicker, scanlines, and typing animations.

## Brand assets

Replace the files in `assets/brand/` with transparent-background versions when you have them. Filenames must stay the same:

```text
jamesware-full-green.png
jamesware-full-orange.png
jamesware-full-blue.png
jamesware-full-purple.png
jamesware-full-red.png
jamesware-square-green.png
jamesware-square-orange.png
jamesware-square-blue.png
jamesware-square-purple.png
jamesware-square-red.png
```

No code changes are required for that swap.

## Before publishing

Search the site for:

```text
EDIT ME
```

Replace the placeholder GitHub URLs. Product pages do not claim App Store or TestFlight links that do not exist yet.

Drop real screenshots at:

```text
assets/products/ai-meter/hero.png
assets/products/daily-on-plan/hero.png
assets/products/bytequest/hero.png
```

If `hello@jamesware.dev` is not configured yet, either set it up with your email provider or change/remove the mailto links.

## Publish with GitHub Pages

1. Create a repository for the website.
2. Put these files in the root of the repository and push to your default branch.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your default branch and `/ (root)`.
6. Under **Custom domain**, enter `jamesware.dev` and save it.

The included `CNAME` file already contains:

```text
jamesware.dev
```

GitHub's documentation notes that a `CNAME` file by itself does not configure the repository's custom domain; set the custom domain in **Settings → Pages** too.

## DNS for jamesware.dev

For the apex domain (`jamesware.dev`), GitHub currently documents these A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Create four `A` records at your DNS provider:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

For `www`, GitHub recommends a CNAME pointing to your GitHub Pages default hostname:

```text
YOUR-GITHUB-USERNAME.github.io
```

Replace `YOUR-GITHUB-USERNAME` with your actual username or organization name.

After DNS is working, enable **Enforce HTTPS** in **Settings → Pages**.

## Editing

There is no build step. Edit `index.html`, `assets/styles.css`, or `assets/theme.js`, commit, and push.

The retro computer is CSS, not a raster image, so it tints with the active phosphor theme.

## Later: lab.jamesware.dev

The public site stays static. If you want a Laravel playground later, host it separately and point `lab.jamesware.dev` at that app — then add a Lab link in the nav here.
