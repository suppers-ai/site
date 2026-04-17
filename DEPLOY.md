# Deployment — suppers.ai

Static site served by GitHub Pages from `github.com/suppers-ai/site` at the custom domain `suppers.ai`.

## One-time setup

1. Push `main` to `origin` (`https://github.com/suppers-ai/site`).
2. In the repo's **Settings → Pages**:
   - Source: *Deploy from a branch*
   - Branch: `main` / `(root)`
3. The presence of `CNAME` at the repo root tells Pages to serve the site at the custom domain.
4. At the `suppers.ai` DNS registrar:
   - Apex **A** records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **AAAA** records → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - Optional **CNAME** `www` → `suppers-ai.github.io`
5. Wait a few minutes for GitHub to provision the Let's Encrypt certificate (visible under Settings → Pages).
6. Enable **Enforce HTTPS**.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Updating content

Edit `index.html`, `styles.css`, or the images in place. Pages redeploys automatically on push.
