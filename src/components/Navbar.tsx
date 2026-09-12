import React from "react";
import { Database, BookOpen, FileText, Globe, CheckCircle2, Download, ExternalLink } from "lucide-react";

export type ActiveTab = "datasets" | "notebook" | "paper" | "kaggle" | "compliance";

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "datasets", label: "Datasets & Warehouse", icon: Database, badge: "5 CSVs" },
    { id: "notebook", label: "Jupyter Notebook", icon: BookOpen, badge: ".ipynb" },
    { id: "paper", label: "Data in Brief Paper", icon: FileText, badge: "Elsevier" },
    { id: "kaggle", label: "Kaggle Package", icon: Globe, badge: "CC BY 4.0" },
    { id: "compliance", label: "Submission & Rubric", icon: CheckCircle2, badge: "100/100" }
  ];

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with Academic identity */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-3 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              48
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  UNZA CSC 4792 • Mini Project
                </span>
                <span className="text-xs text-stone-500 hidden sm:inline">
                  Southern Province, Zambia
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-stone-900 leading-tight">
                Siavonga Town Council Data Mining Workbench
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.siavongacouncil.gov.zm"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-emerald-700 bg-stone-100 hover:bg-emerald-50 px-3 py-1.5 rounded-md border border-stone-200 transition-colors"
            >
              <span>siavongacouncil.gov.zm</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="/downloads/db-unza26-csc4792-siavonga_scraper.ipynb"
              download="db-unza26-csc4792-siavonga_scraper.ipynb"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 rounded-md shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .ipynb</span>
            </a>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 border-b-2 border-emerald-700 font-semibold shadow-2xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-700" : "text-stone-400"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive ? "bg-emerald-200/60 text-emerald-900" : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
