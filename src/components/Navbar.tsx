import React, { useRef } from "react";
import { Database, BookOpen, FileText, Globe, CheckCircle2, ExternalLink } from "lucide-react";
import { NotebookExportDropdown } from "./NotebookExportDropdown";

export type ActiveTab = "datasets" | "notebook" | "paper" | "kaggle" | "compliance";

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: "datasets", label: "Datasets & Warehouse", icon: Database, badge: "5 CSVs" },
    { id: "notebook", label: "Jupyter Notebook", icon: BookOpen, badge: ".ipynb" },
    { id: "paper", label: "Data in Brief Paper", icon: FileText, badge: "Elsevier" },
    { id: "kaggle", label: "Kaggle Package", icon: Globe, badge: "CC BY 4.0" },
    { id: "compliance", label: "About Submission", icon: CheckCircle2 }
  ];

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation for tab switching (ArrowLeft, ArrowRight, Home, End)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = -1;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== -1) {
      setActiveTab(tabs[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

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

            <NotebookExportDropdown />
          </div>
        </div>

        {/* Navigation tabs with full keyboard arrow navigation support */}
        <nav
          role="tablist"
          aria-label="Application Sections"
          className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none"
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[index] = el)}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-1 ${
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
