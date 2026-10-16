#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if [ "$#" -gt 0 ]; then
  echo "Uso: ./run.sh (servidor local). Para otro puerto: PORT=8040 ./run.sh" >&2
  exit 2
fi
PORT="${PORT:-8037}"
echo "Ecuestrianaa · http://localhost:${PORT}"
exec python3 -m http.server "$PORT" --bind 127.0.0.1 --directory dist
