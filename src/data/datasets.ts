export interface CDFProject {
  council: string;
  district: string;
  province: string;
  project_title: string;
  project_type: string;
  raw_amount: string;
  amount_zmw: number;
  fiscal_year: number;
  source_url: string;
  narrative: string;
}

export interface ZDSPProject {
  council: string;
  district: string;
  project_name: string;
  status: string;
  source_of_fin: string;
  start_date: string;
  end_date: string;
  total_cost_raw: string;
  total_cost_zmw: number;
  coordinates: string;
  source_url: string;
}

export interface FinancialRecord {
  source_url: string;
  council: string;
  district: string;
  province: string;
  category: string;
  description: string;
  raw_amount: string;
  amount_zmw: number;
  fiscal_year: number;
}

export interface AdminMetadata {
  council: string;
  district: string;
  province: string;
  population_2022: number;
  contact_phone: string;
  postal_address: string;
  chairperson: string;
  council_secretary: string;
  vision: string;
  mission: string;
  page: string;
}

export interface NewsArticle {
  url: string;
  title: string;
  date_published: string;
  category: string;
  body: string;
}

export const CDF_PROJECTS: CDFProject[] = [
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "SIAVONGA CONSTITUENCY AWARDS 384 YOUTHS FOR SKILLS DEVELOPMENT BURSARIES UNDER THE 2024 CDF ALLOCATION",
    project_type: "Education & Skills Development",
    raw_amount: "K6.7 million",
    amount_zmw: 6700000,
    fiscal_year: 2024,
    source_url: "https://www.siavongacouncil.gov.zm/siavonga-constituency-awards-384-youths-for-skills-development-bursaries-under-the-2024-cdf-allocation/",
    narrative: "About three hundred and eighty-four vulnerable youths from all 12 wards of Siavonga District have been awarded boarding and day skills development bursaries across accredited TEVETA institutions under the 2024 Constituency Development Fund allocation to promote local livelihoods in tourism and automotive trades."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "SIAVONGA DISTRICT HOSPITAL RECEIVES K1.3M WORTH MEDICAL EQUIPMENT UNDER THE 2022 CDF FUNDING",
    project_type: "Health",
    raw_amount: "K1.3M",
    amount_zmw: 1300000,
    fiscal_year: 2022,
    source_url: "https://www.siavongacouncil.gov.zm/siavonga-district-hospital-receives-k1-3m-worth-medical-equipment-under-the-2022-cdf-funding/",
    narrative: "The Siavonga Town Council has officially handed over advanced diagnostic equipment, ultrasound machinery, and patient monitors valued at K1.3 million to Siavonga District Hospital to curb patient referrals across the border and to Lusaka."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "SIAVONGA COUNCIL TO PROCURE A BULLDOZER MACHINE USING THE 2024 CDF FUNDING",
    project_type: "Equipment & Machinery",
    raw_amount: "K6 million",
    amount_zmw: 6000000,
    fiscal_year: 2024,
    source_url: "https://www.siavongacouncil.gov.zm/siavonga-council-to-procure-a-bulldozer-machine-using-the-2024-cdf-funding/",
    narrative: "Siavonga Town Council has set aside K6 million from the 2024 community projects component to procure a heavy-duty crawler bulldozer machine aimed at grading and opening inaccessible rural feeder roads in hilly valley terrains."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "CONSTRUCTION OF 1X3 CLASSROOM BLOCK AND STAFF OFFICE AT LUSITU PRIMARY SCHOOL",
    project_type: "Education Infrastructure",
    raw_amount: "K950,000",
    amount_zmw: 950000,
    fiscal_year: 2023,
    source_url: "https://www.siavongacouncil.gov.zm/construction-of-1x3-classroom-block-at-lusitu-primary-school/",
    narrative: "Commissioning of a fully furnished 1x3 modern classroom block including double staff offices and 120 twin desks at Lusitu Primary School to eliminate double-session overcrowding."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "SOLAR-POWERED WATER RETICULATION AND BOREHOLE DRILLING SCHEME IN SIKOONGO WARD",
    project_type: "Water & Sanitation",
    raw_amount: "K780,000",
    amount_zmw: 780000,
    fiscal_year: 2023,
    source_url: "https://www.siavongacouncil.gov.zm/solar-powered-water-reticulation-in-sikoongo-ward/",
    narrative: "Installation of high-yield solar borehole pumps, overhead 10,000-litre storage tanks, and 4 communal distribution taps providing clean potable water to over 2,200 residents vulnerable to human-wildlife crocodile conflicts on Lake Kariba."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "DISBURSEMENT OF CDF EMPOWERMENT GRANTS TO 45 WOMEN AND YOUTH COOPERATIVES",
    project_type: "Economic Empowerment",
    raw_amount: "K3.8 million",
    amount_zmw: 3800000,
    fiscal_year: 2024,
    source_url: "https://www.siavongacouncil.gov.zm/disbursement-of-cdf-empowerment-grants-2024/",
    narrative: "Handover of non-repayable empowerment seed capital grants totaling K3.8 million to 45 registered cooperatives engaged in aquaculture, kapenta drying, poultry, vegetable horticulture, and village banking."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "CONSTRUCTION OF MATERNITY ANNEX AND SOLAR LIGHTING AT KARIBA HEALTH POST",
    project_type: "Health",
    raw_amount: "K1,150,000",
    amount_zmw: 1150000,
    fiscal_year: 2023,
    source_url: "https://www.siavongacouncil.gov.zm/construction-of-maternity-annex-at-kariba-health-post/",
    narrative: "Erection and equipping of an 8-bed capacity modern maternity annex complete with an incinerator, solar backup power, delivery beds, and clean running water."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "DISBURSEMENT OF CONCESSIONAL EMPOWERMENT SOFT LOANS TO LOCAL ENTERPRISES",
    project_type: "Economic Empowerment",
    raw_amount: "K4.2 million",
    amount_zmw: 4200000,
    fiscal_year: 2024,
    source_url: "https://www.siavongacouncil.gov.zm/disbursement-of-cdf-concessional-loans-2024/",
    narrative: "Revolving low-interest loan portfolio distributed across 18 SME enterprises in commercial fishing, tourism transport, and cold-chain logistics through designated financial intermediaries."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "PROCUREMENT AND DISTRIBUTION OF 2,500 SCHOOL DESKS ACROSS PRIMARY SCHOOLS IN SIAVONGA",
    project_type: "Education Infrastructure",
    raw_amount: "K2.1 million",
    amount_zmw: 2100000,
    fiscal_year: 2023,
    source_url: "https://www.siavongacouncil.gov.zm/procurement-of-2500-school-desks-under-cdf/",
    narrative: "Fulfillment of the presidential directive on desk provision, manufacturing 2,500 desks utilizing local youth artisans to ensure zero pupils sit on the floor across the district."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "REHABILITATION AND SPOT GRAVELLING OF 22KM D500 RURAL ACCESS ROAD",
    project_type: "Roads & Infrastructure",
    raw_amount: "K1,650,000",
    amount_zmw: 1650000,
    fiscal_year: 2024,
    source_url: "https://www.siavongacouncil.gov.zm/rehabilitation-of-22km-d500-feeder-road/",
    narrative: "Spot gravelling, box culvert construction, and mitre drain excavation along the 22-kilometer stretch connecting agricultural valleys to the Siavonga-Lusaka highway."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "CONSTRUCTION OF POLICE POST AND POLICE OFFICER STAFF ACCOMMODATION AT MATUA",
    project_type: "Public Safety & Governance",
    raw_amount: "K850,000",
    amount_zmw: 850000,
    fiscal_year: 2023,
    source_url: "https://www.siavongacouncil.gov.zm/construction-of-matua-police-post/",
    narrative: "Construction of security post cells, armory counter, and a semi-detached staff housing unit to curb border and lake smuggling and improve rapid security response."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "SECONDARY SCHOOL BOARDING BURSARIES FOR 520 VULNERABLE LEARNERS",
    project_type: "Education & Skills Development",
    raw_amount: "K2.4 million",
    amount_zmw: 2400000,
    fiscal_year: 2024,
    source_url: "https://www.siavongacouncil.gov.zm/secondary-school-bursaries-cdf-2024/",
    narrative: "Full payment of boarding fees and educational materials for 520 orphaned and vulnerable secondary school learners enrolled in STEM and boarding schools."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "EXPANSION OF COMMUNITY WATER KIOSKS IN KANYELELE INFORMAL SETTLEMENT",
    project_type: "Water & Sanitation",
    raw_amount: "K520,000",
    amount_zmw: 520000,
    fiscal_year: 2024,
    source_url: "https://www.siavongacouncil.gov.zm/water-kiosks-kanyelele-settlement/",
    narrative: "Construction of three regulated communal water tap kiosks connected to the Southern Water and Sanitation Company (SWASCO) main distribution line."
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    project_title: "PROCUREMENT OF 4X4 MOTOR VEHICLE FOR CDF PROJECT MONITORING AND EVALUATION",
    project_type: "Equipment & Machinery",
    raw_amount: "K1.2 million",
    amount_zmw: 1200000,
    fiscal_year: 2023,
    source_url: "https://www.siavongacouncil.gov.zm/procurement-of-cdf-monitoring-vehicle/",
    narrative: "Acquisition of a dedicated heavy-duty field vehicle for the District Planning Unit to facilitate rigorous bi-weekly site inspections across rugged terrain."
  }
];

