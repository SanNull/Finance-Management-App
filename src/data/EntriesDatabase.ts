import * as SQLite from "expo-sqlite";

export async function initDatabase(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
    
    CREATE TABLE IF NOT EXISTS journalEntries (

      key INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      description TEXT,
      value REAL NOT NULL,
      tags STRING,
      account STRING NOT NULL,
      isIncome INTEGER NOT NULL
    )
    
    `);
}
