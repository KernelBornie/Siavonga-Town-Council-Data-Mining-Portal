# A Curated Dataset of Constituency Development Fund, Devolution Support Programme, and Financial Disclosures for Siavonga Town Council, Zambia

**Project Team #48**

**Bornface Kangombe**  
Computer Number: 2022064526  
Email: bornface.kangombe@cs.unza.zm  
Group: 48  

Department of Computing and Infomatics, School of Natural Sciences,  
The University of Zambia, Great East Road Campus,  
P.O. Box 32379, Lusaka, Zambia  

**Corresponding author:** bornface.kangombe@cs.unza.zm  
**Target Journal:** *Data in Brief* (Elsevier)

---

## Abstract
This article presents a curated, machine-readable dataset capturing public financial allocations, community infrastructure projects, devolution support operations, and administrative governance data for Siavonga Town Council, Southern Province, Zambia. Data were collected from the official municipal domain (`https://www.siavongacouncil.gov.zm`) using a polite breadth-first Python web scraping pipeline incorporating automated regular expression normalization and strict entity validation. The dataset comprises five pipe-delimited (`|`) CSV files encompassing Constituency Development Fund (CDF) allocations under the enhanced K40 million statutory threshold (Local Government Amendment Act No. 76 of 2026), Zambia Devolution Support Programme (ZDSP) capital grants, Local Government Equalisation Fund (LGEF) recurrent grants (Act No. 28 of 2023), locally generated revenue streams (including Lake Kariba commercial fishing rig levies, hospitality taxes, and property rates valuation rolls), and administrative metadata. This dataset facilitates computational accountability studies, civic technology monitoring, and sub-national fiscal policy research in sub-Saharan local governance.

**Keywords:** Constituency Development Fund; CDF; Zambia; Local Government; Fiscal Decentralisation; Siavonga Town Council; Devolution; Public Finance; Data Mining.

---

## Specifications Table

| Parameter | Description |
| :--- | :--- |
| **Subject** | Social Sciences, Computer Science, Public Administration & Governance |
| **Specific Subject Area** | Sub-national Public Financial Management, Municipal Warehousing, Decentralised Infrastructure |
| **Type of Data** | Machine-readable tabular datasets (CSV format, pipe `\|` delimited), structured JSON manifests, metadata files |
| **How the Data Were Acquired** | Automated Python-based polite crawler (`requests`, `BeautifulSoup4`, `pdfplumber`), custom regex parsing engines for multi-format Zambian Kwacha financial expressions |
| **Data Format** | Raw scraped text corpus, cleaned and normalised tabular datasets (UTF-8, pipe `\|` separated) |
| **Parameters for Data Collection** | Domain-bounded crawl of `siavongacouncil.gov.zm` (crawl depth $\le$ 3, max 250 endpoints, politeness rate limit of 0.8 seconds per request, academic User-Agent header) |
| **Description of Data Collection** | Recursive breadth-first search traversing civic disclosures, project status reports, gazetted council resolutions, tender notices, and news bulletins |
| **Data Source Location** | Siavonga District, Southern Province, Republic of Zambia (Latitude: -16.5381°, Longitude: 28.7089°) |
| **Data Accessibility** | Repository: Kaggle Dataset (`unza-csc4792-siavonga`)<br>Direct URL: `https://www.kaggle.com/datasets/group48/unza-csc4792-siavonga-town-council`<br>GitHub Repository: Committed with standardised commit history |
| **Related Research Article** | Phiri, L. (2026). *A Multi-Source Dataset for CS1 Failure Prediction* [Dataset]. Kaggle. |

---

## 1. Value of the Data
- **First Machine-Readable Siavonga Local Government Repository:** Prior to this dataset, civic expenditures in Siavonga were locked within unstructured WordPress news releases or rasterized PDF scans. This dataset provides the first normalized, field-delimited data warehouse.
- **Empirical Fiscal Decentralisation Analysis:** Enables scholars, economists, and civil society organizations (CSOs) to evaluate the allocation efficiency of the newly expanded CDF (scaled to K40 million per constituency under Act No. 76 of 2026).
- **Multi-Source Financial Reconciliation:** Integrates both central statutory transfers (LGEF recurrent transfers under Act No. 28 of 2023) and indigenous revenue mobilization (Lake Kariba fishing levies, tourism bed levies, and valuation roll property taxes).
- **Geographic and Sectoral Tagging:** Provides GPS spatial coordinates and sector categorizations (health, education, roads, WASH, economic empowerment) for spatial GIS analyses of public service access across remote lakeside valleys.
- **Reproducible Academic Baseline:** The modular Python pipeline provides an extensible framework for mining the remaining 115 local authority websites across Zambia.

---

## 2. Objective
Under Zambia's revised decentralisation framework (enacted via the Local Government Act No. 2 of 2019 and amended by Acts No. 28 of 2023 and No. 76 of 2026), local authorities have transitioned from purely administrative satellites into autonomous service-delivery engines managing unprecedented capital budgets. Despite statutory mandates for public transparency, citizens and researchers encounter severe data fragmentation. This project sought to extract, structure, validate, and publish a machine-readable data repository for Siavonga Town Council to bridge the transparency deficit.

---

## 3. Data Description

The curated data package consists of five pipe-separated (`|`) tabular files structured as follows:

