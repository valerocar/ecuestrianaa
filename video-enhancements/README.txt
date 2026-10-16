ECUESTRIANAA — VIDEO ENHANCEMENT

The website uses one 27-second video. Its original 360 x 640 MP4 remains
untouched at dist/assets/moments.mp4. The original source export outside
this repository is also unchanged. Other supplied clips are not used on
the website and have not been changed.

The player now uses dist/assets/enhanced/moments-enhanced.mp4:
- Gentle spatial/temporal noise cleanup.
- Small contrast, gamma and saturation corrections.
- Lanczos scaling to 540 x 960 with restrained luminance sharpening.
- H.264, 30 fps, YUV 4:2:0, approximately 4 MB, fast-start MP4.
- All 803 video frames and all original AAC audio packets retained.
- Original aspect ratio, captions, edit points and framing retained.

This is conservative signal processing, not generative reconstruction.
The upscale does not recover detail absent from the low-resolution source.
Stabilization is deliberately omitted: the clip has many cuts and captions
baked into the image; global stabilization could move the text or crop it.
The container duration differs by about 0.1 s after remuxing AAC encoder
padding; video duration and frame timing, and the audio payload, are unchanged.

Recreate and validate (requires FFmpeg and Python 3):
  python3 video-enhancements/enhance.py

manifest.json records the exact filters, encoding options, original and
output checksums, stream metadata, and validation results. The script
refuses to run if the original checksum has changed.

Open review.html for an original/enhanced playback comparison. The review
is stored outside dist/ and is not part of the public website.
