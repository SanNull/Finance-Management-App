export interface IJournalEntry {
  key: number;
  date: string;
  description: string;
  value: string;
  tags: string[];
  account: string;
  isIncome: boolean;
}
