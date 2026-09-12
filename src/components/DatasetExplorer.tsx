import React, { useState, useMemo } from "react";
import { 
  CDF_PROJECTS, 
  ZDSP_PROJECTS, 
  FINANCIAL_RECORDS, 
  ADMIN_DATA, 
  NEWS_ARTICLES,
  DATASET_SUMMARY,
  convertToPipeCSV,
  type CDFProject,
  type ZDSPProject,
  type FinancialRecord,
  type AdminMetadata,
  type NewsArticle
} from "../data/datasets";
import { 
  Download, 
  Copy, 
  Check, 
  Search, 
  Table as TableIcon, 
  Code, 
  SlidersHorizontal, 
  Info,
  ExternalLink,
  Coins,
  Building2,
  FileSpreadsheet
} from "lucide-react";

export const DatasetExplorer: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>("cdf_projects");
  const [viewMode, setViewMode] = useState<"table" | "raw" | "schema">("table");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copied, setCopied] = useState<boolean>(false);

  const currentFileMeta = DATASET_SUMMARY.files.find(f => f.id === selectedFileId)!;

  // Filter datasets based on query and category
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    if (selectedFileId === "cdf_projects") {
      return CDF_PROJECTS.filter(item => {
        const matchesQuery = !q || 
          item.project_title.toLowerCase().includes(q) ||
          item.narrative.toLowerCase().includes(q) ||
          item.project_type.toLowerCase().includes(q);
        const matchesCat = selectedCategory === "all" || item.project_type === selectedCategory;
        return matchesQuery && matchesCat;
      });
    }

    if (selectedFileId === "zdsp_projects") {
      return ZDSP_PROJECTS.filter(item => {
        const matchesQuery = !q || 
          item.project_name.toLowerCase().includes(q) ||
          item.status.toLowerCase().includes(q) ||
          item.source_of_fin.toLowerCase().includes(q);
        return matchesQuery;
      });
    }

    if (selectedFileId === "financial_records") {
      return FINANCIAL_RECORDS.filter(item => {
        const matchesQuery = !q || 
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);
        const matchesCat = selectedCategory === "all" || item.category.includes(selectedCategory);
        return matchesQuery && matchesCat;
      });
    }

    if (selectedFileId === "administrative_data") {
      return ADMIN_DATA;
    }

    if (selectedFileId === "news_articles") {
      return NEWS_ARTICLES.filter(item => {
        return !q || item.title.toLowerCase().includes(q) || item.body.toLowerCase().includes(q);
      });
    }

    return [];
  }, [selectedFileId, searchQuery, selectedCategory]);

  // Generate pipe-separated CSV text
  const pipeDelimitedText = useMemo(() => {
    if (selectedFileId === "cdf_projects") {
      return convertToPipeCSV(CDF_PROJECTS, currentFileMeta.columns as (keyof CDFProject)[]);
    }
    if (selectedFileId === "zdsp_projects") {
      return convertToPipeCSV(ZDSP_PROJECTS, currentFileMeta.columns as (keyof ZDSPProject)[]);
    }
    if (selectedFileId === "financial_records") {
      return convertToPipeCSV(FINANCIAL_RECORDS, currentFileMeta.columns as (keyof FinancialRecord)[]);
    }
    if (selectedFileId === "administrative_data") {
      return convertToPipeCSV(ADMIN_DATA, currentFileMeta.columns as (keyof AdminMetadata)[]);
    }
    if (selectedFileId === "news_articles") {
      return convertToPipeCSV(NEWS_ARTICLES, currentFileMeta.columns as (keyof NewsArticle)[]);
    }
    return "";
  }, [selectedFileId, currentFileMeta]);

  // Copy handler
  const handleCopy = () => {
    navigator.clipboard.writeText(pipeDelimitedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download handler
  const handleDownload = () => {
    const blob = new Blob([pipeDelimitedText], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", currentFileMeta.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Extract unique categories for CDF and Financials
  const categories = useMemo(() => {
    if (selectedFileId === "cdf_projects") {
      return Array.from(new Set(CDF_PROJECTS.map(p => p.project_type)));
    }
    if (selectedFileId === "financial_records") {
      return ["Budget", "CDF", "LGEF", "Revenue"];
    }
    return [];
  }, [selectedFileId]);

  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">Council District</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-xl font-bold text-stone-900">Siavonga</div>
          <p className="text-xs text-stone-700 mt-1">Southern Province • Pop. 66,030</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">Total Tracked Capital</span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-xl font-bold text-emerald-700">ZMW 251.1M</div>
          <p className="text-xs text-stone-700 mt-1">CDF (K40M), ZDSP & LGEF Grants</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">Delimiter Spec</span>
            <Code className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-xl font-mono font-bold text-stone-900">Pipe (|) Delimited</div>
          <p className="text-xs text-stone-700 mt-1">UTF-8 Encoded • No Escaping Bugs</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">Curated Files</span>
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-xl font-bold text-stone-900">5 Master CSVs</div>
          <p className="text-xs text-stone-700 mt-1">db-unza26-csc4792-* Naming</p>
        </div>
      </div>

      {/* File Selector Tabs */}
      <div className="bg-white rounded-xl border border-stone-200 p-2 shadow-2xs">
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {DATASET_SUMMARY.files.map((file) => {
            const isSelected = selectedFileId === file.id;
            return (
              <button
                key={file.id}
                onClick={() => {
                  setSelectedFileId(file.id);
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className={`flex-1 min-w-[200px] text-left px-3.5 py-2.5 rounded-lg text-xs transition-all ${
                  isSelected
                    ? "bg-stone-900 text-white shadow-xs font-medium"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700"
                }`}
              >
                <div className="font-semibold text-sm truncate">{file.title}</div>
                <div className={`text-[11px] truncate mt-0.5 ${isSelected ? "text-stone-300" : "text-stone-700"}`}>
                  {file.rowCount} rows • {file.columns.length} columns
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dataset Details & Controls Toolbar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-stone-900">{currentFileMeta.title}</h2>
              <span className="text-xs font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                {currentFileMeta.fileName}
              </span>
            </div>
            <p className="text-xs text-stone-700 mt-1">{currentFileMeta.description}</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-lg border border-stone-200 p-1 bg-stone-50 text-xs">
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  viewMode === "table" ? "bg-white shadow-2xs text-stone-900" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
              <button
                onClick={() => setViewMode("raw")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  viewMode === "raw" ? "bg-white shadow-2xs text-stone-900" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Raw Pipe (|)</span>
              </button>
              <button
                onClick={() => setViewMode("schema")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  viewMode === "schema" ? "bg-white shadow-2xs text-stone-900" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Schema</span>
              </button>
            </div>

            {/* Action buttons */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Pipe Data" : "Copy Pipe CSV"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ({currentFileMeta.fileName.slice(-16)})</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Controls (shown on table view) */}
        {viewMode === "table" && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-600 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search across title, narrative, status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {categories.length > 0 && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-600" />
                <span className="text-xs text-stone-600">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-xs border border-stone-200 rounded-lg px-2.5 py-1.5 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="all">All Sectors ({categories.length})</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="text-xs text-stone-700 w-full sm:w-auto text-right">
              Showing <span className="font-semibold text-stone-900">{filteredData.length}</span> of{" "}
              <span className="font-semibold text-stone-900">{currentFileMeta.rowCount}</span> entries
            </div>
          </div>
        )}

        {/* View Content */}
        {viewMode === "table" && (
          <div className="border border-stone-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto max-h-[520px]">
              <table className="w-full text-left text-xs text-stone-800 divide-y divide-stone-200">
                <thead className="bg-stone-50 sticky top-0 z-10 text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
                  <tr>
                    {selectedFileId === "cdf_projects" && (
                      <>
                        <th className="px-3 py-2.5">Project Title & Description</th>
                        <th className="px-3 py-2.5 whitespace-nowrap">Category</th>
                        <th className="px-3 py-2.5 whitespace-nowrap text-right">ZMW Amount</th>
                        <th className="px-3 py-2.5 whitespace-nowrap">Year</th>
                        <th className="px-3 py-2.5 whitespace-nowrap">Source</th>
                      </>
                    )}

                    {selectedFileId === "zdsp_projects" && (
                      <>
                        <th className="px-3 py-2.5">Project Name</th>
                        <th className="px-3 py-2.5">Status</th>
                        <th className="px-3 py-2.5 whitespace-nowrap">Source of Financing</th>
                        <th className="px-3 py-2.5 whitespace-nowrap text-right">Cost (ZMW)</th>
                        <th className="px-3 py-2.5 whitespace-nowrap">Coordinates</th>
                      </>
                    )}

                    {selectedFileId === "financial_records" && (
                      <>
                        <th className="px-3 py-2.5">Category</th>
                        <th className="px-3 py-2.5">Description</th>
                        <th className="px-3 py-2.5 whitespace-nowrap text-right">ZMW Amount</th>
                        <th className="px-3 py-2.5 whitespace-nowrap">Year</th>
                        <th className="px-3 py-2.5 whitespace-nowrap">Source</th>
                      </>
                    )}

                    {selectedFileId === "administrative_data" && (
                      <>
                        <th className="px-3 py-2.5">Council & District</th>
                        <th className="px-3 py-2.5">Population (2022)</th>
                        <th className="px-3 py-2.5">Chairperson & Secretary</th>
                        <th className="px-3 py-2.5">Address & Contacts</th>
                        <th className="px-3 py-2.5">Vision & Mission</th>
                      </>
                    )}

                    {selectedFileId === "news_articles" && (
                      <>
                        <th className="px-3 py-2.5">Title</th>
                        <th className="px-3 py-2.5 whitespace-nowrap">Published Date</th>
                        <th className="px-3 py-2.5 whitespace-nowrap">Category</th>
                        <th className="px-3 py-2.5">Full Text Body</th>
                        <th className="px-3 py-2.5 whitespace-nowrap">Link</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {selectedFileId === "cdf_projects" &&
                    (filteredData as CDFProject[]).map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                        <td className="px-3 py-2.5 max-w-md">
                          <div className="font-medium text-stone-900">{row.project_title}</div>
                          <p className="text-[11px] text-stone-700 mt-1 line-clamp-2">{row.narrative}</p>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {row.project_type}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right font-mono font-semibold text-stone-900">
                          ZMW {row.amount_zmw.toLocaleString()}
                          <div className="text-[10px] font-normal text-stone-600">{row.raw_amount}</div>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap font-mono text-stone-600">{row.fiscal_year}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <a
                            href={row.source_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                          >
                            <span>Dispatch</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}

                  {selectedFileId === "zdsp_projects" &&
                    (filteredData as ZDSPProject[]).map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                        <td className="px-3 py-2.5 font-medium text-stone-900 max-w-xs">{row.project_name}</td>
                        <td className="px-3 py-2.5 text-stone-600 max-w-xs">{row.status}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-stone-600">{row.source_of_fin}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right font-mono font-semibold text-stone-900">
                          ZMW {row.total_cost_zmw.toLocaleString()}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap font-mono text-[11px] text-stone-600">
                          {row.coordinates}
                        </td>
                      </tr>
                    ))}

                  {selectedFileId === "financial_records" &&
                    (filteredData as FinancialRecord[]).map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-800 border border-stone-200">
                            {row.category}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-stone-800 max-w-lg">{row.description}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right font-mono font-semibold text-stone-900">
                          ZMW {row.amount_zmw.toLocaleString()}
                          <div className="text-[10px] font-normal text-stone-600">{row.raw_amount}</div>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap font-mono text-stone-600">{row.fiscal_year}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <a
                            href={row.source_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                          >
                            <span>Report</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}

                  {selectedFileId === "administrative_data" &&
                    (filteredData as AdminMetadata[]).map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                        <td className="px-3 py-2.5">
                          <div className="font-semibold text-stone-900">{row.council}</div>
                          <div className="text-stone-700">{row.district} District, {row.province} Province</div>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap font-mono font-medium">
                          {row.population_2022.toLocaleString()}
                        </td>
                        <td className="px-3 py-2.5">
                          <div><span className="font-medium">Chairperson:</span> {row.chairperson}</div>
                          <div><span className="font-medium">Council Secretary:</span> {row.council_secretary}</div>
                        </td>
                        <td className="px-3 py-2.5 text-stone-700">
                          <div>{row.postal_address}</div>
                          <div className="text-emerald-800 font-mono mt-0.5">{row.contact_phone}</div>
                        </td>
                        <td className="px-3 py-2.5 max-w-sm text-stone-700">
                          <div className="text-[11px]"><span className="font-medium text-stone-900">Vision:</span> {row.vision}</div>
                          <div className="text-[11px] mt-1"><span className="font-medium text-stone-900">Mission:</span> {row.mission}</div>
                        </td>
                      </tr>
                    ))}

                  {selectedFileId === "news_articles" &&
                    (filteredData as NewsArticle[]).map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                        <td className="px-3 py-2.5 font-medium text-stone-900 max-w-xs">{row.title}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-stone-600 font-mono">{row.date_published}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                            {row.category}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-stone-700 max-w-lg line-clamp-3">{row.body}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                          >
                            <span>Article</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Raw Pipe Delimited View */}
        {viewMode === "raw" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-700">
              <span>Standard Pipe-Delimited Syntax (RFC 4180 format with `|` column separator)</span>
              <span className="font-mono">{pipeDelimitedText.split("\n").length} lines • {pipeDelimitedText.length} bytes</span>
            </div>
            <pre className="p-3 bg-stone-900 text-stone-100 rounded-lg text-xs font-mono overflow-x-auto max-h-[500px] leading-relaxed select-all">
              {pipeDelimitedText}
            </pre>
          </div>
        )}

        {/* Schema / Data Dictionary View */}
        {viewMode === "schema" && (
          <div className="space-y-3">
            <div className="text-xs text-stone-600">
              Column field specifications and data types for <span className="font-mono font-semibold">{currentFileMeta.fileName}</span>:
            </div>
            <div className="border border-stone-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs divide-y divide-stone-200">
                <thead className="bg-stone-50 text-[11px] font-semibold text-stone-700 uppercase">
                  <tr>
                    <th className="px-3 py-2">Column Name</th>
                    <th className="px-3 py-2">Data Type</th>
                    <th className="px-3 py-2">Nullability</th>
                    <th className="px-3 py-2">Description & Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {currentFileMeta.columns.map((col) => {
                    let type = "string";
                    let desc = "Text attribute";
                    if (col.includes("amount") || col.includes("cost")) {
                      type = col.includes("raw") ? "string" : "float (ZMW)";
                      desc = "Monetary valuation standardized to Zambian Kwacha";
                    } else if (col.includes("year") || col.includes("population")) {
                      type = "integer";
                      desc = "Numerical calendar year or population count";
                    } else if (col.includes("url") || col.includes("page")) {
                      type = "string (URL)";
                      desc = "Canonical HTTPS source web address";
                    } else if (col.includes("coordinates")) {
                      type = "string (GPS)";
                      desc = "Geographic coordinates / UTM reference points";
                    }

                    return (
                      <tr key={col} className="hover:bg-stone-50">
                        <td className="px-3 py-2 font-mono font-semibold text-stone-900">{col}</td>
                        <td className="px-3 py-2 font-mono text-emerald-800">{type}</td>
                        <td className="px-3 py-2 text-stone-700">NOT NULL</td>
                        <td className="px-3 py-2 text-stone-700">{desc}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Direct downloads list */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-700" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-700">Direct Download Repository</h3>
          </div>
          <span className="text-[11px] text-stone-600 font-mono">public/downloads/*</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {DATASET_SUMMARY.files.map((file) => (
            <a
              key={file.id}
              href={`/downloads/${file.fileName}`}
              download={file.fileName}
              className="flex items-center justify-between p-2.5 bg-white border border-stone-200 hover:border-emerald-500 rounded-lg text-xs transition-colors group shadow-2xs"
            >
              <div className="truncate mr-2">
                <div className="font-mono text-[11px] font-semibold text-stone-900 group-hover:text-emerald-700 truncate">
                  {file.fileName}
                </div>
                <div className="text-[10px] text-stone-600">{file.rowCount} rows • Pipe Delimited</div>
              </div>
              <Download className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 shrink-0" />
            </a>
          ))}
          <a
            href="/downloads/manifest.json"
            download="manifest.json"
            className="flex items-center justify-between p-2.5 bg-white border border-stone-200 hover:border-emerald-500 rounded-lg text-xs transition-colors group shadow-2xs"
          >
            <div className="truncate mr-2">
              <div className="font-mono text-[11px] font-semibold text-stone-900 group-hover:text-emerald-700">
                manifest.json
              </div>
              <div className="text-[10px] text-stone-600">Machine-Readable Provenance Meta</div>
            </div>
            <Download className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
};
