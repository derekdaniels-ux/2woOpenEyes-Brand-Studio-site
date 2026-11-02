from __future__ import annotations

import sys
import zipfile
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
IMAGE_SOURCE = ROOT / "site-assets" / "images"
IMAGE_OUTPUT = ROOT / "site-assets" / "web"
LOGO_SOURCE = ROOT / "site-assets" / "media"
LOGO_OUTPUT = IMAGE_OUTPUT / "logos"
VIDEO_OUTPUT = ROOT / "site-assets" / "video"

IMAGES = {
    "2wo-logo.png": ("2wo-logo.webp", 520),
    "case-caffe.png": ("case-caffe.webp", 1500),
    "case-scotch.png": ("case-scotch.webp", 1100),
    "case-starry.jpg": ("case-starry.webp", 1300),
    "case-mtv.jpg": ("case-mtv.webp", 900),
    "case-pepsi.jpg": ("case-pepsi.webp", 1500),
    "profile-main.jpeg": ("profile-main.webp", 1000),
    "profile-art.png": ("profile-art.webp", 1000),
    "scotch-support.png": ("scotch-support.webp", 1500),
    "starry-support.png": ("starry-support.webp", 1500),
    "mtv-support.png": ("mtv-support.webp", 900),
    "pepsi-support.png": ("pepsi-support.webp", 1200),
}

VIDEOS = {
    "ppt/media/media2.mp4": "caffe-borbone.mp4",
    "ppt/media/media6.mp4": "scotch-porter.mp4",
}


def prepare_images() -> None:
    IMAGE_OUTPUT.mkdir(parents=True, exist_ok=True)
    for source_name, (output_name, max_width) in IMAGES.items():
        source = IMAGE_SOURCE / source_name
        if not source.exists():
            print(f"Skip missing image: {source}")
            continue

        with Image.open(source) as image:
            image.load()
            if source_name == "2wo-logo.png" and image.mode == "RGBA":
                alpha = image.getchannel("A")
                bounds = alpha.getbbox()
                if bounds:
                    image = image.crop(bounds)
            image.thumbnail((max_width, max_width), Image.Resampling.LANCZOS)
            if image.mode not in ("RGB", "RGBA"):
                image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
            image.save(IMAGE_OUTPUT / output_name, "WEBP", quality=84, method=6)


def prepare_logos() -> None:
    LOGO_OUTPUT.mkdir(parents=True, exist_ok=True)
    for index in (*range(3, 18), *range(19, 27)):
        source = LOGO_SOURCE / f"image{index}.png"
        if not source.exists():
            print(f"Skip missing logo: {source}")
            continue

        with Image.open(source) as source_image:
            image = source_image.convert("RGBA")
            alpha = image.getchannel("A")
            bounds = alpha.point(lambda value: 255 if value > 10 else 0).getbbox()
            if bounds:
                left, top, right, bottom = bounds
                padding = max(2, round(max(right - left, bottom - top) * 0.02))
                bounds = (
                    max(0, left - padding),
                    max(0, top - padding),
                    min(image.width, right + padding),
                    min(image.height, bottom + padding),
                )
                image = image.crop(bounds)
            image.thumbnail((600, 220), Image.Resampling.LANCZOS)
            image.save(LOGO_OUTPUT / f"logo-{index:02}.webp", "WEBP", quality=92, method=6)


def prepare_videos(presentation: Path) -> None:
    VIDEO_OUTPUT.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(presentation) as deck:
        for member, output_name in VIDEOS.items():
            try:
                info = deck.getinfo(member)
            except KeyError:
                print(f"Skip missing video: {member}")
                continue
            if info.file_size >= 100_000_000:
                print(f"Skip video over GitHub's 100 MB file limit: {member}")
                continue
            (VIDEO_OUTPUT / output_name).write_bytes(deck.read(member))


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python scripts/prepare_assets.py <case-studies.pptx>")
    presentation = Path(sys.argv[1])
    if not presentation.exists():
        raise SystemExit(f"PowerPoint not found: {presentation}")
    prepare_images()
    prepare_logos()
    prepare_videos(presentation)
    print(f"Optimized images: {IMAGE_OUTPUT}")
    print(f"Prepared logo marks: {LOGO_OUTPUT}")
    print(f"Inline videos: {VIDEO_OUTPUT}")


if __name__ == "__main__":
    main()