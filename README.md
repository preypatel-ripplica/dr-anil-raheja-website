# Dr. Anil Raheja Website

Static-exported Next.js Pages Router website.

## Scripts

```bash
npm install
npm run build
npm start
```

`npm run build` generates the static site in `out/`.

## Cloudflare Pages Deploy

Create `.env` from `.env.example`, then run:

```bash
set -a
source .env
set +a
npx wrangler pages deploy out --project-name "$CLOUDFLARE_PROJECT_NAME" --branch main
```