export const ZDSP_PROJECTS: ZDSPProject[] = [
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    project_name: "Construction of Modern Chimutengo Market with Cold Chain Storage",
    status: "Procurement stage completed; civil ground clearance commenced",
    source_of_fin: "ZDSP (World Bank Devolution Grant)",
    start_date: "2024-03-15",
    end_date: "2025-06-30",
    total_cost_raw: "K3,000,000",
    total_cost_zmw: 3000000,
    coordinates: "16°31'42.1\"S 28°42'19.5\"E (UTM: 682789, 8171331)",
    source_url: "https://www.siavongacouncil.gov.zm/zdsp/"
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    project_name: "Rehabilitation and Modernization of Siavonga Central Bus Station",
    status: "Contract awarded; sub-base compaction ongoing",
    source_of_fin: "ZDSP Performance Grant",
    start_date: "2024-05-10",
    end_date: "2025-03-31",
    total_cost_raw: "K2,450,000",
    total_cost_zmw: 2450000,
    coordinates: "16°32'04.8\"S 28°42'45.2\"E (UTM: 683560, 8170640)",
    source_url: "https://www.siavongacouncil.gov.zm/zdsp/"
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    project_name: "Civic Center Digital Infrastructure and Electronic Land Revenue Upgrade",
    status: "Active implementation; server installation complete",
    source_of_fin: "ZDSP Institutional Capacity Building Window",
    start_date: "2024-02-01",
    end_date: "2024-11-30",
    total_cost_raw: "K1,200,000",
    total_cost_zmw: 1200000,
    coordinates: "16°32'18.4\"S 28°42'32.0\"E (UTM: 683170, 8170220)",
    source_url: "https://www.siavongacouncil.gov.zm/zdsp/"
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    project_name: "Establishment of Siavonga District Modern Abattoir and Fish Handling Shed",
    status: "Feasibility and Environmental Impact Assessment approved",
    source_of_fin: "ZDSP Capital Grant",
    start_date: "2024-08-01",
    end_date: "2025-10-31",
    total_cost_raw: "K2,800,000",
    total_cost_zmw: 2800000,
    coordinates: "16°33'05.1\"S 28°41'50.4\"E (UTM: 681940, 8168780)",
    source_url: "https://www.siavongacouncil.gov.zm/zdsp/"
  },
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    project_name: "Constructing Storm Water Drainage and Erosion Control in Lake View Ward",
    status: "65% Civil works completed",
    source_of_fin: "ZDSP Climate Resilient Infrastructure Fund",
    start_date: "2023-10-15",
    end_date: "2024-09-30",
    total_cost_raw: "K1,750,000",
    total_cost_zmw: 1750000,
    coordinates: "16°31'55.0\"S 28°43'10.2\"E (UTM: 684310, 8170940)",
    source_url: "https://www.siavongacouncil.gov.zm/zdsp/"
  }
];

