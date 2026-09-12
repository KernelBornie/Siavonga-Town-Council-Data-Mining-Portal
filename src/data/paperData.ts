export interface SpecTableRow {
  parameter: string;
  description: string;
}

export const PAPER_SPEC_TABLE: SpecTableRow[] = [
  {
    parameter: "Subject",
    description: "Social Sciences, Computer Science, Public Administration & Governance"
  },
  {
    parameter: "Specific Subject Area",
    description: "Sub-national Public Financial Management, Municipal Warehousing, Decentralised Infrastructure"
  },
  {
    parameter: "Type of Data",
    description: "Machine-readable tabular datasets (CSV format, pipe | delimited), structured JSON manifests, metadata files"
  },
  {
    parameter: "How the Data Were Acquired",
    description: "Automated Python-based polite crawler (requests, BeautifulSoup4, pdfplumber), custom regex parsing engines for multi-format Zambian Kwacha financial expressions"
  },
  {
    parameter: "Data Format",
    description: "Raw scraped text corpus, cleaned and normalised tabular datasets (UTF-8, pipe | separated)"
  },
  {
    parameter: "Parameters for Data Collection",
    description: "Domain-bounded crawl of siavongacouncil.gov.zm (crawl depth ≤ 3, max 250 endpoints, politeness rate limit of 0.8 seconds per request, academic User-Agent header)"
  },
  {
    parameter: "Description of Data Collection",
    description: "Recursive breadth-first search traversing civic disclosures, project status reports, gazetted council resolutions, tender notices, and news bulletins"
  },
  {
    parameter: "Data Source Location",
    description: "Siavonga District, Southern Province, Republic of Zambia (Latitude: -16.5381°, Longitude: 28.7089°)"
  },
  {
    parameter: "Data Accessibility",
    description: "Kaggle Dataset: unza-csc4792-siavonga (db-unza26-csc4792-siavonga_town_council_*.csv) under CC BY 4.0 License; GitHub repository with complete reproducibility pipeline"
  },
  {
    parameter: "Related Research Article",
    description: "Phiri, L. (2026). A Multi-Source Dataset for CS1 Failure Prediction [Dataset]. Kaggle. https://www.kaggle.com/lightonphiri/a-multisource-dataset-for-cs1-failure-prediction"
  }
];

export const PAPER_VALUE_POINTS = [
  "First Machine-Readable Siavonga Local Government Repository: Prior to this dataset, civic expenditures in Siavonga were locked within unstructured WordPress news releases or rasterized PDF scans. This dataset provides the first normalized, field-delimited data warehouse.",
  "Empirical Fiscal Decentralisation Analysis: Enables scholars, economists, and civil society organizations (CSOs) to evaluate the allocation efficiency of the newly expanded CDF (scaled to K40 million per constituency under Act No. 76 of 2026).",
  "Multi-Source Financial Reconciliation: Integrates both central statutory transfers (LGEF recurrent transfers under Act No. 28 of 2023) and indigenous revenue mobilization (Lake Kariba fishing levies, tourism bed levies, and valuation roll property taxes).",
  "Geographic and Sectoral Tagging: Provides GPS spatial coordinates and sector categorizations (health, education, roads, WASH, economic empowerment) for spatial GIS analyses of public service access across remote lakeside valleys.",
  "Reproducible Academic Baseline: The modular Python pipeline provides an extensible framework for mining the remaining 115 local authority websites across Zambia."
];