### 3.1. CDF Projects (`db-unza26-csc4792-siavonga_town_council_cdf_projects.csv`)
Records all audited Constituency Development Fund capital and empowerment projects:
- `council` (string): Siavonga Town Council.
- `district` (string): Siavonga District.
- `province` (string): Southern Province.
- `project_title` (string): Official gazetted title of the project or procurement.
- `project_type` (string): Categorical sector (Education & Skills Development, Health, Equipment & Machinery, Education Infrastructure, Water & Sanitation, Economic Empowerment, Roads & Infrastructure, Public Safety & Governance).
- `raw_amount` (string): Exact monetary expression as reported in the council dispatch.
- `amount_zmw` (float): Quantified numeric monetary amount in Zambian Kwacha (ZMW).
- `fiscal_year` (integer): Funding cycle allocation year (2022–2026).
- `source_url` (string): Canonical HTTPS URL of the council dispatch.
- `narrative` (string): Synthesis of project justification, beneficiaries, and technical scope.

### 3.2. ZDSP Devolution Projects (`db-unza26-csc4792-siavonga_town_council_zdsp_projects.csv`)
Documents capital works financed through the $210 million World Bank Zambia Devolution Support Programme:
- `council`, `district` (string): Administrative authority identifiers.
- `project_name` (string): Descriptive civic infrastructure undertaking.
- `status` (string): Operational milestone (e.g., Procurement completed, Civil works ongoing).
- `source_of_fin` (string): Sub-grant facility under ZDSP.
- `start_date`, `end_date` (ISO-8601 string): Contractual execution timetable.
- `total_cost_raw` / `total_cost_zmw` (string / float): Project financial commitment.
- `coordinates` (string): GPS decimal / UTM geospatial markers.
- `source_url` (string): Primary publication link.

### 3.3. Financial Records & Revenue Streams (`db-unza26-csc4792-siavonga_town_council_financial_records.csv`)
Captures all fiscal disclosures:
- Fields: `source_url`, `council`, `district`, `province`, `category`, `description`, `raw_amount`, `amount_zmw`, `fiscal_year`.
- Tracks LGEF recurrent operational disbursements (Act No. 28 of 2023), annual civic budgets (K42.6m in 2024, K51.3m in 2025), commercial fish rig levies, tourism bed levies, and property rates.

### 3.4. Council Administrative Profile (`db-unza26-csc4792-siavonga_town_council_administrative_data.csv`)
Captures institutional structure, postal contacts, 2022 Census population (66,030), Council Chairperson, Council Secretary, and statutory vision and mission statements.

### 3.5. News Articles Corpus (`db-unza26-csc4792-siavonga_town_council_news_articles.csv`)
Stores full, un-truncated article text corpora scraped directly from single-post templates.

---

## 4. Experimental Design, Materials and Methods

### 4.1. Crawling Architecture
The crawler utilizes Python 3.12 with `requests` and `BeautifulSoup4`. A polite queue-based breadth-first algorithm systematically traverses the root domain `https://www.siavongacouncil.gov.zm`. To prevent server disruption, requests are spaced with a 0.8-second delay and configured with standard academic crawler headers.

### 4.2. Regular Expression & Natural Language Parsing
Financial values in Zambian government releases follow diverse syntaxes. We constructed a resilient parsing engine:
$$\text{MONEY\_RE} = \verb|(?:K|ZMW|ZMK)\s?([\d,]+(?:\.\d+)?)\s?(billion|million|bn|m)?|$$
In addition, a word-number mapping dictionary parses colloquial formulations (e.g., "over six million Kwacha" $\to$ $6,000,000.00$).

### 4.3. Data Cleansing & Validation Pipeline
1. **Purity Enforcement:** String fields are scrubbed of unescaped pipe (`|`) characters and carriage returns to preserve tabular integrity.
2. **Numeric Type Coercion:** All financial amounts are verified strictly positive ($> 0$).
3. **Deduplication:** Composite primary keys (`source_url`, `amount_zmw`) eliminate redundant duplicate postings.
4. **Export:** Files are saved using UTF-8 encoding with the mandatory naming schema `db-unza26-csc4792-[DESCRIPTION].csv`.

---

## 5. Limitations
- Coverage is bounded by the online publication frequency of Siavonga Town Council.
- Certain older project items lack exact geographic coordinates.
- Unstructured narrative dispatches occasionally express dates by calendar quarter rather than discrete days.

---

## Ethics Statement
Data collection adhered to ethical web mining standards. Only publicly accessible civic disclosures were scraped. No private communications, credentials, or personally identifiable citizen records were gathered.

---

## CRediT Author Statement
**Project Team #48:** Conceptualisation, Methodology, Software, Data Curation, Validation, Writing - Original Draft, Visualisation.

---

## Acknowledgements
The authors acknowledge Mr. Lighton Phiri, Course Instructor for CSC 4792 (Data Mining and Warehousing), Department of Computing and Infomatics, University of Zambia, for providing the assignment framework and exemplar dataset standard. We also acknowledge the SMART Zambia Institute and Siavonga Town Council for maintaining digital civic repositories.

---

## References
1. Local Government Act, 2019 (Act No. 2 of 2019). Republic of Zambia.
2. Local Government (Amendment) Act, 2023 (Act No. 28 of 2023). Republic of Zambia.
3. Local Government (Amendment) Act, 2026 (Act No. 76 of 2026). Republic of Zambia.
4. Phiri, L. (2026). *A Multi-Source Dataset for CS1 Failure Prediction* [Dataset]. Kaggle.
5. Republic of Zambia. (n.d.). Ministry of Local Government and Rural Development.
6. Siavonga Town Council. (2026). Official Municipal Portal. https://www.siavongacouncil.gov.zm
