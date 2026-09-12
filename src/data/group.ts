export interface GroupMember {
  name: string;
  computerNumber: string;
  email: string;
  group: string;
}

export const groupMembers: GroupMember[] = [
  {
    name: "Bornface Kangombe",
    computerNumber: "2022064526",
    email: "bornface.kangombe@cs.unza.zm",
    group: "48",
  },
];

export const groupInfo = {
  number: "48",
  council: "Siavonga Town Council",
  course: "CSC 4792: Data Mining & Warehousing",
  institution: "University of Zambia (UNZA)",
};
