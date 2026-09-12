import React, { useState } from "react";
import { GroupMember } from "../data/group";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (member: GroupMember) => void;
}

const EMPTY: GroupMember = {
  name: "",
  computerNumber: "",
  email: "",
  group: "48",
};

export default function AddMemberDialog({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState<GroupMember>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof GroupMember, string>>>({});

  if (!open) return null;

  function validate(): boolean {
    const e: Partial<Record<keyof GroupMember, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\d{6,12}$/.test(form.computerNumber.trim()))
      e.computerNumber = "Computer number must be 6–12 digits";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Enter a valid email";
    if (!form.group.trim()) e.group = "Group is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    onAdd({
      name: form.name.trim(),
      computerNumber: form.computerNumber.trim(),
      email: form.email.trim(),
      group: form.group.trim(),
    });
    setForm(EMPTY);
    setErrors({});
    onClose();
  }

  function field(
    key: keyof GroupMember,
    label: string,
    type: string = "text"
  ) {
    return (
      <label className="block">
        <span className="block text-xs font-semibold text-stone-700 mb-1">{label}</span>
        <input
          type={type}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        {errors[key] && (
          <span className="text-[11px] text-red-600 mt-0.5 block">
            {errors[key]}
          </span>
        )}
      </label>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-bold text-stone-900 mb-4">Add Group Member</h3>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {field("name", "Full Name")}
          {field("computerNumber", "Computer Number (6–12 digits)")}
          {field("email", "Email Address", "email")}
          {field("group", "Group Number")}

          <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-xs font-medium text-stone-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-semibold shadow-2xs"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
