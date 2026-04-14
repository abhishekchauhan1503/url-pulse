import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = process.env.DATABASE_PATH ?? './data/checks.db';

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS checks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    status_code INTEGER,
    response_time_ms REAL NOT NULL,
    error TEXT,
    checked_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
  )
`);

export interface InsertCheckInput {
  url: string;
  status_code: number | null;
  response_time_ms: number;
  error: string | null;
}

export interface CheckRow {
  id: number;
  url: string;
  status_code: number | null;
  response_time_ms: number;
  error: string | null;
  checked_at: string;
}

const insertStmt = db.prepare(
  'INSERT INTO checks (url, status_code, response_time_ms, error) VALUES (?, ?, ?, ?)'
);

const selectByIdStmt = db.prepare('SELECT * FROM checks WHERE id = ?');

export function insertCheck(input: InsertCheckInput): CheckRow {
  const result = insertStmt.run(
    input.url,
    input.status_code,
    input.response_time_ms,
    input.error
  );
  return selectByIdStmt.get(result.lastInsertRowid) as CheckRow;
}
