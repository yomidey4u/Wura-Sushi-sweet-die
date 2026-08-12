Place favicon files here so the site shows the browser tab logo.

Recommended filenames (drop your provided PNG into `public/` with these names):

- favicon-32.png  (32x32 PNG)
- favicon-16.png  (16x16 PNG)
- apple-touch-icon.png (180x180 PNG)
- site.webmanifest (optional, simple web manifest)
- favicon.ico (optional, multi-resolution ICO)

After adding files, rebuild and redeploy (Vercel will pick them up automatically):

pnpm build
# then push to your repo (or let Vercel auto-deploy)

git add public/favicon-32.png public/favicon-16.png public/apple-touch-icon.png public/favicon.ico public/site.webmanifest
git commit -m "Add favicons"
git push origin main

If you want, I can add these files for you — upload the small PNGs into this workspace and I'll place them in `public/` and push the change.