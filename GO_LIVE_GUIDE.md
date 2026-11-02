# Go Live Guide: 2woOpenEyes.com via GitHub (+ PythonAnywhere)

## Read this first

This site is **100% static** (HTML, CSS, JS, images, video). It needs **no Python to run in production**. The only Python in the project is local tooling (`python -m http.server` for previews and `scripts/prepare_assets.py` for asset prep).

So the recommended setup is:

| Piece | Role |
|---|---|
| **GitHub repository** | Stores the code and media (version control, backup) |
| **GitHub Pages** | Serves the site publicly, free, with HTTPS |
| **2woOpenEyes.com (your registrar)** | DNS points the domain at GitHub Pages |
| **PythonAnywhere** | Optional. Only needed if you later add Python (e.g. a contact form backend). Section 6 covers it, plus an alternative of hosting the whole site there |

Contact currently uses a `mailto:` link, so no backend is required.

---

## 1. Prepare the project folder

Project folder: `C:\Users\djd09\OneDrive\Projects\Derek Daniels Career\2woOpenEyes Brand Studio Website`

GitHub rejects any file over **100 MB** and recommends repos stay under **~1 GB**. The folder is ~0.9 GB because it holds large unused originals. Exclude them.

**Step 1.1 - Open the site folder in File Explorer or VS Code.**

**Step 1.2 - Create a new text file named exactly `.gitignore`** (leading dot, no `.txt` extension) in that folder, and paste in:

```
.playwright-mcp/
Restore Points/
preview-*.png
site-assets/media/2woOpenEyes Sizzle.mp4
site-assets/media/Verto Trailer.mov
site-assets/media/Scotch Porter Bodywash.mp4
site-assets/media/Caffe Borbone Naples.mp4
site-assets/video/scotch-porter.mp4
```

These files are unused by the site. The 400 MB sizzle file would be rejected outright by GitHub (100 MB per-file limit). Your originals stay safely on your computer; they are just not uploaded.

**Step 1.3 - (Optional) Hide the local preview pages** by also adding these three lines to `.gitignore`: `preview-web.html`, `preview-tablet.html`, `preview-mobile.html`. They are local review tools only.

**Step 1.4 - Check for oversized files.** Run this in PowerShell from the site folder. It should list nothing (or only files you have ignored above):

```powershell
Get-ChildItem -Recurse -File | Where-Object { $_.Length -gt 100MB } | Select-Object FullName, @{n='MB';e={[math]::Round($_.Length/1MB)}}
```

If a file is listed that the site needs, compress it first. If it is unused, add it to `.gitignore`.

**Step 1.5 - Confirm the site still works locally** before publishing:

```powershell
python -m http.server 8000
```

Open http://localhost:8000 and click through the pages. Press Ctrl+C to stop the server.

## 2. Create the GitHub repository

1. Sign in at https://github.com. Click **New repository**.
2. Name it e.g. `2woOpenEyes-site`. Set it **Public** (free GitHub Pages requires public on free plans).
3. Do **not** add a README, license, or .gitignore (you already have files).
4. Click **Create repository**.

## 3. Push the site to GitHub

The site folder sits inside a larger git repo (`C:\Users\djd09\OneDrive\Projects`). You must create a **separate** repo inside the site folder so your other projects are not published.

**Step 3.1 - Go to the site folder (not the parent Projects folder):**

```powershell
Set-Location "C:\Users\djd09\OneDrive\Projects\Derek Daniels Career\2woOpenEyes Brand Studio Website"
```

**Step 3.2 - Create the new, separate repo here:**

```powershell
git init -b main
```

**Step 3.3 - Verify you are in the right repo.** This must print the site folder path, NOT `...\Projects`:

```powershell
git rev-parse --show-toplevel
```

If it prints the parent `Projects` folder, stop and repeat Step 3.1 and 3.2.

**Step 3.4 - Stage the files and check them:**

```powershell
git add .
git status
```

Confirm that `2woOpenEyes Sizzle.mp4`, `Verto Trailer.mov`, `Restore Points`, and the other `.gitignore` entries are NOT listed. If they are, fix `.gitignore` (Step 1.2) and run `git rm -r --cached .` then `git add .` again.

**Step 3.5 - Commit and push:**

```powershell
git commit -m "Initial site"
git remote add origin https://github.com/<YOUR-USERNAME>/2woOpenEyes-site.git
git push -u origin main
```

Notes:
- Sign in when prompted (browser or personal access token).
- Videos are normal files under 100 MB, so Git LFS is not required. The first push of ~200 MB may take several minutes.
- If git warns that it sees a parent repo, that is fine. The inner `.git` takes precedence for this folder.

## 4. Turn on GitHub Pages

1. In the repo: **Settings > Pages**.
2. **Source:** Deploy from a branch. **Branch:** `main`, folder `/ (root)`. Save.
3. Wait 1 to 3 minutes. The site appears at `https://<YOUR-USERNAME>.github.io/2woOpenEyes-site/`.
4. Check that images, videos and case pages load there. Asset paths in the site are relative, so they work from a subfolder.

