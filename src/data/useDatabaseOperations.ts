import { IJournalEntry } from "@/model/interfaces/IJournalEntry";
import * as SQLite from "expo-sqlite";

export function useDatabaseOperations() {
  const db = SQLite.useSQLiteContext();
  async function insertEntry(entry: Omit<IJournalEntry, "key">) {
    const statement = await db.prepareAsync(
      "INSERT INTO journalEntries (date, description, value, tags, account, isIncome) VALUES ($date, $description, $value, $tags, $account, $isIncome)",
    );

    try {
      const result = await statement.executeAsync({
        $date: entry.date,
        $description: entry.description,
        $value: Number(entry.value),
        $tags: entry.tags.toString(),
        $account: entry.account,
        $isIncome: Number(entry.isIncome),
      });

      console.log(result.lastInsertRowId);
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function gatherEntries() {
    const query = "SELECT * FROM journalEntries";
    try {
      const response = await db.getAllAsync<IJournalEntry>(query);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function deleteEntryDatabase() {
    await db.execAsync(`
    DROP TABLE IF EXISTS journalEntries
    `);
  }

  return { insertEntry, gatherEntries, deleteEntryDatabase };
}