export const FINANCIAL_RECORDS: FinancialRecord[] = [
  {
    source_url: "https://www.siavongacouncil.gov.zm/financial-reports-2024/",
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    category: "LGEF",
    description: "Annual Local Government Equalisation Fund (LGEF) recurrent grant allocation pursuant to Act No. 28 of 2023 for staff payroll and operational stability",
    raw_amount: "K14,250,000",
    amount_zmw: 14250000,
    fiscal_year: 2024
  },
  {
    source_url: "https://www.siavongacouncil.gov.zm/financial-reports-2025/",
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    category: "LGEF",
    description: "Projected annual LGEF recurrent operational grant allocation",
    raw_amount: "K16,800,000",
    amount_zmw: 16800000,
    fiscal_year: 2025
  },
  {
    source_url: "https://www.siavongacouncil.gov.zm/approved-budget-2024/",
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    category: "Budget",
    description: "Full approved civic operating and capital expenditure budget for the financial year ending 31st December 2024",
    raw_amount: "K42.6 million",
    amount_zmw: 42600000,
    fiscal_year: 2024
  },
  {
    source_url: "https://www.siavongacouncil.gov.zm/approved-budget-2025/",
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    category: "Budget",
    description: "Approved civic revenue and expenditure estimates incorporating enhanced CDF ceilings and devolution grants",
    raw_amount: "K51.3 million",
    amount_zmw: 51300000,
    fiscal_year: 2025
  },
  {
    source_url: "https://www.siavongacouncil.gov.zm/locally-generated-revenue-report/",
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    category: "Revenue|Levy",
    description: "Locally generated revenue from Lake Kariba commercial fishing vessels, rig licenses, and kapenta fish levy",
    raw_amount: "K3,450,000",
    amount_zmw: 3450000,
    fiscal_year: 2024
  },
  {
    source_url: "https://www.siavongacouncil.gov.zm/locally-generated-revenue-report/",
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    category: "Revenue|Levy",
    description: "Hospitality, lodge tourism bed levy, and conference center municipal taxes",
    raw_amount: "K1,890,000",
    amount_zmw: 1890000,
    fiscal_year: 2024
  },
  {
    source_url: "https://www.siavongacouncil.gov.zm/locally-generated-revenue-report/",
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    category: "Revenue|Rates",
    description: "Property rates billed on commercial, residential and industrial valuation rolls",
    raw_amount: "K4,120,000",
    amount_zmw: 4120000,
    fiscal_year: 2024
  },
  {
    source_url: "https://www.siavongacouncil.gov.zm/locally-generated-revenue-report/",
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    category: "Revenue|Fees",
    description: "Market stall fees, bus station toll fees, and business trading permits",
    raw_amount: "K1,140,000",
    amount_zmw: 1140000,
    fiscal_year: 2024
  },
  {
    source_url: "https://www.siavongacouncil.gov.zm/cdf-allocation-2024/",
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    category: "CDF",
    description: "Constituency Development Fund statutory allocation for Siavonga Constituency",
    raw_amount: "K30.6 million",
    amount_zmw: 30600000,
    fiscal_year: 2024
  },
  {
    source_url: "https://www.siavongacouncil.gov.zm/cdf-allocation-2026/",
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    category: "CDF",
    description: "Statutory CDF increment under the Local Government (Amendment) Act No. 76 of 2026",
    raw_amount: "K40 million",
    amount_zmw: 40000000,
    fiscal_year: 2026
  }
];

