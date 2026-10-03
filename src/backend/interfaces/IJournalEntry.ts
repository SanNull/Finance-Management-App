export interface IJournalEntry {
  key: number;
  date: Date;
  description: string;
  value: number;
  tags: string[];
  account: string;
  isIncome: boolean;
}
