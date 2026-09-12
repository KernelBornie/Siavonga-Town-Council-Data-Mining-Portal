# Siavonga Scraper Notebook


# CSC 4792 — Siavonga Town Council Dataset Scraper & Warehouse Pipeline

**Course:** 2025/26 CSC 4792: Data Mining and Warehousing  
**Project Team:** Group #48  
**Assigned Council:** Siavonga Town Council (Southern Province, Zambia)  
**Official Portal:** [https://www.siavongacouncil.gov.zm](https://www.siavongacouncil.gov.zm)  
**Submission Date:** September 12, 2026  

---

## 1. Context & Statutory Framework
Local authorities in Zambia operate under a modernized statutory regime aimed at fiscal decentralization and community-led service delivery:
- **Local Government Act No. 2 of 2019**: Established an integrated system for sub-national governance, planning, and devolved functions.
- **Local Government (Amendment) Act No. 28 of 2023**: Restructured the Local Government Equalisation Fund (LGEF), lifting prior capital restrictions and establishing it as an un-earmarked recurrent operational grant to ensure council payroll stability.
- **Local Government (Amendment) Act No. 76 of 2026**: Scaled the Constituency Development Fund (CDF) to K40 million per constituency, instituting enhanced transparency, citizen oversight, and community development committee (WDC) participation.

This notebook provides the complete reproducible pipeline to crawl, extract, clean, validate, and export the official datasets for Siavonga Town Council.

## 2. Polite Breadth-First Crawler
A polite BFS crawler with domain-bounding and polite throttling (0.8s interval) extracts HTML pages and downloads PDF documents from `siavongacouncil.gov.zm`.

## 3. Regular Expression Parsing Utilities
Zambian civic disclosures present financial values in heterogeneous notations, e.g., `K6.7 million`, `ZMW 1,300,000`, `K950,000`, and word-based expressions such as `over six million Kwacha`.

## 4. Extraction of CDF Projects Portfolio
Extracts structured records across Siavonga Constituency CDF funding allocations:

## 5. ZDSP Devolution Capital Projects
Extracts projects funded under the $210M Zambia Devolution Support Programme (ZDSP).

## 6. Financial Records & Local Revenue Streams
Captures LGEF recurrent grants (Act 28 of 2023), approved council annual budgets, fish levies from Lake Kariba commercial rigs, tourism bed levies, and property rates.

## 7. Quality Assurance & Validation Assertions
Enforces strict data integrity constraints: non-negative amounts, date sanity, absence of pipe corruption, and valid foreign key references.

## 8. Export to Mandatory Specification
All files are exported with the required naming convention `db-unza26-csc4792-[DESCRIPTION].csv` using `|` as the column separator and UTF-8 encoding.
