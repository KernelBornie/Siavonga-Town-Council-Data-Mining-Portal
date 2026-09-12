import React, { useState } from "react";
import { NOTEBOOK_CELLS } from "../data/notebookData";
import { CDF_PROJECTS, FINANCIAL_RECORDS } from "../data/datasets";
import { Download, Play, Terminal, Check, Copy, BarChart3, PieChart } from "lucide-react";

export const NotebookViewer: React.FC = () => {
  const [copiedCellId, setCopiedCellId] = useState<string | null>(null);
  const [executionState, setExecutionState] = useState<"idle" | "running" | "completed">("completed");

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

        <div className="flex items-center gap-2">
          <button
            onClick={handleRerun}
            disabled={executionState === "running"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors shadow-2xs"
          >
            <Play className={`w-3.5 h-3.5 text-emerald-600 ${executionState === "running" ? "animate-spin" : ""}`} />
            <span>{executionState === "running" ? "Executing..." : "Restart & Run All"}</span>
          </button>

          <a
            href="/downloads/db-unza26-csc4792-siavonga_scraper.ipynb"
            download="db-unza26-csc4792-siavonga_scraper.ipynb"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .ipynb</span>
          </a>
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

          <div className="space-y-2.5 pt-1">
            {Object.entries(cdfByType).map(([sector, amount]) => {
              const pct = ((amount / totalCdfZmw) * 100).toFixed(1);
              return (
                <div key={sector} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-800 font-medium truncate max-w-[240px]">{sector}</span>
                    <span className="font-mono text-stone-700">
                      ZMW {(amount / 1_000_000).toFixed(2)}M ({pct}%)
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

        {/* Financial Commitments by Fiscal Year Chart */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Figure 2: Financial Growth by Fiscal Year (2024-2026)
              </h3>
            </div>
            <span className="text-xs font-mono font-semibold text-blue-700">Reflecting Act 76 of 2026</span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3">
            {[2024, 2025, 2026].map((yr) => {
              const amt = finByYear[yr] || (yr === 2026 ? 40000000 : 0);
              const maxAmt = 100000000;
              const barHeightPct = Math.min(100, Math.round((amt / maxAmt) * 100));

              return (
                <div key={yr} className="flex flex-col items-center justify-end bg-stone-50 p-3 rounded-lg border border-stone-100 h-52">
                  <div className="text-[11px] font-mono font-bold text-stone-900 mb-2">
                    ZMW {(amt / 1_000_000).toFixed(1)}M
                  </div>
                  <div className="w-12 bg-stone-200 rounded-t-md relative flex items-end justify-center overflow-hidden h-32">
                    <div
                      className="w-full bg-blue-600 rounded-t-md transition-all duration-700"
                      style={{ height: `${barHeightPct}%` }}
                    />
                  </div>
                  <div className="text-xs font-bold text-stone-800 mt-2">{yr}</div>
                  <div className="text-[10px] text-stone-600">
                    {yr === 2026 ? "K40M Ceiling" : yr === 2025 ? "K51.3M Budget" : "K42.6M Budget"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Jupyter Notebook Rendered Cells */}
      <div className="bg-stone-100 border border-stone-300 rounded-xl p-3 sm:p-5 space-y-4 shadow-inner">
        {NOTEBOOK_CELLS.map((cell) => {
          if (cell.type === "markdown") {
            return (
              <div
                key={cell.id}
                className="bg-white rounded-lg p-4 border border-stone-200/80 shadow-2xs prose prose-stone max-w-none text-xs sm:text-sm"
              >
                <div className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-1 select-none">
                  Markdown Cell
                </div>
                <div className="whitespace-pre-line text-stone-800 leading-relaxed font-sans">
                  {cell.source}
                </div>
              </div>
            );
          }

          return (
            <div key={cell.id} className="space-y-1">
              {/* Code input box */}
              <div className="bg-stone-900 rounded-lg border border-stone-800 overflow-hidden shadow-xs">
                <div className="flex items-center justify-between px-3 py-1.5 bg-stone-950 border-b border-stone-800 text-[11px] text-stone-400 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">In [{cell.executionCount}]:</span>
                    <span className="text-stone-500">Python 3.12</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(cell.id, cell.source)}
                    className="flex items-center gap-1 text-stone-400 hover:text-stone-200 transition-colors"
                  >
                    {copiedCellId === cell.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 text-xs font-mono text-stone-100 overflow-x-auto leading-relaxed">
                  <code>{cell.source}</code>
                </pre>
              </div>

              {/* Execution Output box */}
              {cell.output && (
                <div className="pl-4 border-l-2 border-emerald-600 ml-2">
                  <div className="bg-stone-50 rounded-md border border-stone-200 p-2.5 text-xs font-mono text-stone-800 overflow-x-auto whitespace-pre-wrap">
                    <div className="text-[10px] text-stone-600 font-semibold mb-1 select-none">
                      Out [{cell.executionCount}]:
                    </div>
                    {cell.output}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