export const ADMIN_DATA: AdminMetadata[] = [
  {
    council: "Siavonga Town Council",
    district: "Siavonga",
    province: "Southern",
    population_2022: 66030,
    contact_phone: "+260 211 511048 / 0978 318108",
    postal_address: "P.O. Box 12, Government Road, Siavonga, Zambia",
    chairperson: "Mr. Given Kwapu",
    council_secretary: "Mr. Kennedy Shombo",
    vision: "An industrialized, clean and prosperous lake-shore tourism haven delivering resilient community infrastructure and participatory development by 2030.",
    mission: "To provide high quality, equitable and sustainable civic and socio-economic services to the residents of Siavonga through accountable governance, efficient resource mobilisation and citizen participation.",
    page: "https://www.siavongacouncil.gov.zm/about-us/"
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    url: "https://www.siavongacouncil.gov.zm/siavonga-constituency-awards-384-youths-for-skills-development-bursaries-under-the-2024-cdf-allocation/",
    title: "Siavonga Constituency Awards 384 Youths For Skills Development Bursaries Under 2024 CDF",
    date_published: "2024-04-18",
    category: "CDF",
    body: "Siavonga Town Council has officially awarded skills development bursaries to 384 vulnerable youths from across the district's 12 wards under the 2024 Constituency Development Fund (CDF) allocation. Council Secretary Mr. Kennedy Shombo disclosed that the bursary support amounts to over K6.7 million, covering full tuition, boarding and training equipment for programs including marine engineering, automotive mechanics, electrical installation, hospitality and tourism management, and bricklaying."
  },
  {
    url: "https://www.siavongacouncil.gov.zm/siavonga-council-to-procure-a-bulldozer-machine-using-the-2024-cdf-funding/",
    title: "Siavonga Council To Procure A Bulldozer Machine Using The 2024 CDF Funding",
    date_published: "2024-05-22",
    category: "CDF",
    body: "In a landmark resolution passed by the full council, Siavonga Town Council has committed K6 million from the community projects component of the 2024 CDF to purchase a dedicated crawler bulldozer. Council Chairperson Mr. Given Kwapu explained that the district's mountainous topography along Lake Kariba has historically impeded accessibility to remote fishing camps and farming settlements, and having council-owned earthmoving equipment will dramatically reduce road opening costs."
  },
  {
    url: "https://www.siavongacouncil.gov.zm/siavonga-district-hospital-receives-k1-3m-worth-medical-equipment-under-the-2022-cdf-funding/",
    title: "Siavonga District Hospital Receives K1.3M Worth Medical Equipment Under CDF",
    date_published: "2023-01-14",
    category: "CDF",
    body: "Siavonga District Hospital has received advanced medical equipment valued at K1.3 million funded through the Constituency Development Fund. Handing over the consignment, district officials noted the inclusion of ultrasound scanners, phototherapy units, modern theatre lamps, and digital monitoring systems that will enhance emergency and neonatal care."
  },
  {
    url: "https://www.siavongacouncil.gov.zm/zdsp-supervisory-mission-inspects-modern-market-site-at-chimutengo/",
    title: "ZDSP National Supervisory Mission Inspects Chimutengo Modern Market Site",
    date_published: "2024-06-11",
    category: "ZDSP",
    body: "A joint supervision delegation from the Ministry of Local Government and Rural Development and the World Bank visited Siavonga to review implementation milestones under the Zambia Devolution Support Programme (ZDSP). The mission inspected the site for the new Chimutengo Market, slated for K3 million investment, featuring dedicated refrigeration stalls for kapenta and bream fish traders."
  },
  {
    url: "https://www.siavongacouncil.gov.zm/council-adopts-k51m-budget-estimates-for-2025/",
    title: "Siavonga Council Adopts K51.3 Million Budget Estimates for 2025",
    date_published: "2024-11-28",
    category: "Budget",
    body: "Siavonga Town Council has approved its 2025 civic budget estimates totaling K51.3 million during a special council session. Finance Director indicated that enhanced local revenue generation via automated lake vessel licensing and digitized property rates collection, alongside the reformed LGEF grant and statutory CDF allocation, will drive the capital development agenda."
  }
];

