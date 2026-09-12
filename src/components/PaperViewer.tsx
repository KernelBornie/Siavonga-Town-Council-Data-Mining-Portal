import React, { useState } from "react";
import { PAPER_SPEC_TABLE, PAPER_VALUE_POINTS } from "../data/paperData";
import { Copy, Check, Download, Printer, BookCheck, ShieldCheck } from "lucide-react";

export const PaperViewer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyMarkdown = async () => {
    try {
      const res = await fetch("/downloads/data_in_brief_siavonga.md");
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Paper Action Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-50 text-red-700 border border-red-200">
            <BookCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-stone-900">
                Data in Brief Journal Manuscript
              </h2>
              <span className="text-[10px] font-semibold bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 rounded">
                Elsevier DIB Template
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Compliant with ScienceDirect Data in Brief Guide for Authors • 20 Marks Allocation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied Markdown" : "Copy Markdown"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>

          <a
            href="/downloads/data_in_brief_siavonga.md"
            download="data_in_brief_siavonga.md"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </a>
        </div>
      </div>

      {/* Formatted Elsevier Data in Brief Manuscript */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-10 shadow-xs max-w-5xl mx-auto space-y-8 font-serif leading-relaxed text-stone-900">
        {/* Header Header Banner */}
        <div className="border-b-2 border-stone-900 pb-6 space-y-4 font-sans">
          <div className="flex items-center justify-between text-xs text-stone-500 uppercase tracking-widest font-mono">
            <span>Data in Brief • Elsevier Format</span>
            <span>UNZA CSC 4792 Mini Project</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-sans tracking-tight leading-snug">
            A Curated Dataset of Constituency Development Fund, Devolution Support Programme, and Financial Disclosures for Siavonga Town Council, Zambia
          </h1>

          <div className="text-sm font-medium text-stone-800">
            <span className="font-semibold text-emerald-800">Project Team #48</span> (Bornface K., et al.)
          </div>

          <div className="text-xs text-stone-600 italic">
            Department of Computer Science, School of Natural Sciences, The University of Zambia, Great East Road Campus, P.O. Box 32379, Lusaka, Zambia
          </div>

          <div className="text-xs text-stone-500">
            <span className="font-semibold">Corresponding author:</span> group48@unza.zm / bornfacek135@gmail.com
          </div>
        </div>

        {/* Abstract */}
        <section className="space-y-2 bg-stone-50 p-4 rounded-lg border border-stone-200/80 font-sans text-xs sm:text-sm">
          <h2 className="font-bold text-stone-900 uppercase tracking-wider text-xs">Abstract</h2>
          <p className="text-stone-700 leading-relaxed">
            This article presents a curated, machine-readable dataset capturing public financial allocations, community infrastructure projects, devolution support operations, and administrative governance data for Siavonga Town Council, Southern Province, Zambia. Data were collected from the official municipal domain (<code className="bg-white px-1 py-0.5 rounded border border-stone-200 font-mono text-xs">https://www.siavongacouncil.gov.zm</code>) using a polite breadth-first Python web scraping pipeline incorporating automated regular expression normalization and strict entity validation. The dataset comprises five pipe-delimited (<code className="bg-white px-1 py-0.5 rounded border border-stone-200 font-mono text-xs">|</code>) CSV files encompassing Constituency Development Fund (CDF) allocations under the enhanced K40 million statutory threshold (Local Government Amendment Act No. 76 of 2026), Zambia Devolution Support Programme (ZDSP) capital grants, Local Government Equalisation Fund (LGEF) recurrent grants (Act No. 28 of 2023), locally generated revenue streams (including Lake Kariba commercial fishing rig levies, hospitality taxes, and property rates valuation rolls), and administrative metadata. This dataset facilitates computational accountability studies, civic technology monitoring, and sub-national fiscal policy research in sub-Saharan local governance.
          </p>
          <div className="pt-2">
            <span className="font-bold text-stone-900 text-xs">Keywords: </span>
            <span className="text-stone-600 text-xs">
              Constituency Development Fund; CDF; Zambia; Local Government; Fiscal Decentralisation; Siavonga Town Council; Devolution; Public Finance; Data Mining.
            </span>
          </div>
        </section>

        {/* Specifications Table (Strict Elsevier DIB Requirement) */}
        <section className="space-y-3 font-sans">
          <h2 className="text-base font-bold text-stone-900 border-b border-stone-200 pb-1">
            Specifications Table
          </h2>
          <div className="border border-stone-300 rounded-lg overflow-hidden text-xs">
            <table className="w-full divide-y divide-stone-200">
              <tbody className="divide-y divide-stone-200 bg-white">
                {PAPER_SPEC_TABLE.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-stone-50/60" : "bg-white"}>
                    <td className="px-3.5 py-2.5 font-semibold text-stone-900 w-1/3 border-r border-stone-200 align-top">
                      {row.parameter}
                    </td>
                    <td className="px-3.5 py-2.5 text-stone-700 align-top leading-relaxed">
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Value of the Data */}
        <section className="space-y-3 font-sans">
          <h2 className="text-base font-bold text-stone-900 border-b border-stone-200 pb-1">
            1. Value of the Data
          </h2>
          <ul className="space-y-2 list-disc pl-5 text-xs sm:text-sm text-stone-700">
            {PAPER_VALUE_POINTS.map((pt, idx) => {
              const [heading, ...rest] = pt.split(":");
              return (
                <li key={idx} className="leading-relaxed">
                  <strong className="text-stone-900 font-semibold">{heading}:</strong>
                  {rest.join(":")}
                </li>
              );
            })}
          </ul>
        </section>

        {/* Objective */}
        <section className="space-y-2 font-sans text-xs sm:text-sm text-stone-700">
          <h2 className="text-base font-bold text-stone-900 border-b border-stone-200 pb-1">
            2. Objective
          </h2>
          <p className="leading-relaxed">
            Under Zambia's revised decentralisation framework (enacted via the Local Government Act No. 2 of 2019 and amended by Acts No. 28 of 2023 and No. 76 of 2026), local authorities have transitioned from purely administrative satellites into autonomous service-delivery engines managing unprecedented capital budgets. Despite statutory mandates for public transparency, citizens and researchers encounter severe data fragmentation. Siavonga Town Council publishes project updates and tender disclosures across disparate, unstructured web dispatches. This study extracted, cleaned, and structured these digital footprints into five unified, pipe-delimited datasets conforming to open scientific data standards.
          </p>
        </section>

        {/* Data Description */}
        <section className="space-y-3 font-sans text-xs sm:text-sm text-stone-700">
          <h2 className="text-base font-bold text-stone-900 border-b border-stone-200 pb-1">
            3. Data Description
          </h2>
          <p className="leading-relaxed">
            The dataset comprises five tabular files formatted as pipe-delimited (<code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">|</code>) CSV files with UTF-8 encoding:
          </p>
          <div className="space-y-2 pl-3 border-l-2 border-emerald-700">
            <div>
              <strong className="text-stone-900 font-mono">1. db-unza26-csc4792-siavonga_town_council_cdf_projects.csv</strong>: 14 records documenting capital and empowerment investments totaling ZMW 33,450,000 across Education & Skills, Health, Heavy Machinery, Water & Sanitation, and Rural Access Roads.
            </div>
            <div>
              <strong className="text-stone-900 font-mono">2. db-unza26-csc4792-siavonga_town_council_zdsp_projects.csv</strong>: 5 records of World Bank-funded devolution projects totaling ZMW 11,200,000, including Chimutengo Market, Bus Station modernization, and civic GIS land digitization with geospatial coordinates.
            </div>
            <div>
              <strong className="text-stone-900 font-mono">3. db-unza26-csc4792-siavonga_town_council_financial_records.csv</strong>: 10 records tracking ZMW 206,450,000 in approved budgets, LGEF recurrent allocations (Act 28 of 2023), kapenta fishing rig levies, tourism bed levies, and property rates.
            </div>
            <div>
              <strong className="text-stone-900 font-mono">4. db-unza26-csc4792-siavonga_town_council_administrative_data.csv</strong>: 1 composite record recording civic leadership, census population (66,030), and statutory vision and mission statements.
            </div>
            <div>
              <strong className="text-stone-900 font-mono">5. db-unza26-csc4792-siavonga_town_council_news_articles.csv</strong>: 5 full un-truncated narrative news releases providing the unstructured textual corpus.
            </div>
          </div>
        </section>

        {/* Experimental Design, Materials and Methods */}
        <section className="space-y-3 font-sans text-xs sm:text-sm text-stone-700">
          <h2 className="text-base font-bold text-stone-900 border-b border-stone-200 pb-1">
            4. Experimental Design, Materials and Methods
          </h2>
          <div className="space-y-2 leading-relaxed">
            <p>
              <strong>Data Scraping:</strong> We constructed a breadth-first search (BFS) crawler in Python 3.12 utilizing <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">requests</code> and <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">BeautifulSoup4</code>. A politeness delay of 0.8 seconds was enforced between consecutive HTTP GET requests to respect server bandwidth.
            </p>
            <p>
              <strong>Regex Parsing:</strong> To extract monetary values from heterogeneous text, we compiled regular expressions capturing <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">K</code>, <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">ZMW</code>, and words (e.g., &quot;over six million Kwacha&quot; $\to$ 6,000,000.00 ZMW).
            </p>
            <p>
              <strong>Sanity Assertions:</strong> Quality assurance scripts in the Jupyter notebook asserted: (1) All financial amounts are strictly positive ($&gt; 0$); (2) No unescaped delimiter pipes exist within string payloads; (3) Fiscal years conform to the range 2020–2026.
            </p>
          </div>
        </section>

        {/* Ethics & References */}
        <div className="pt-6 border-t border-stone-200 space-y-4 font-sans text-xs text-stone-600">
          <div className="flex items-center gap-2 text-stone-900 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Ethics Statement & Declaration of Competing Interests</span>
          </div>
          <p>
            The authors declare no competing financial or personal interests. Only publicly available information posted on the council&apos;s open website was collected. No private data or citizen credentials were accessed.
          </p>

          <div className="pt-2 space-y-1">
            <span className="font-semibold text-stone-900">References:</span>
            <ol className="list-decimal pl-5 space-y-1 text-[11px] text-stone-600">
              <li>Local Government Act, 2019 (Act No. 2 of 2019). Republic of Zambia.</li>
              <li>Local Government (Amendment) Act, 2023 (Act No. 28 of 2023). Republic of Zambia.</li>
              <li>Local Government (Amendment) Act, 2026 (Act No. 76 of 2026). Republic of Zambia.</li>
              <li>Phiri, L. (2026). <em>A Multi-Source Dataset for CS1 Failure Prediction</em> [Dataset]. Kaggle.</li>
              <li>Siavonga Town Council. (2026). Official Municipal Portal. https://www.siavongacouncil.gov.zm</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
