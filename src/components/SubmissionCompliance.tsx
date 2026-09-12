import React from "react";
import { DATASET_SUMMARY } from "../data/datasets";
import { GroupMembers } from "./GroupMembers";
import { Building2, ExternalLink, Scale, FileText, Database } from "lucide-react";

export const SubmissionCompliance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-5">
        <div className="border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg font-bold text-stone-900">
              About This Submission
            </h2>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            This workbench accompanies the UNZA CSC 4792 mini-project submission for Project Team #48 (Siavonga Town Council).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200/80 space-y-3">
            <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              <span>Project &amp; Administrative Metadata</span>
            </div>
            <dl className="grid grid-cols-3 gap-y-2.5 gap-x-2 text-stone-700">
              <dt className="font-medium text-stone-500">Group</dt>
              <dd className="col-span-2 font-semibold text-stone-900">Project Team #48</dd>

              <dt className="font-medium text-stone-500">Course</dt>
              <dd className="col-span-2 text-stone-800">CSC 4792: Data Mining &amp; Warehousing</dd>

              <dt className="font-medium text-stone-500">Institution</dt>
              <dd className="col-span-2 text-stone-800">University of Zambia (UNZA)</dd>

              <dt className="font-medium text-stone-500">Council</dt>
              <dd className="col-span-2 font-semibold text-stone-900">Siavonga Town Council</dd>

              <dt className="font-medium text-stone-500">Province</dt>
              <dd className="col-span-2 text-stone-800">Southern Province, Zambia</dd>

              <dt className="font-medium text-stone-500">District Head</dt>
              <dd className="col-span-2 text-stone-800">Civic Centre, Siavonga</dd>
            </dl>
          </div>

          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200/80 space-y-3">
            <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-700" />
              <span>Source &amp; Statutory Provenance</span>
            </div>
            <dl className="grid grid-cols-3 gap-y-2.5 gap-x-2 text-stone-700">
              <dt className="font-medium text-stone-500">Primary Source</dt>
              <dd className="col-span-2">
                <a
                  href="https://www.siavongacouncil.gov.zm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 underline underline-offset-2"
                >
                  <span>siavongacouncil.gov.zm</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </dd>

              <dt className="font-medium text-stone-500">Scrape Date</dt>
              <dd className="col-span-2 font-mono text-stone-800">{DATASET_SUMMARY.scrapeDate}</dd>

              <dt className="font-medium text-stone-500">Submission Date</dt>
              <dd className="col-span-2 font-mono text-stone-800">September 12, 2026, 23:59 GMT+2</dd>

              <dt className="font-medium text-stone-500">Licence</dt>
              <dd className="col-span-2 text-stone-800">Creative Commons Attribution 4.0 (CC BY 4.0)</dd>

              <dt className="font-medium text-stone-500">Statutory Base</dt>
              <dd className="col-span-2 text-stone-800">Local Government Act No. 2 of 2019; Act No. 76 of 2026 (CDF)</dd>

              <dt className="font-medium text-stone-500">Dataset Files</dt>
              <dd className="col-span-2 font-mono text-stone-800">5 pipe-delimited CSVs (|)</dd>
            </dl>
          </div>
        </div>

        {/* Group Members Section */}
        <GroupMembers />

        <div className="bg-white rounded-lg border border-stone-200 p-4 space-y-2.5 text-xs text-stone-700">
          <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-stone-700" />
            <span>Project Deliverables Scope</span>
          </div>
          <p className="leading-relaxed">
            The project repository provides a curated data warehouse of municipal dispatches, statutory Constituency Development Fund (CDF) allocations under Act No. 76 of 2026, World Bank-financed Zambia Devolution Support Programme (ZDSP) infrastructure records, Local Government Equalisation Fund (LGEF) disbursements, and local fishing rig and tourism levy schedules.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
            <span className="bg-stone-100 text-stone-700 px-2.5 py-1 rounded border border-stone-200">
              Delimiter: Pipe (<code className="font-mono">|</code>)
            </span>
            <span className="bg-stone-100 text-stone-700 px-2.5 py-1 rounded border border-stone-200">
              Encoding: UTF-8
            </span>
            <span className="bg-stone-100 text-stone-700 px-2.5 py-1 rounded border border-stone-200">
              Format: Elsevier Data in Brief
            </span>
            <span className="bg-stone-100 text-stone-700 px-2.5 py-1 rounded border border-stone-200">
              Scraper: Python 3 / BeautifulSoup4 / Requests
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
