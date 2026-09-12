import { useState } from "react";
import { Navbar, type ActiveTab } from "./components/Navbar";
import { DatasetExplorer } from "./components/DatasetExplorer";
import { NotebookViewer } from "./components/NotebookViewer";
import { PaperViewer } from "./components/PaperViewer";
import { KagglePortal } from "./components/KagglePortal";
import { SubmissionCompliance } from "./components/SubmissionCompliance";
import { DownloadDeliverables } from "./components/DownloadDeliverables";
import { DATASET_SUMMARY } from "./data/datasets";
import { Download, ExternalLink, GraduationCap, MapPin, Scale } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("datasets");

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 flex flex-col font-sans antialiased">
      {/* Navbar Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero / Context Sub-header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span>The University of Zambia • School of Natural Sciences • Dept. of Computer Science</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                2025/26 CSC 4792 Mini Project — Group #48: Siavonga Town Council
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
                A complete, machine-readable data warehouse and reproducible scraping pipeline capturing Constituency Development Fund (CDF K40M), Zambia Devolution Support Programme (ZDSP), local revenue streams, and municipal administration for Siavonga District.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lake Kariba, Southern Province</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 font-medium">
                <Scale className="w-3.5 h-3.5 text-blue-600" />
                <span>Act No. 76 of 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {activeTab === "datasets" && <DatasetExplorer />}
        {activeTab === "notebook" && <NotebookViewer />}
        {activeTab === "paper" && <PaperViewer />}
        {activeTab === "kaggle" && <KagglePortal />}
        {activeTab === "compliance" && <SubmissionCompliance />}

        {/* Global Download Deliverables Section */}
        <DownloadDeliverables />
      </main>

      {/* Academic Footer */}
      <footer className="bg-white border-t border-stone-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600">
            <div>
              <div className="font-bold text-stone-900 text-sm mb-2">Project Overview</div>
              <p className="leading-relaxed text-stone-600">
                Data Mining and Warehousing (CSC 4792) coursework project for <strong>Siavonga Town Council</strong> (Team #48), University of Zambia, Department of Computing and Infomatics.
              </p>
              <div className="mt-2 text-[11px] text-stone-600">
                District: <strong>Siavonga</strong> • Province: <strong>Southern</strong>
              </div>
            </div>

            <div>
              <div className="font-bold text-stone-900 text-sm mb-2">Dataset Specifications</div>
              <ul className="space-y-1 text-stone-600">
                <li>• Delimiter: Pipe (<code className="font-mono text-stone-800">|</code>) column separator</li>
                <li>• Naming: <code className="font-mono text-stone-800">db-unza26-csc4792-[DESCRIPTION].csv</code></li>
                <li>• Structure: 5 relational CSV files, UTF-8 encoded</li>
                <li>• Formats: CSV, JSON, XLSX, Markdown, HTML</li>
                <li>• Reproducibility: Standalone Jupyter scraper (.ipynb)</li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-stone-900 text-sm mb-2">Download Deliverables</div>
              <div className="space-y-1.5">
                <a
                  href="/downloads/db-unza26-csc4792-siavonga_scraper.ipynb"
                  download="db-unza26-csc4792-siavonga_scraper.ipynb"
                  className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Jupyter Scraper Notebook (.ipynb)</span>
                </a>
                <a
                  href="/downloads/data_in_brief_siavonga.md"
                  download="data_in_brief_siavonga.md"
                  className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Data in Brief Article Manuscript (.md)</span>
                </a>
                <a
                  href="/downloads/manifest.json"
                  download="manifest.json"
                  className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Dataset Provenance Manifest (.json)</span>
                </a>
                <a
                  href="https://www.siavongacouncil.gov.zm"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Official Council Website (Source)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600 gap-2">
            <div>
              © 2026 Project Team #48 • University of Zambia. Data licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).
            </div>
            <div className="font-mono text-stone-600">
              Version 1.0.0 • Scrape Date: {DATASET_SUMMARY.scrapeDate}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
