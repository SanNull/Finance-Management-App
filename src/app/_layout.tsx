import { initDatabase } from "@/backend/EntriesDatabase";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="journalEntries.db" onInit={initDatabase}>
      <Slot />
    </SQLiteProvider>
  );
}
