#!/usr/bin/env python3
"""
export_all.py — Generate every deliverable in every supported format,
then mirror everything into public/downloads/ so the web buttons work.
UNZA CSC 4792: Data Mining & Warehousing | Project Team #48
"""
import os
import json
import shutil
import subprocess

PROC = "data/processed"
DOCS = "docs"
NOTE = "notebooks"
PUB  = "public/downloads"

for d in (PROC, DOCS, NOTE, PUB):
    os.makedirs(d, exist_ok=True)

CSV_FILES = {
    "cdf_projects":
        "db-unza26-csc4792-siavonga_town_council_cdf_projects.csv",
    "zdsp_projects":
        "db-unza26-csc4792-siavonga_town_council_zdsp_projects.csv",
    "financial_records":
        "db-unza26-csc4792-siavonga_town_council_financial_records.csv",
    "administrative_data":
        "db-unza26-csc4792-siavonga_town_council_administrative_data.csv",
    "news_articles":
        "db-unza26-csc4792-siavonga_town_council_news_articles.csv",
}

PAPER_MD = os.path.join(DOCS, "data_in_brief_siavonga.md")
NOTEBOOK = os.path.join(NOTE, "db-unza26-csc4792-siavonga_scraper.ipynb")


def run(cmd, label):
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        print(f"[ok] {label}")
        return True
    except FileNotFoundError:
        print(f"[skip] {label} — command not found: {cmd[0]}")
        return False
    except subprocess.CalledProcessError as e:
        err = (e.stderr or b"").decode(errors="ignore")[:200]
        print(f"[FAIL] {label} — {err}")
        return False


# ── 1. CSV → JSON ──
for _, fname in CSV_FILES.items():
    src = os.path.join(PROC, fname)
    if not os.path.exists(src):
        src = os.path.join(PUB, fname)
    if not os.path.exists(src):
        print(f"[skip] {fname} not found")
        continue

    # Fallback to pure Python if pandas is not available
    try:
        import pandas as pd
        df = pd.read_csv(src, sep="|")
        df.to_json(src.replace(".csv", ".json"),
                   orient="records", indent=2, force_ascii=False)
    except ImportError:
        with open(src, "r", encoding="utf-8") as f:
            lines = [line.strip().split("|") for line in f if line.strip()]
        if lines:
            headers = lines[0]
            records = [dict(zip(headers, row)) for row in lines[1:]]
            with open(src.replace(".csv", ".json"), "w", encoding="utf-8") as out_f:
                json.dump(records, out_f, indent=2, ensure_ascii=False)

    print(f"[json] {src.replace('.csv', '.json')}")


# ── 2. Single XLSX workbook & per-table XLSX ──
# Run through node with sheetjs (xlsx)
subprocess.run(["node", "-e", """
const fs = require('fs');
const XLSX = require('xlsx');
const proc = 'data/processed';
const pub = 'public/downloads';
const csvFiles = {
  cdf_projects: 'db-unza26-csc4792-siavonga_town_council_cdf_projects.csv',
  zdsp_projects: 'db-unza26-csc4792-siavonga_town_council_zdsp_projects.csv',
  financial_records: 'db-unza26-csc4792-siavonga_town_council_financial_records.csv',
  administrative_data: 'db-unza26-csc4792-siavonga_town_council_administrative_data.csv',
  news_articles: 'db-unza26-csc4792-siavonga_town_council_news_articles.csv'
};
const masterWb = XLSX.utils.book_new();
for (const [key, fname] of Object.entries(csvFiles)) {
  let p = `${proc}/${fname}`;
  if (!fs.existsSync(p)) p = `${pub}/${fname}`;
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf-8').trim().split('\\n').map(l => l.split('|'));
  const ws = XLSX.utils.aoa_to_sheet(lines);
  const singleWb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(singleWb, ws, key.slice(0, 31));
  XLSX.writeFile(singleWb, `${proc}/${fname.replace('.csv', '.xlsx')}`);
  XLSX.utils.book_append_sheet(masterWb, ws, key.slice(0, 31));
}
XLSX.writeFile(masterWb, `${proc}/db-unza26-csc4792-siavonga_town_council.xlsx`);
"""], check=False)
print(f"[xlsx] {PROC}/db-unza26-csc4792-siavonga_town_council.xlsx")


# ── 3. Manifest ──
manifest_outputs = {}
for k, v in CSV_FILES.items():
    p = os.path.join(PROC, v)
    if not os.path.exists(p):
        p = os.path.join(PUB, v)
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            rows = len([l for l in f if l.strip()]) - 1
            manifest_outputs[k] = {"rows": max(rows, 0)}

manifest = {
    "council": "Siavonga Town Council",
    "base_url": "https://www.siavongacouncil.gov.zm",
    "scrape_date": "2026-09-12",
    "group": "48",
    "members": [{
        "name": "Bornface Kangombe",
        "computer_number": "2022064526",
        "email": "bornface.kangombe@cs.unza.zm",
    }],
    "course": "2025/26 CSC 4792: Data Mining and Warehousing",
    "institution": "University of Zambia (UNZA)",
    "outputs": manifest_outputs,
    "separator": "|",
    "encoding": "utf-8",
}
with open(os.path.join(PROC, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)
print(f"[manifest] {PROC}/manifest.json")


# ── 4. Paper exports ──
if os.path.exists(PAPER_MD):
    run(["pandoc", PAPER_MD, "-o", PAPER_MD.replace(".md", ".pdf")],  "paper.pdf")
    run(["pandoc", PAPER_MD, "-o", PAPER_MD.replace(".md", ".docx")], "paper.docx")
    run(["pandoc", PAPER_MD, "-o", PAPER_MD.replace(".md", ".html")], "paper.html")
    run(["pandoc", PAPER_MD, "-o", PAPER_MD.replace(".md", ".txt")],  "paper.txt")
else:
    print(f"[skip] {PAPER_MD} not found")


# ── 5. Notebook exports ──
def nbconvert(fmt, ext):
    out = NOTEBOOK.replace(".ipynb", f".{ext}")
    run(["jupyter", "nbconvert", "--to", fmt, NOTEBOOK,
         "--output", os.path.basename(out)], f"nb.{ext}")


if os.path.exists(NOTEBOOK):
    nbconvert("html",     "html")
    nbconvert("pdf",      "pdf")
    nbconvert("script",   "py")
    nbconvert("markdown", "md")
else:
    print(f"[skip] {NOTEBOOK} not found")


# ── 6. Mirror everything to public/downloads ──
mirrored = 0
for folder in (PROC, DOCS, NOTE):
    if not os.path.isdir(folder):
        continue
    for f in os.listdir(folder):
        if f.startswith(("db-unza26-csc4792", "data_in_brief_siavonga")) \
           or f in ("manifest.json", "dataset-metadata.json"):
            src_f = os.path.join(folder, f)
            dest_f = os.path.join(PUB, f)
            if os.path.isfile(src_f):
                shutil.copyfile(src_f, dest_f)
                mirrored += 1
print(f"[mirror] copied {mirrored} files to {PUB}")

# Also ensure root manifest and metadata are synced
if os.path.exists(os.path.join(PUB, "manifest.json")):
    shutil.copyfile(os.path.join(PUB, "manifest.json"), "manifest.json")
if os.path.exists(os.path.join(PUB, "dataset-metadata.json")):
    shutil.copyfile(os.path.join(PUB, "dataset-metadata.json"), "dataset-metadata.json")

print("\nDone.")