## 5. Connect 2woOpenEyes.com

### 5a. Tell GitHub the domain
1. **Settings > Pages > Custom domain:** enter `2woOpenEyes.com` and Save. (GitHub adds a `CNAME` file to the repo. Run `git pull` locally afterward.)
2. Domain is case-insensitive; use lowercase `2woopeneyes.com` if your registrar prefers.

### 5b. Set DNS at your registrar (GoDaddy, Namecheap, Google/Squarespace, etc.)
Open the DNS management page for the domain and:

1. Delete any existing parking or conflicting `A` or `AAAA` records for `@`.
2. Add four **A** records for host `@` (apex):

   | Type | Host | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

3. Add one **CNAME** record so `www` works:

   | Type | Host | Value |
   |---|---|---|
   | CNAME | www | `<YOUR-USERNAME>.github.io` |

4. Optional: add four **AAAA** records for IPv6 (`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`).

### 5c. Enable HTTPS
1. Back in **Settings > Pages**, wait for the "DNS check successful" message (minutes to a few hours; up to 24 hours).
2. Tick **Enforce HTTPS**. GitHub issues a free certificate automatically.
3. Visit https://2woOpenEyes.com and https://www.2woOpenEyes.com to verify.

## 6. PythonAnywhere (only if/when you need Python)

### Option A: Add a Python backend (e.g. a contact form)
GitHub Pages cannot run Python. A small Flask app on PythonAnywhere can, while the site stays on GitHub.

1. Create an account at https://www.pythonanywhere.com (free tier is fine to start; free accounts get a `<username>.pythonanywhere.com` URL).
2. **Web** tab > **Add a new web app** > Manual configuration (or Flask) > pick the newest Python.
3. In the **Files** tab, edit `flask_app.py`. Minimal example:

   ```python
   from flask import Flask, request, jsonify
   from flask_cors import CORS

   app = Flask(__name__)
   CORS(app, origins=["https://2woopeneyes.com", "https://www.2woopeneyes.com"])

   @app.post("/contact")
   def contact():
       data = request.get_json(force=True)
       # validate, then email or store the message here
       return jsonify(ok=True)
   ```
4. In a **Bash console**: `pip install --user flask flask-cors`, then press **Reload** on the Web tab.
5. From the site's JavaScript, `fetch("https://<username>.pythonanywhere.com/contact", {method:"POST", ...})`.
6. Optional: to use `api.2woopeneyes.com`, you need a paid PythonAnywhere account. Add the custom domain on the Web tab and create a DNS `CNAME` for `api` to the target PythonAnywhere shows you.

Keep any secrets (SMTP passwords) in environment variables on PythonAnywhere, never in the GitHub repo.

### Option B: Host the whole site on PythonAnywhere instead of GitHub Pages
1. On the **Web** tab create a web app (Manual configuration).
2. Upload the site folder (Files tab, or `git clone` your repo in a Bash console).
3. Under **Static files**, map URL `/` to the site folder path (e.g. `/home/<username>/2woOpenEyes-site`).
4. Custom domains require a paid plan. Point DNS per PythonAnywhere's instructions instead of the GitHub IPs above.

Free storage is limited (about 512 MB), and the site's video size makes GitHub Pages the easier choice.

## 7. Updating the live site later

```powershell
Set-Location "C:\Users\djd09\OneDrive\Projects\Derek Daniels Career\2woOpenEyes Brand Studio Website"
git add .
git commit -m "Describe the change"
git push
```

GitHub Pages republishes within a minute or two. If a CSS/JS change does not appear, bump the `?v=` cache-bust value in the HTML files (see `HANDOFF.md`).

## 8. Troubleshooting

| Symptom | Fix |
|---|---|
| Push rejected, file too large | Add the file to `.gitignore`, `git rm --cached <file>`, commit again |
| 404 on the Pages URL | Confirm `index.html` is at repo root and Pages source is `main` `/` |
| "DNS check unsuccessful" | Wait; verify the four A records and the `www` CNAME; remove old records |
| HTTPS option greyed out | DNS has not propagated; recheck in a few hours |
| Videos slow to start | Normal on first load; they are already compressed. Consider a CDN later |
| Site shows old styling | Hard refresh (Ctrl+F5) or bump the `?v=` query |
| Pages bandwidth | GitHub Pages soft limits: 1 GB site size, 100 GB/month bandwidth |

## 9. Backups and restore

Local restore points (zips) live in `C:\Users\djd09\OneDrive\Projects\Derek Daniels Career\Restore Points\`. The latest compressed snapshot is `2woOpenEyes-site-2026-11-02-1605-compressed.zip`. GitHub history is now your primary backup. Clone on another computer with `git clone https://github.com/<YOUR-USERNAME>/2woOpenEyes-site.git`.
