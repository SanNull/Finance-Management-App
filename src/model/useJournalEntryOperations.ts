import { useDatabaseOperations } from "@/data/useDatabaseOperations";
import { IJournalEntry } from "./interfaces/IJournalEntry";

export function useJournalEntryOpertations() {
  const DatabaseOperations = useDatabaseOperations();

  function addEntry(entry: Omit<IJournalEntry, "key">) {
    DatabaseOperations.insertEntry(entry);
  }

  async function getEntryList() {
    try {
      const entries = await DatabaseOperations.gatherEntries();
      return entries;
    } catch (error) {
      throw error;
    }
  }

  return { addEntry, getEntryList };
}
