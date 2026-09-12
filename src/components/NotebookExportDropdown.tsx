import React, { useState, useRef, useEffect } from "react";
import { Download, ChevronDown, Check } from "lucide-react";

export const NOTEBOOK_EXPORT_FORMATS = [
  { label: "Notebook (.ipynb)", ext: "ipynb", desc: "Interactive Jupyter Notebook" },
  { label: "PDF Document (.pdf)", ext: "pdf", desc: "Print-ready PDF report" },
  { label: "HTML Document (.html)", ext: "html", desc: "Rendered web page" },
  { label: "Python Script (.py)", ext: "py", desc: "Standalone CLI crawler" },
  { label: "Markdown (.md)", ext: "md", desc: "Structured documentation" },
] as const;

export const NotebookExportDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [downloadingExt, setDownloadingExt] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const download = (ext: string) => {
    const filename = `db-unza26-csc4792-siavonga_scraper.${ext}`;
    const url = `/downloads/${filename}`;

    fetch(url, { method: "HEAD" })
      .then((r) => {
        if (!r.ok) console.warn(`Missing export file: ${url}`);
      })
      .catch(() => {});

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setDownloadingExt(ext);
    setTimeout(() => {
      setDownloadingExt(null);
      setOpen(false);
    }, 1200);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 rounded-md shadow-xs transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Export .ipynb ▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-60 bg-white border border-stone-200 rounded-lg shadow-lg z-50 py-1 divide-y divide-stone-100">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-stone-600 bg-stone-50">
            Export Scraper Pipeline
          </div>
          <div className="py-1">
            {NOTEBOOK_EXPORT_FORMATS.map(({ label, ext, desc }) => (
              <button
                key={ext}
                onClick={() => download(ext)}
                className="w-full text-left px-3 py-2 text-xs text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between group transition-colors"
              >
                <div>
                  <div className="font-medium text-stone-900 group-hover:text-emerald-900">{label}</div>
                  <div className="text-[10px] text-stone-600">{desc}</div>
                </div>
                {downloadingExt === ext ? (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                ) : (
                  <Download className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotebookExportDropdown;
