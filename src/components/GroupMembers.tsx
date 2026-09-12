import React, { useState } from "react";
import { useGroupMembers } from "../hooks/useGroupMembers";
import AddMemberDialog from "./AddMemberDialog";
import { Users, Download, RotateCcw, UserPlus, Trash2 } from "lucide-react";

export const GroupMembers: React.FC = () => {
  const { members, addMember, removeMember, resetToSeed } = useGroupMembers();
  const [dialogOpen, setDialogOpen] = useState(false);

  function exportMembers(format: "csv" | "json") {
    const rows = members.map((m) => ({
      name: m.name,
      computer_number: m.computerNumber,
      email: m.email,
      group: m.group,
    }));

    let blob: Blob;
    let filename: string;

    if (format === "json") {
      blob = new Blob([JSON.stringify(rows, null, 2)], {
        type: "application/json",
      });
      filename = "group48-members.json";
    } else {
      const headers = ["name", "computer_number", "email", "group"];
      const body = [
        headers.join("|"),
        ...rows.map((r) =>
          headers.map((h) => (r as Record<string, unknown>)[h]).join("|")
        ),
      ].join("\n");
      blob = new Blob([body], { type: "text/csv" });
      filename = "group48-members.csv";
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-700" />
          <div>
            <h3 className="text-base font-bold text-stone-900">Project Group Members</h3>
            <p className="text-xs text-stone-500">
              UNZA CSC 4792 Data Mining &amp; Warehousing • Group #48 Roster
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => exportMembers("csv")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => exportMembers("json")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-amber-600" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={resetToSeed}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors shadow-2xs"
            title="Restore original seed members"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-2xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Add Member</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-stone-200 rounded-lg">
        <table className="min-w-full text-xs divide-y divide-stone-200 text-left">
          <thead className="bg-stone-50 text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-2.5">Name</th>
              <th className="px-4 py-2.5">Computer Number</th>
              <th className="px-4 py-2.5">Institutional Email</th>
              <th className="px-4 py-2.5">Group</th>
              <th className="px-4 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 bg-white font-sans">
            {members.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-stone-500">
                  No members yet. Click &ldquo;+ Add Member&rdquo; to begin.
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.computerNumber} className="hover:bg-stone-50/80 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-stone-900">{m.name}</td>
                  <td className="px-4 py-2.5 font-mono text-stone-700">{m.computerNumber}</td>
                  <td className="px-4 py-2.5">
                    <a
                      className="text-emerald-700 hover:underline font-mono"
                      href={`mailto:${m.email}`}
                    >
                      {m.email}
                    </a>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Group {m.group}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      onClick={() => removeMember(m.computerNumber)}
                      className="text-stone-400 hover:text-red-600 inline-flex items-center gap-1 p-1 rounded transition-colors"
                      title="Remove member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Remove</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-stone-500">
        Changes are stored locally in your browser. Use <strong>Export CSV</strong> or <strong>Export JSON</strong> to persist them outside the browser.
      </p>

      <AddMemberDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={addMember}
      />
    </section>
  );
};

export default GroupMembers;
