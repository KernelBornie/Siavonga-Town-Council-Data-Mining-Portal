# Siavonga Town Council Data Mining Portal

**UNZA CSC 4792 — Mini Project** | **Project Team #48**  
**Council:** Siavonga Town Council | **Province:** Southern, Zambia  
**Source:** https://www.siavongacouncil.gov.zm  
**Scrape date:** 2026-09-12  

---

## Overview

A complete, machine-readable data warehouse and reproducible scraping
pipeline capturing:

- Constituency Development Fund (CDF) — K40M ceiling under Act No. 76 of 2026
- Zambia Devolution Support Programme (ZDSP) — World Bank USD 210M programme
- Local Government Equalisation Fund (LGEF) — recurrent grants under Act No. 28 of 2023
- Local revenue streams — fishing rig levies, tourism bed levies, property rates
- Municipal administration — leadership, census data, vision and mission

## Repository Structure

```
.
├── public/downloads/     # Kaggle-ready CSVs, JSON, XLSX, manifest
├── scripts/              # Asset generation and export scripts
├── src/                  # React workbench UI & DataAnalysis recharts
├── notebooks/            # Jupyter scraper (.ipynb)
├── docs/                 # Data-in-Brief paper (all formats)
├── index.html
├── metadata.json
└── README.md
```

## Dataset Files (5 pipe-delimited CSVs)

| File | Rows | Total ZMW |
|---|---|---|
| db-unza26-csc4792-siavonga_town_council_cdf_projects.csv | 14 | 33,450,000 |
| db-unza26-csc4792-siavonga_town_council_zdsp_projects.csv | 5 | 11,200,000 |
| db-unza26-csc4792-siavonga_town_council_financial_records.csv | 10 | 206,450,000 |
| db-unza26-csc4792-siavonga_town_council_administrative_data.csv | 1 | — |
| db-unza26-csc4792-siavonga_town_council_news_articles.csv | 5 | — |

All files: UTF-8, pipe (`|`) delimiter, header row.

## Export Formats

| Format | Location | Use Case |
|---|---|---|
| CSV (pipe) | public/downloads/*.csv | Kaggle, pandas |
| JSON | public/downloads/*.json | API, web apps |
| XLSX | public/downloads/*.xlsx | Excel analysis |
| Markdown | docs/data_in_brief_siavonga.md | Paper source |
| PDF | docs/data_in_brief_siavonga.pdf | Moodle submission |
| DOCX | docs/data_in_brief_siavonga.docx | Editable paper |
| HTML | docs/data_in_brief_siavonga.html | Web viewing |
| Print | Browser print dialog | Hard copy |

## Reproducing the Pipeline

```bash
pip install -r requirements.txt
jupyter notebook notebooks/db-unza26-csc4792-siavonga_scraper.ipynb
# Kernel → Restart & Run All
```

## Kaggle

https://www.kaggle.com/datasets/group48/unza-csc4792-siavonga-town-council

## Statutory Context

- Local Government Act No. 2 of 2019
- Local Government (Amendment) Act No. 28 of 2023 (LGEF reform)
- Local Government (Amendment) Act No. 76 of 2026 (CDF K40M per constituency)

## Citation

Project Team #48. (2026). UNZA CSC 4792 — Siavonga Town Council Dataset
(Version 1.0) [Dataset]. Kaggle.
https://www.kaggle.com/datasets/group48/unza-csc4792-siavonga-town-council

## Licence

Data: CC BY 4.0 | Code: MIT
