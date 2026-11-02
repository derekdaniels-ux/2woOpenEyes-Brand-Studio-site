# Project Handoff

## Project

2wÃ¸.Open.Eyes Brand Studio & Portfolio single-page website.

Project folder: `2woOpenEyes Brand Studio Website`  
Workspace parent: `Derek Daniels Career`

## Current State

- Site files and assets are organized in this folder as a repository-ready project root.
- Entry page: `index.html`; styles: `styles.css`; navigation behavior: `script.js`.
- Asset preparation script: `scripts/prepare_assets.py`.
- Original and optimized site media are under `site-assets/`.
- The site title is â€œ2wÃ¸.Open.Eyes Brand Studio & Portfolio.â€ The hero introduction now follows slide 2's copy; its background sizzle starts after two seconds, with optimized 1080p desktop and 720p tablet/mobile versions. The original deck media remains unchanged.
- The About anchor targets its heading, and image dimensions reserve layout space to keep navigation targets stable while lazy-loaded media appears.
- Case result copy was checked against the PowerPoint and adjusted for CaffÃ¨ Borbone, Scotch Porter, Starry, and MTV. Pepsi's outcome text already matched. The MTV summary was also aligned to the source assignment.
- The home page includes slide 2's continuously scrolling logo banner, red separators, and â€œEXPERIENCE ACROSSâ€ labels; Scotch Porter is intentionally absent from that strip. Each case has a â€œView the caseâ€ link. Five detail pages follow the deck's structure: CaffÃ¨ Borbone (slides 4â€“7), Scotch Porter (8â€“11), Starry (12â€“15), MTV Entertainment (16â€“19), and Pepsi Cola (20â€“23).
- The logo ticker uses generated, transparency-trimmed marks sized to a consistent visible height; â€œEXPERIENCE ACROSSâ€ is green. Scotch Porter remains excluded.
- Home case images align to their summary/result copy on desktop and tablet, with a subtle hover zoom; on phones the images return to natural uncropped sizing.
- Case collages and grouped media now appear on individual case pages rather than the homepage, preserving the supplied deck layouts with tighter gutters. The CaffÃ¨ Borbone collage uses its Break and Creator videos in the corresponding collage tiles; the MTV page includes the Coded trailer and the slide-19 awards collage.
- Pepsi's Verto trailer is followed by the Kaia Jordan Gerber image and the Will.I.Am project photo. Their captions match slides 22â€“23; the repeated CaffÃ¨ note on slide 22 is included verbatim beneath Kaia, including the source typo â€œLauch.â€
- A new `about.html` page contains the full slide-24 biography and uses the hat portrait; the homepage About section retains the tie portrait and links to the detail page with the same button treatment as â€œView the case.â€
- All case-page videos autoplay muted with visible controls. Scotch Porter includes â€œFresh Out of the Kitchenâ€ and â€œat Target v1â€; CaffÃ¨ Borbone includes the Break, Creator 1, Creator 2, and campaign videos; MTV includes the Ascension trailer and the Coded trailer; Pepsi uses the converted Verto trailer MP4. The Coded trailer is approximately 141 MB.
- The CaffÃ¨ hero crop (`object-position: 50% center` on `#caffe .case-visual img`) matches the user's reference: full "CaffÃ¨ Borbone Napoli" logo, saucer, spoon, and beans visible, handle only partly shown; its individual case page uses the same source image.
- Results copy no longer includes "as reported in the presentation"; the "Film launch" eyebrow was removed above the Ascension trailer; the Starry collage is capped at 440 px wide to avoid upscaling (source is 600 px).
- Every â†— arrow is red by default and turns green on hover/focus. Hovering or focusing a homepage "View the case" button triggers the same zoom as hovering its hero image (`:has()` rule in `styles.css`).
- `script.js` intercepts same-page hash links (Work/About/Contact) and re-aims the scroll until layout settles, so Contact always reaches the page bottom even while lazy media loads. Verified 3 of 3 runs on desktop.
- The MTV homepage heading wraps `Series & Film Launches.` in a `.no-break` span so the red period stays beside the "s".
- The Scotch Porter slide-11 collage is a 599:772 grid (two top images 48.9% wide, feature below) capped at 640 px, matching the user's "Collage Reference 2". Its campaign videos are "Fresh Out of The Kitchen" and `Scotch Porter at Target v1.mp4` (copied from `Career\Assets`; it has no poster image). "Fresh Out Da Kitchen" in Assets is byte-identical to the existing Kitchen file. The Bodywash video is no longer on the page, but its file remains in `site-assets/media`.
- Interactive previews (server must be running): `preview-web.html`, `preview-tablet.html` (768 px frame), `preview-mobile.html` (390 px frame), all under `http://localhost:8000/`. Cache-busting version is `20261102-13` in all HTML files; bump it after CSS/JS edits. Scotch Porter and MTV case hero images now also match the homepage.
- Case detail summaries and â€œExplore the storyâ€ links have divider lines; all heading periods are red and all links change to the accent green on hover. The contact link displays â€œClick here to get in touch.â€
- Source discrepancies to resolve before publication: MTV slide 17 says two Oscar-shortlisted films while slide 19 says â€œincluding 3 Oscar and Emmy short-listed programâ€; both source claims are retained. The CaffÃ¨ slide says â€œCosco Business Centers,â€ while the page uses â€œCostco Business Centersâ€ to match the supplied Costco asset. The unrelated CaffÃ¨ note printed on Pepsi slide 22 is reproduced beneath Kaia as requested.
- All local HTML asset references resolve. Browser checks at 390 px (homepage and Scotch Porter detail) and 768 px found no horizontal overflow or image-loading failures; desktop, tablet, and mobile screenshots are saved below.
- Mobile menu, keyboard Escape close, heading structure, internal anchors, and visible keyboard focus were checked.
- CaffÃ¨ Borbone, both Scotch Porter videos, Ascension, and Verto load over HTTP and expose metadata; transcripts have not been added.
- The homepage and five case pages return HTTP 200. Work/About/Contact link to valid anchors, and the logo banner contains no Scotch Porter assets.
- Static preview captures ([desktop](./preview-desktop.png), [tablet](./preview-tablet.png), [mobile](./preview-mobile.png)) predate the latest edits; prefer the interactive preview pages. Preview server: `http://localhost:8000/index.html`.
- Social profile URLs resolved to the intended accounts.

