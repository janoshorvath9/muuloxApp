#!/usr/bin/env python3
"""Regenerate app icons with safe-zone padding around the logo."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/AppIcons/appstore.png"
ICON_BG = (255, 255, 255)
# Android adaptive foreground: logo fits inside the center 66% safe zone.
ADAPTIVE_FILL = 0.52
# iOS / store icons: extra breathing room around the symbol.
FULL_ICON_FILL = 0.58

ANDROID_MIPMAP_SIZES = {
    "mdpi": 48,
    "hdpi": 72,
    "xhdpi": 96,
    "xxhdpi": 144,
    "xxxhdpi": 192,
}


def extract_logo(image: Image.Image, threshold: int = 25) -> Image.Image:
    rgba = image.convert("RGBA")
    width, height = rgba.size
    bg = rgba.getpixel((0, 0))[:3]

    def is_content(pixel: tuple[int, ...]) -> bool:
        r, g, b = pixel[:3]
        br, bg_c, bb = bg
        return abs(r - br) + abs(g - bg_c) + abs(b - bb) > threshold

    min_x, min_y, max_x, max_y = width, height, 0, 0
    for y in range(height):
        for x in range(width):
            if is_content(rgba.getpixel((x, y))):
                min_x = min(min_x, x)
                max_x = max(max_x, x)
                min_y = min(min_y, y)
                max_y = max(max_y, y)

    cropped = rgba.crop((min_x, min_y, max_x + 1, max_y + 1))
    pixels = cropped.load()
    for y in range(cropped.height):
        for x in range(cropped.width):
            pixel = pixels[x, y]
            if not is_content(pixel):
                pixels[x, y] = (255, 255, 255, 0)

    return cropped


def place_logo(
    logo: Image.Image,
    size: int,
    fill_ratio: float,
    background: tuple[int, int, int] | None,
) -> Image.Image:
    target_width = max(1, round(size * fill_ratio))
    scale = target_width / logo.width
    target_height = max(1, round(logo.height * scale))
    scaled = logo.resize((target_width, target_height), Image.Resampling.LANCZOS)

    if background is None:
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    else:
        canvas = Image.new("RGBA", (size, size), (*background, 255))

    offset = ((size - target_width) // 2, (size - target_height) // 2)
    canvas.alpha_composite(scaled, offset)
    return canvas


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if image.mode != "RGBA":
        image = image.convert("RGBA")
    image.save(path, format="PNG", optimize=True)


def appiconset_sizes() -> set[int]:
    contents_path = (
        ROOT / "assets/AppIcons/Assets.xcassets/AppIcon.appiconset/Contents.json"
    )
    with contents_path.open(encoding="utf-8") as handle:
        contents = json.load(handle)

    sizes: set[int] = set()
    for entry in contents["images"]:
        if "expected-size" in entry:
            sizes.add(int(entry["expected-size"]))
        elif "filename" in entry:
            stem = Path(entry["filename"]).stem
            if stem.isdigit():
                sizes.add(int(stem))
    return sizes


def main() -> None:
    source = Image.open(SOURCE)
    logo = extract_logo(source)

    full_1024 = place_logo(logo, 1024, FULL_ICON_FILL, ICON_BG)
    adaptive_1024 = place_logo(logo, 1024, ADAPTIVE_FILL, None)

    outputs: dict[Path, Image.Image] = {
        ROOT / "assets/AppIcons/appstore.png": full_1024,
        ROOT / "assets/icon.png": full_1024,
        ROOT / "assets/favicon.png": full_1024,
        ROOT / "assets/adaptive-icon.png": adaptive_1024,
        ROOT / "assets/AppIcons/playstore.png": place_logo(
            logo, 512, FULL_ICON_FILL, ICON_BG
        ),
    }

    iconset_dir = ROOT / "assets/AppIcons/Assets.xcassets/AppIcon.appiconset"
    for size in appiconset_sizes():
        outputs[iconset_dir / f"{size}.png"] = place_logo(
            logo, size, FULL_ICON_FILL, ICON_BG
        )

    for density, size in ANDROID_MIPMAP_SIZES.items():
        outputs[
            ROOT / f"assets/AppIcons/android/mipmap-{density}/muulox_launcher.png"
        ] = place_logo(logo, size, FULL_ICON_FILL, ICON_BG)

    for path, image in outputs.items():
        save_png(image, path)

    print(f"Generated {len(outputs)} icon files")
    print(f"  Full icon fill: {FULL_ICON_FILL * 100:.0f}% of canvas")
    print(f"  Adaptive foreground fill: {ADAPTIVE_FILL * 100:.0f}% of canvas")


if __name__ == "__main__":
    main()
