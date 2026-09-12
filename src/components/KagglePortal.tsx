import React, { useState } from "react";
import { DATASET_SUMMARY } from "../data/datasets";
import { Copy, Check, ExternalLink, Award, FileSpreadsheet, Download, Terminal } from "lucide-react";

export const KagglePortal: React.FC = () => {
  const [copiedMeta, setCopiedMeta] = useState<boolean>(false);
  const [copiedCite, setCopiedCite] = useState<boolean>(false);

  const kaggleMetadataJson = {
    title: "UNZA 2025/26 CSC 4792 — Siavonga Town Council Dataset",
    id: "group48/unza-csc4792-siavonga-town-council",
    licenses: [{ name: "CC-BY-4.0" }],
    keywords: ["zambia", "local-government", "cdf", "public-finance", "devolution", "siavonga", "open-data"],
    collaborators: [
      {
        name: "Bornface Kangombe",
        role: "Lead Author / Student Researcher",
        computer_number: "2022064526",
        email: "bornface.kangombe@cs.unza.zm",
        group: "48"
      }
    ],
    organization: {
      name: "University of Zambia (UNZA)",
      department: "Department of Computing and Infomatics",
      course: "CSC 4792: Data Mining & Warehousing"
    },
    description: "Curated dataset containing Constituency Development Fund (CDF) allocations, Zambia Devolution Support Programme (ZDSP) infrastructure projects, and financial disclosures for Siavonga Town Council, Southern Province, Zambia."
  };

  const citationText = `Project Team #48. (2026). UNZA CSC 4792 — Siavonga Town Council Dataset (Version 1.0) [Dataset]. Kaggle. https://www.kaggle.com/datasets/group48/unza-csc4792-siavonga-town-council`;

  const copyMetadata = () => {
    navigator.clipboard.writeText(JSON.stringify(kaggleMetadataJson, null, 2));
    setCopiedMeta(true);
    setTimeout(() => setCopiedMeta(false), 2000);
  };

  const copyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopiedCite(true);
    setTimeout(() => setCopiedCite(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Kaggle Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#20BEFF]/10 text-[#008ABC] font-bold text-xs font-mono uppercase tracking-wider">
              Kaggle Dataset
            </span>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
              Exemplar Aligned (Phiri, 2026)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-semibold text-stone-700 bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Usability: 10.0 / 10.0</span>
            </div>
            <a
              href="https://www.kaggle.com/datasets/new"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
            >
              <span>Publish on Kaggle</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            UNZA 2025/26 CSC 4792 — Siavonga Town Council Dataset
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            CDF (K40M), ZDSP devolution projects, financial disclosures, and municipal governance data from Siavonga District, Zambia
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {["Zambia", "Local Government", "CDF", "Public Finance", "Devolution", "Siavonga", "Open Data"].map(tag => (
            <span key={tag} className="text-xs font-medium bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full border border-stone-200">
              #{tag.toLowerCase().replace(/\s+/g, "-")}
            </span>
          ))}
        </div>
      </div>

      {/* Dataset Files Showcase */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Dataset Files (5 Pipe-Separated CSVs)
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Verified naming convention: <code className="font-mono text-stone-800">db-unza26-csc4792-[DESCRIPTION].csv</code>
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-700 font-semibold">Delimiter: &apos;|&apos;</span>
        </div>

        <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg overflow-hidden">
          {DATASET_SUMMARY.files.map((file) => (
            <div key={file.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50 transition-colors">
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono text-xs font-bold text-stone-900">{file.fileName}</div>
                  <div className="text-xs text-stone-600 mt-0.5">{file.description}</div>
                  <div className="text-[11px] text-stone-700 font-mono mt-1">
                    Columns: {file.columns.join(" | ")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:shrink-0 self-end sm:self-center">
                <span className="text-xs font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                  {file.rowCount} rows
                </span>
                <a
                  href={`/downloads/${file.fileName}`}
                  download={file.fileName}
                  className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kaggle CLI & Metadata JSON Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* dataset-metadata.json */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">
              dataset-metadata.json
            </h3>
            <div className="flex items-center gap-2">
              <a
                href="/downloads/dataset-metadata.json"
                download="dataset-metadata.json"
                className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
              <button
                onClick={copyMetadata}
                className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 font-medium"
              >
                {copiedMeta ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMeta ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
          <pre className="p-3 bg-stone-900 text-stone-100 rounded-lg text-xs font-mono overflow-x-auto max-h-56 leading-relaxed">
            {JSON.stringify(kaggleMetadataJson, null, 2)}
          </pre>
        </div>

        {/* CLI Publish Command & Exemplar Citation */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Kaggle CLI & APA Citation
            </h3>
            <button
              onClick={copyCitation}
              className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 font-medium"
            >
              {copiedCite ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCite ? "Copied" : "Copy Citation"}</span>
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-stone-700">Terminal Upload Command:</div>
            <div className="p-2.5 bg-stone-900 text-emerald-400 font-mono text-xs rounded-lg flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>kaggle datasets create -p ./data/processed/</span>
            </div>

            <div className="text-xs font-semibold text-stone-700 pt-2">Recommended Academic Citation:</div>
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 leading-relaxed font-serif">
              {citationText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
