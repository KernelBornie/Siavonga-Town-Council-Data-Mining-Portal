import React from "react";
import { Download, Printer } from "lucide-react";

export type Ext =
  | "pdf" | "md" | "docx" | "html" | "txt" | "print"
  | "csv" | "json" | "xlsx"
  | "ipynb" | "py";

export interface ExportOption {
  label: string;
  ext: Ext;
}

interface Props {
  basePath: string;
  filenameBase: string;
  formats: ExportOption[];
}

export const ExportMenu: React.FC<Props> = ({ basePath, filenameBase, formats }) => {
  function handle(ext: Ext) {
    if (ext === "print") {
      window.print();
      return;
    }
    const a = document.createElement("a");
    a.href = `${basePath}.${ext}`;
    a.download = `${filenameBase}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {formats.map(({ label, ext }) => (
        <button
          key={ext}
          onClick={() => handle(ext)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-colors shadow-2xs"
        >
          {ext === "print" ? (
            <Printer className="w-3.5 h-3.5 text-stone-500" />
          ) : (
            <Download className="w-3.5 h-3.5 text-stone-400" />
          )}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ExportMenu;
