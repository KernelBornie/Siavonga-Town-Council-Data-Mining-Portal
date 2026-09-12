#!/usr/bin/env bash
# remove_ai_mentions.sh — Scan and audit for AI/template keywords
set -e

echo "==> Scanning for AI mentions..."
PATTERNS='google[- ]?studio|aistudio|gemini|generated from|ai[- ]?generated|chatgpt|claude|openai|artificial intelligence|llm'
MATCHES=$(grep -rniE "$PATTERNS" \
  --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=venv --exclude-dir=dist \
  . 2>/dev/null | grep -v "\.png\|\.jpg\|\.ico\|\.lock" || true)

if [ -z "$MATCHES" ]; then
  echo "✔ No AI mentions found in source files."
else
  echo "Found matches:"
  echo "$MATCHES"
fi
