#!/usr/bin/env python3
"""Recreate the website's enhanced video without overwriting its source."""

import hashlib
import json
from pathlib import Path
import subprocess
import tempfile


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "dist/assets/moments.mp4"
OUTPUT = ROOT / "dist/assets/enhanced/moments-enhanced.mp4"
SOURCE_SHA256 = "ce8a9906a36b8a742d7a1b9706492f1ec27710d2c39e50e6f6c2de8ba0e5c5b8"
FILTERS = (
    "hqdn3d=0.7:0.5:1.0:0.75,"
    "eq=contrast=1.035:brightness=0.002:gamma=1.025:saturation=1.04,"
    "scale=540:960:flags=lanczos,unsharp=5:5:0.32:3:3:0"
)
ENCODING = [
    "-map", "0:v:0", "-map", "0:a:0",
    "-c:v", "libx264", "-preset", "slow", "-crf", "24",
    "-maxrate", "1200k", "-bufsize", "2400k",
    "-pix_fmt", "yuv420p", "-profile:v", "high", "-level:v", "3.1",
    "-c:a", "copy", "-movflags", "+faststart", "-map_metadata", "-1",
]


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def probe(path):
    return json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration,size:stream=codec_type,codec_name,width,height,"
        "avg_frame_rate,nb_frames,duration", "-of", "json", str(path),
    ]))


def audio_hash(path):
    return subprocess.check_output([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(path),
        "-map", "0:a:0", "-c:a", "copy", "-f", "hash", "-hash", "sha256", "-",
    ], text=True).strip().split("=", 1)[1]


def main():
    if sha256(SOURCE) != SOURCE_SHA256:
        raise SystemExit("Original video checksum changed; refusing to process it.")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="ecuestrianaa-video-") as temp:
        candidate = Path(temp) / "moments-enhanced.mp4"
        subprocess.run([
            "ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(SOURCE),
            "-vf", FILTERS, *ENCODING, str(candidate),
        ], check=True)
        subprocess.run([
            "ffmpeg", "-hide_banner", "-loglevel", "error", "-xerror",
            "-i", str(candidate), "-f", "null", "-",
        ], check=True)
        original = probe(SOURCE)
        enhanced = probe(candidate)
        source_audio = audio_hash(SOURCE)
        if source_audio != audio_hash(candidate):
            raise SystemExit("Audio payload differs from the original.")
        original_video = next(s for s in original["streams"] if s["codec_type"] == "video")
        enhanced_video = next(s for s in enhanced["streams"] if s["codec_type"] == "video")
        for key in ("nb_frames", "avg_frame_rate", "duration"):
            if original_video[key] != enhanced_video[key]:
                raise SystemExit(f"Video timing changed: {key}")
        if sha256(SOURCE) != SOURCE_SHA256:
            raise SystemExit("Original video checksum changed during processing.")
        OUTPUT.write_bytes(candidate.read_bytes())
    manifest = {
        "source": str(SOURCE.relative_to(ROOT)),
        "source_sha256": SOURCE_SHA256,
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "audio_payload_sha256": source_audio,
        "filters": FILTERS,
        "encoding_arguments": ENCODING,
        "ffmpeg": subprocess.check_output(["ffmpeg", "-version"], text=True).splitlines()[0],
        "original": original,
        "enhanced": enhanced,
        "checks": {"source_unchanged": True, "audio_bitstream_unchanged": True,
                   "all_frames_preserved": True, "full_decode_passed": True},
    }
    (ROOT / "video-enhancements/manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Created {OUTPUT.relative_to(ROOT)} ({OUTPUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
