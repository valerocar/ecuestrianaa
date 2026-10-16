Photo enhancement, 2026-10-16

Five photographs enhanced using the built-in image_gen tool.
The website uses optimized JPEG copies under dist/assets/enhanced/.
The original dist/assets/*.jpg files and original Instagram export folders
are unchanged; SHA-256 checksums were checked after creating the copies.
The logo and video are unchanged.

masters/ contains the full-quality generated PNGs.
review.html shows originals and enhancements side by side.
prompts.json records the exact prompts.
manifest.json maps each original to its web copy and PNG master.

The requested changes were blur/compression reduction, detail clarity,
and natural color correction, with composition and identity preservation.
AI restoration may reconstruct fine details; the originals remain the
unaltered record. Review the paired images when assessing those details.

To return the website to the originals, change references in dist/index.html
and dist/app.js from assets/enhanced/NAME-enhanced.jpg to assets/NAME.jpg.
No original image needs to be restored from backup.