## Resume Work

1. Open this folder in VS Code on the new computer after OneDrive finishes syncing.
2. In VS Code Settings, search `chat.sessionSync.enabled` and enable Chat Session Sync on both computers. Sign in with the same VS Code/GitHub account, then open Chat History and look for the 2woOpenEyes website conversation.
3. If the conversation is not available, start a new chat and attach or open this `HANDOFF.md`; ask Copilot to continue from its â€œCurrent Stateâ€ and â€œNext Workâ€ sections.
4. To preview locally, open a terminal in this project folder and run `py -m http.server 8000`. Open `http://localhost:8000/index.html`.

## Restore Point

- Snapshot taken 2026-11-02 (about 3:50 PM ET), includes the capitalized "Explore Selected Work" button (green box, white text on hover): `..\Restore Points\2woOpenEyes-site-2026-11-02-1550.zip` (in `Derek Daniels Career`, so it syncs via OneDrive). The earlier `-1545` and `-1546` zips are older and can be deleted. To restore, unzip it over or beside this folder.
- It is a file snapshot, not a git commit: this project is untracked in the `C:\Users\djd09\OneDrive\Projects` repository, and its media (about 0.9 GB) exceeds GitHub's per-file limit for the shared repo.
- Open items as of this snapshot: none requested by the user; the tablet width of the Scotch Porter collage and the 8 px sideways scroll at 360 px viewport width were not investigated.

## Next Work

- Create a source-traceable content ledger and confirm the conflicting MTV award-count copy and the CaffÃ¨ Borbone â€œCosco/Costcoâ€ wording with the owner.
- Review whether to retain or correct the repeated CaffÃ¨ note and â€œLauchâ€ typo printed on Pepsi slide 22.
- Make the current video-poster generation and Verto MOV-to-MP4 conversion reproducible in `scripts/prepare_assets.py`; the generated files are present under `site-assets/`.
- Add captions or transcripts for the video assets and complete rights/privacy review before launch.
- For device testing, cover representative physical iPhones/iOS Safari and Android/Chrome versions or use a device-testing service; viewport emulation alone is not full OS/device validation.
- Repository creation and deployment remain pending: private GitHub repository `derekdaniels-ux/2woopeneyes.com`, a GitHub plan that supports Pages from a private repository, and custom-domain configuration.

## Source Documents

The original PowerPoint and conversion plan remain one folder above this project directory in `Derek Daniels Career`.
## Media Compression (2026-11-02)
- Used site assets: ~365 MB -> ~195 MB. Re-encoded with H.264 CRF 21, preset slow, AAC 128k, faststart (Coded Trailer 134.6->19.7 MB, Ascension 32->23.7, Scotch Target 27->12.8, Scotch Kitchen 25.8->11.9, caffe-borbone 20.4->12.8, Creator 1 18.1->10.0). hero-sizzle left as is (re-encode grew it).
- Referenced PNG/JPEG files optimized losslessly (pixels unchanged).
- Unused originals (e.g. 2woOpenEyes Sizzle.mp4 400 MB) untouched. Pre-compression originals are in Restore Points\2woOpenEyes-site-2026-11-02-1550.zip.
- Verified all case pages load images/videos after compression. Post-compression restore point: Restore Points\2woOpenEyes-site-2026-11-02-1605-compressed.zip (latest; the -1550 zip holds the uncompressed originals).