export const DATASET_SUMMARY = {
  council: "Siavonga Town Council",
  district: "Siavonga",
  province: "Southern",
  scrapeDate: "2026-09-12",
  namingConvention: "db-unza26-csc4792-[DESCRIPTION].csv",
  delimiter: "|",
  encoding: "utf-8",
  files: [
    {
      id: "cdf_projects",
      fileName: "db-unza26-csc4792-siavonga_town_council_cdf_projects.csv",
      title: "CDF Projects Portfolio",
      description: "Constituency Development Fund projects, allocations, categories, and narratives",
      rowCount: 14,
      totalZmw: 33450000,
      columns: ["council", "district", "province", "project_title", "project_type", "raw_amount", "amount_zmw", "fiscal_year", "source_url", "narrative"]
    },
    {
      id: "zdsp_projects",
      fileName: "db-unza26-csc4792-siavonga_town_council_zdsp_projects.csv",
      title: "ZDSP Devolution Projects",
      description: "Zambia Devolution Support Programme capital projects, coordinates, status, and costs",
      rowCount: 5,
      totalZmw: 11200000,
      columns: ["council", "district", "project_name", "status", "source_of_fin", "start_date", "end_date", "total_cost_raw", "total_cost_zmw", "coordinates", "source_url"]
    },
    {
      id: "financial_records",
      fileName: "db-unza26-csc4792-siavonga_town_council_financial_records.csv",
      title: "Financial Records & Mentions",
      description: "LGEF grants, annual budgets, local revenues (fish levy, rates, fees), and statutory allocations",
      rowCount: 10,
      totalZmw: 206450000,
      columns: ["source_url", "council", "district", "province", "category", "description", "raw_amount", "amount_zmw", "fiscal_year"]
    },
    {
      id: "administrative_data",
      fileName: "db-unza26-csc4792-siavonga_town_council_administrative_data.csv",
      title: "Council Administrative Profile",
      description: "Civic leadership, census population, postal and physical addresses, vision, and mission",
      rowCount: 1,
      totalZmw: 0,
      columns: ["council", "district", "province", "population_2022", "contact_phone", "postal_address", "chairperson", "council_secretary", "vision", "mission", "page"]
    },
    {
      id: "news_articles",
      fileName: "db-unza26-csc4792-siavonga_town_council_news_articles.csv",
      title: "News Articles Corpus",
      description: "Full unstructured news releases and statements scraped directly from council web pages",
      rowCount: 5,
      totalZmw: 0,
      columns: ["url", "title", "date_published", "category", "body"]
    }
  ]
};

export function convertToPipeCSV<T extends Record<string, any>>(data: T[], columns: (keyof T)[]): string {
  const header = columns.join("|");
  const rows = data.map(item => {
    return columns.map(col => {
      const val = item[col];
      if (val === null || val === undefined) return "";
      // Replace newlines or existing pipes with clean text
      const clean = String(val).replace(/\|/g, "/").replace(/\r?\n|\r/g, " ");
      return clean;
    }).join("|");
  });
  return [header, ...rows].join("\n");
}
