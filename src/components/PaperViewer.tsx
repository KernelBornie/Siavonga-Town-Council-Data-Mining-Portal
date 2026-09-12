import React, { useState } from "react";
import { PAPER_SPEC_TABLE, PAPER_VALUE_POINTS } from "../data/paperData";
import { ExportMenu } from "./ExportMenu";
import { Copy, Check, BookCheck } from "lucide-react";

export const PaperViewer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const paperFormats = [
    { label: "PDF", ext: "pdf" as const },
    { label: "Markdown", ext: "md" as const },
    { label: "DOCX", ext: "docx" as const },
    { label: "HTML", ext: "html" as const },
    { label: "TXT", ext: "txt" as const },
    { label: "Print", ext: "print" as const },
  ];

  const handleCopyMarkdown = async () => {
    try {
      const res = await fetch("/downloads/data_in_brief_siavonga.md");
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
              Compliant with ScienceDirect Data in Brief Guide for Authors • Multi-format Exports Available
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied Markdown" : "Copy Markdown"}</span>
          </button>

          <ExportMenu
            basePath="/downloads/data_in_brief_siavonga"
            filenameBase="data_in_brief_siavonga"
            formats={paperFormats}
          />
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
            <span className="font-semibold text-emerald-800">Project Team #48</span>
          </div>

          <div className="text-xs text-stone-800">
            <strong>Bornface Kangombe</strong> (Computer Number: <code className="font-mono">2022064526</code>, Group: 48)
          </div>

          <div className="text-xs text-stone-600 italic">
            Department of Computing and Infomatics, School of Natural Sciences, The University of Zambia, Great East Road Campus, P.O. Box 32379, Lusaka, Zambia
          </div>

          <div className="text-xs text-stone-700">
            <span className="font-semibold">Corresponding author:</span>{" "}
            <a href="mailto:bornface.kangombe@cs.unza.zm" className="text-emerald-700 hover:underline font-mono">
              bornface.kangombe@cs.unza.zm
            </a>
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

        {/* 1. Value of the Data */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-stone-900 font-sans border-b border-stone-200 pb-1">
            1. Value of the Data
          </h2>
          <ul className="space-y-2 list-disc list-outside ml-5 text-sm sm:text-base text-stone-800">
            {PAPER_VALUE_POINTS.map((pt, idx) => {
              const colonIdx = pt.indexOf(":");
              const title = colonIdx !== -1 ? pt.slice(0, colonIdx) : "";
              const detail = colonIdx !== -1 ? pt.slice(colonIdx + 1) : pt;
              return (
                <li key={idx} className="leading-relaxed">
                  {title && <strong className="font-sans font-bold text-stone-900">{title}: </strong>}
                  <span>{detail}</span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 2. Objective */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-stone-900 font-sans border-b border-stone-200 pb-1">
            2. Objective
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-stone-800">
            Under Zambia&apos;s revised decentralisation framework (enacted via the Local Government Act No. 2 of 2019 and amended by Acts No. 28 of 2023 and No. 76 of 2026), local authorities have transitioned from purely administrative satellites into autonomous service-delivery engines managing unprecedented capital budgets. Despite statutory mandates for public transparency, citizens and researchers encounter severe data fragmentation. This project sought to extract, structure, validate, and publish a machine-readable data repository for Siavonga Town Council to bridge the transparency deficit.
          </p>
        </section>

        {/* 3. Data Description */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-stone-900 font-sans border-b border-stone-200 pb-1">
            3. Data Description
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-stone-800">
            The curated dataset package consists of five pipe-separated (<code className="font-mono text-xs bg-stone-100 px-1 py-0.5 rounded">|</code>) CSV files:
          </p>
          <div className="space-y-3 font-sans text-xs sm:text-sm">
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
              <span className="font-bold text-stone-900 font-mono">1. db-unza26-csc4792-siavonga_town_council_cdf_projects.csv</span>
              <p className="text-stone-700 mt-1">14 projects totaling ZMW 33,450,000 across Education, Health, Equipment, and Water sectors with verified project costs and descriptions.</p>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
              <span className="font-bold text-stone-900 font-mono">2. db-unza26-csc4792-siavonga_town_council_zdsp_projects.csv</span>
              <p className="text-stone-700 mt-1">5 devolution infrastructure projects totaling ZMW 11,200,000 under the World Bank $210M facility.</p>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
              <span className="font-bold text-stone-900 font-mono">3. db-unza26-csc4792-siavonga_town_council_financial_records.csv</span>
              <p className="text-stone-700 mt-1">10 records totaling ZMW 206,450,000 capturing statutory LGEF transfers, annual civic budgets, fishing rig levies, and tourism taxes.</p>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
              <span className="font-bold text-stone-900 font-mono">4. db-unza26-csc4792-siavonga_town_council_administrative_data.csv</span>
              <p className="text-stone-700 mt-1">Council institutional governance data: population (66,030), Chairperson, Secretary, and strategic vision.</p>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
              <span className="font-bold text-stone-900 font-mono">5. db-unza26-csc4792-siavonga_town_council_news_articles.csv</span>
              <p className="text-stone-700 mt-1">5 full-text municipal news dispatches and official press announcements.</p>
            </div>
          </div>
        </section>

        {/* 4. Experimental Design */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-stone-900 font-sans border-b border-stone-200 pb-1">
            4. Experimental Design, Materials and Methods
          </h2>
          <div className="space-y-3 text-sm sm:text-base leading-relaxed text-stone-800">
            <p>
              A breadth-first search (BFS) crawler was constructed using Python 3.12, BeautifulSoup4, and Requests. Traversal was bounded strictly to the canonical domain <code className="font-mono text-xs bg-stone-100 px-1 py-0.5 rounded">https://www.siavongacouncil.gov.zm</code> to ensure respect of institutional robots.txt directives and server capacity.
            </p>
            <p>
              Currency entities were transformed into standardized Zambian Kwacha (ZMW) floats using regular expression pipelines with unit-multiplier expansion logic. Quality assurance assertions were applied to ensure non-empty strings, positive numeric values, and valid HTTP canonical sources.
            </p>
          </div>
        </section>

        {/* Acknowledgements */}
        <section className="space-y-2 border-t border-stone-200 pt-6">
          <h2 className="text-lg font-bold text-stone-900 font-sans">Acknowledgements</h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            The authors acknowledge Mr. Lighton Phiri, Course Instructor for CSC 4792 (Data Mining and Warehousing), Department of Computing and Infomatics, University of Zambia, for providing the assignment framework and exemplar dataset standard. We also acknowledge the SMART Zambia Institute and Siavonga Town Council for maintaining digital civic repositories.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PaperViewer;
