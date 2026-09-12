import React from "react";
import { Download, ExternalLink, FileText, Code2, Database } from "lucide-react";

interface DeliverableItem {
  title: string;
  subtitle: string;
  base: string;
  icon: React.ComponentType<{ className?: string }>;
  formats: { ext: string; label: string; mimeDesc: string }[];
  isExternal?: boolean;
  externalUrl?: string;
}

const DELIVERABLES: DeliverableItem[] = [
  {
    title: "Jupyter Scraper Notebook",
    subtitle: "Complete automated crawler, extraction, normalization, and validation pipeline",
    base: "db-unza26-csc4792-siavonga_scraper",
    icon: Code2,
    formats: [
      { ext: "ipynb", label: ".ipynb", mimeDesc: "Jupyter Notebook Source" },
      { ext: "pdf", label: ".pdf", mimeDesc: "Print-ready PDF Report" },
      { ext: "html", label: ".html", mimeDesc: "HTML Rendered Page" },
      { ext: "py", label: ".py", mimeDesc: "Standalone Python Script" },
      { ext: "md", label: ".md", mimeDesc: "Markdown Documentation" },
    ],
  },
  {
    title: "Data in Brief Article Manuscript",
    subtitle: "Formal peer-reviewed data paper following Elsevier DIB template & specifications",
    base: "data_in_brief_siavonga",
    icon: FileText,
    formats: [
      { ext: "md", label: ".md", mimeDesc: "Markdown Source Manuscript" },
      { ext: "pdf", label: ".pdf", mimeDesc: "Compiled PDF Article" },
      { ext: "docx", label: ".docx", mimeDesc: "Microsoft Word Document" },
      { ext: "html", label: ".html", mimeDesc: "Interactive HTML Document" },
      { ext: "txt", label: ".txt", mimeDesc: "Plain Text Version" },
    ],
  },
  {
    title: "Dataset Provenance Manifest",
    subtitle: "Machine-readable provenance, sha256 checksums, schema definitions, and academic credentials",
    base: "manifest",
    icon: Database,
    formats: [
      { ext: "json", label: ".json", mimeDesc: "Provenance Manifest & Schemas" },
    ],
  },
  {
    title: "Official Council Website",
    subtitle: "Civic disclosures, council announcements, and decentralized public administration source",
    base: "official_source",
    icon: ExternalLink,
    isExternal: true,
    externalUrl: "https://www.siavongacouncil.gov.zm",
    formats: [
      { ext: "source", label: "Source ↗", mimeDesc: "Official Siavonga Town Council Web Portal" },
    ],
  },
];

export const DownloadDeliverables: React.FC = () => {
  const download = (base: string, ext: string) => {
    const url = `/downloads/${base}.${ext}`;

    // Verify existence with HEAD request and warn in console if unavailable
    fetch(url, { method: "HEAD" })
      .then((r) => {
        if (!r.ok) console.warn(`Missing export: ${url} (status: ${r.status})`);
      })
      .catch(() => {});

    const a = document.createElement("a");
    a.href = url;
    a.download = `${base}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section
      data-print-hide="true"
      className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4 no-print"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
        <div>
          <h2 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Download All Deliverables in Multiple Formats</span>
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Every submission deliverable pre-generated in required academic, machine-readable, and presentation formats.
          </p>
        </div>
        <a
          href="https://www.siavongacouncil.gov.zm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-medium px-2.5 py-1 bg-emerald-50 rounded border border-emerald-200 hover:bg-emerald-100 transition-colors shrink-0"
        >
          <span>Official Council Site</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DELIVERABLES.map(({ title, subtitle, base, icon: Icon, formats, isExternal, externalUrl }) => (
          <div
            key={base}
            className="border border-stone-200 rounded-lg p-3.5 bg-stone-50/50 hover:bg-white hover:border-stone-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-2 mb-1">
                <div className="p-1.5 rounded bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-stone-900 leading-snug">{title}</h3>
                  <p className="text-[11px] text-stone-500 leading-normal">{subtitle}</p>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-stone-200/60">
              <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-1.5">
                Available Formats:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {isExternal && externalUrl ? (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white hover:bg-emerald-50 border border-stone-300 hover:border-emerald-500 text-xs font-mono font-medium text-emerald-700 hover:text-emerald-800 transition-colors shadow-2xs"
                  >
                    <span>Open Source Site ↗</span>
                  </a>
                ) : (
                  formats.map(({ ext, label, mimeDesc }) => (
                    <button
                      key={ext}
                      onClick={() => download(base, ext)}
                      title={`Download ${mimeDesc} (${base}.${ext})`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-emerald-50 border border-stone-300 hover:border-emerald-500 text-xs font-mono font-medium text-stone-700 hover:text-emerald-800 transition-colors shadow-2xs"
                    >
                      <Download className="w-3 h-3 text-stone-400 group-hover:text-emerald-600" />
                      <span>{label}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DownloadDeliverables;
