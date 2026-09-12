import { useEffect, useState } from "react";
import { groupMembers as seed, GroupMember } from "../data/group";

const STORAGE_KEY = "csc4792-group-members";

export function useGroupMembers() {
  const [members, setMembers] = useState<GroupMember[]>(() => {
    if (typeof window === "undefined") return seed;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as GroupMember[]) : seed;
    } catch {
      return seed;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    } catch {
      // ignore storage error
    }
  }, [members]);

  function addMember(m: GroupMember) {
    setMembers((prev) => {
      const exists = prev.some((x) => x.computerNumber === m.computerNumber);
      return exists ? prev : [...prev, m];
    });
  }

  function removeMember(computerNumber: string) {
    setMembers((prev) =>
      prev.filter((m) => m.computerNumber !== computerNumber)
    );
  }

  function resetToSeed() {
    setMembers(seed);
  }

  return { members, addMember, removeMember, resetToSeed };
}
