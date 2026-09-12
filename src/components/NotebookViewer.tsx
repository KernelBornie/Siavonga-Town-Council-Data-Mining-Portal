import React, { useState } from "react";
import { NOTEBOOK_CELLS } from "../data/notebookData";
import { CDF_PROJECTS, FINANCIAL_RECORDS } from "../data/datasets";
import { ExportMenu } from "./ExportMenu";
import { Play, Terminal, Check, Copy, PieChart } from "lucide-react";

export const NotebookViewer: React.FC = () => {
  const [copiedCellId, setCopiedCellId] = useState<string | null>(null);
  const [executionState, setExecutionState] = useState<"idle" | "running" | "completed">("completed");

  const notebookFormats = [
    { label: ".ipynb", ext: "ipynb" as const },
    { label: "PDF", ext: "pdf" as const },
    { label: "HTML", ext: "html" as const },
    { label: "Python", ext: "py" as const },
    { label: "Markdown", ext: "md" as const },
    { label: "Print", ext: "print" as const },
  ];

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCellId(id);
    setTimeout(() => setCopiedCellId(null), 2000);
  };

  const handleRerun = () => {
    setExecutionState("running");
    setTimeout(() => {
      setExecutionState("completed");
    }, 800);
  };

  // Group CDF projects by type for chart
  const cdfByType = CDF_PROJECTS.reduce<Record<string, number>>((acc, p) => {
    acc[p.project_type] = (acc[p.project_type] || 0) + p.amount_zmw;
    return acc;
  }, {});

  const totalCdfZmw = Object.values(cdfByType).reduce((a, b) => a + b, 0);

  // Group Financial commitments by year
  const finByYear = FINANCIAL_RECORDS.reduce<Record<number, number>>((acc, f) => {
    acc[f.fiscal_year] = (acc[f.fiscal_year] || 0) + f.amount_zmw;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Notebook Toolbar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-50 text-orange-700 border border-orange-200">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-stone-900 font-mono">
                db-unza26-csc4792-siavonga_scraper.ipynb
              </h2>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                Python 3.12 (Kernel Ready)
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              16 interactive cells • BeautifulSoup4 BFS crawler • Pandas data transformation • Quality assertions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleRerun}
            disabled={executionState === "running"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors shadow-2xs"
          >
            <Play className={`w-3.5 h-3.5 text-emerald-600 ${executionState === "running" ? "animate-spin" : ""}`} />
            <span>{executionState === "running" ? "Executing..." : "Restart & Run All"}</span>
          </button>

          <ExportMenu
            basePath="/downloads/db-unza26-csc4792-siavonga_scraper"
            filenameBase="db-unza26-csc4792-siavonga_scraper"
            formats={notebookFormats}
          />
        </div>
      </div>

      {/* Visual Analytics Preview (Outputs of Notebook Cells) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CDF Allocations by Sector Bar Chart */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Figure 1: Siavonga CDF Spending by Sector
              </h3>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-700">
              ZMW {(totalCdfZmw / 1_000_000).toFixed(2)}M
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {Object.entries(cdfByType).map(([type, amount]) => {
              const pct = (amount / totalCdfZmw) * 100;
              return (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-stone-700">
                    <span className="truncate pr-2 font-medium">{type}</span>
                    <span className="font-mono text-stone-900 shrink-0">
                      K{(amount / 1_000_000).toFixed(2)}M ({pct.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Commitments by Fiscal Year */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Figure 2: Financial Disclosures by Fiscal Year
              </h3>
            </div>
            <span className="text-xs font-mono font-semibold text-blue-700">
              2022–2026 Disclosures
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {Object.entries(finByYear)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([year, amount]) => {
                const maxAmount = Math.max(...Object.values(finByYear));
                const pct = (amount / maxAmount) * 100;
                return (
                  <div key={year} className="space-y-1">
                    <div className="flex justify-between text-stone-700">
                      <span className="font-bold text-stone-900 font-mono">FY {year}</span>
                      <span className="font-mono text-stone-900">
                        ZMW {(amount / 1_000_000).toFixed(2)}M
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Interactive Notebook Cells Rendering */}
      <div className="space-y-4">
        {NOTEBOOK_CELLS.map((cell, idx) => (
          <div
            key={cell.id}
            className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden"
          >
            {/* Cell Header */}
            <div className="bg-stone-50/80 px-4 py-2 border-b border-stone-200 flex items-center justify-between text-xs font-mono text-stone-500">
              <div className="flex items-center gap-2">
                <span className={cell.type === "code" ? "text-emerald-700 font-bold" : "text-stone-700 font-semibold"}>
                  [{cell.type.toUpperCase()}]
                </span>
                <span>Cell {idx + 1} of {NOTEBOOK_CELLS.length}</span>
                {cell.executionCount && (
                  <span className="text-stone-400">In [{cell.executionCount}]</span>
                )}
              </div>

              {cell.type === "code" && (
                <button
                  onClick={() => handleCopyCode(cell.id, cell.source)}
                  className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 transition-colors"
                >
                  {copiedCellId === cell.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedCellId === cell.id ? "Copied" : "Copy"}</span>
                </button>
              )}
            </div>

            {/* Cell Source */}
            <div className="p-4">
              {cell.type === "markdown" ? (
                <div className="prose prose-xs max-w-none text-stone-800 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed font-sans">
                  {cell.source}
                </div>
              ) : (
                <pre className="p-3 bg-stone-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
                  <code>{cell.source}</code>
                </pre>
              )}
            </div>

            {/* Cell Output (if code cell) */}
            {cell.type === "code" && cell.output && (
              <div className="px-4 pb-4">
                <div className="text-[10px] font-mono uppercase tracking-wider text-stone-600 mb-1">
                  Out [{cell.executionCount}]:
                </div>
                <pre className="p-3 bg-stone-50 text-stone-800 border border-stone-200 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
                  <code>{cell.output}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotebookViewer;
