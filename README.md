# Gamedev Demos

A portfolio site for game development demos and experiments, hosted on GitHub Pages.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173/gamedev-demos/` in your browser.

## How to add a game

1. **Build your Phaser (or other) game** for production.

2. **Copy the build output** into `public/games/<slug>/` — the folder must contain an `index.html` at its root.

   ```
   public/games/
   └── space-shooter/
       ├── index.html
       ├── assets/
       └── ...
   ```

3. **Register the game** in `src/data/games.ts`:

   ```ts
   {
     slug: 'space-shooter',
     title: 'Space Shooter',
     description: 'A classic space shooter built with Phaser 3.',
     thumbnail: 'games/space-shooter/thumb.png', // optional
     width: 800,   // optional, defaults to 800
     height: 600,  // optional, defaults to 600
   }
   ```

4. **Run `npm run dev`** and navigate to the Games tab to verify it loads.

### Phaser `base` path caveat

The Play page loads each game in an iframe at `/<repo>/games/<slug>/index.html`. If your Phaser build assumes asset paths relative to domain root (`/`), those paths will break under the repo sub-path.

To fix this, either:

- Configure your Phaser build tool's `base` / `publicPath` to `./` (relative).
- Or make sure all asset references in your game code use relative paths.

## Deployment

This repo uses **GitHub Actions** to build and deploy to GitHub Pages automatically on every push to `main`.

### First-time setup

1. Push this repo to GitHub under the name **`gamedev-demos`**.
2. Go to **Settings → Pages** and set the source to **GitHub Actions**.
3. Push to `main` — the workflow builds the site and deploys it.

Your site will be live at `https://<username>.github.io/gamedev-demos/`.

**Important:** You must enable Pages and choose **GitHub Actions** as the source *before* the first deploy. If the workflow fails with `Get Pages site failed` / `Not Found`, Pages isn’t enabled yet—open **Settings → Pages**, set **Source** to **GitHub Actions**, then re-run the workflow. You do **not** need a new git branch; this is a repository setting only.

The workflow builds with **Node.js 22** and sets `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` so GitHub’s JavaScript Actions (checkout, Pages deploy, etc.) run on **Node 24** ahead of the [June 2026 default](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/), which avoids the Node 20 deprecation warning.

### Changing the repo name

If your GitHub repo is named something other than `gamedev-demos`, update the Vite `base` in `vite.config.ts` and the Router `basename` in `src/main.tsx` to match:

```ts
// vite.config.ts
base: '/<your-repo-name>/',

// src/main.tsx
<BrowserRouter basename="/<your-repo-name>">
```

## Project structure

```
├── public/
│   └── games/            ← drop pre-built games here
│       └── <slug>/
│           └── index.html
├── src/
│   ├── components/       ← Layout, GameCard
│   ├── data/
│   │   └── games.ts      ← game registry
│   ├── hooks/
│   │   └── useTitle.ts
│   ├── pages/            ← About, Games, Play, NotFound
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── scripts/
│   └── copy-404.cjs      ← SPA fallback for GitHub Pages
├── .github/workflows/
│   └── pages.yml          ← CI/CD pipeline
├── vite.config.ts
└── package.json
```

## Tech stack

- **Vite** + **React** + **TypeScript**
- **React Router** (BrowserRouter with `basename`)
- **CSS Modules** for scoped styling
- **GitHub Actions** for CI/CD to GitHub Pages
