import "dotenv/config";

import mysql, { RowDataPacket } from "mysql2";
import { Pool } from "mysql2/promise";
import fs from "fs";
import path from "path";

let pool: Pool;
let hasOpenPool = false;

export type PartsOfSpeech = {
  fullForm: string;
  abbreviation: string;
};

export type Citation = {
  quote: string;
  author: string;
  bodyOfWork: string;
  context: string;
};

export type Vocabulary = {
  word: string;
  partOfSpeech: PartsOfSpeech["fullForm"];
  phonetic: string;
  definition: string;
};

export async function query(sql: string, args?: Array<string | number>) {
  if (!hasOpenPool) {
    establishPool();
  }

  return pool.query<RowDataPacket[]>(sql, args);
}

export async function buildTables() {
  const queries = fs
    .readFileSync(path.join(__dirname, "../model/schema.sql"))
    .toString();

  return await query(queries);
}

export async function destroyTables() {
  // Order of dropped tables matter. Those with foriegn keys should be dropped first.
  return await query(`
    DROP TABLE IF EXISTS entry;
    DROP TABLE IF EXISTS citation;
    DROP TABLE IF EXISTS vocabulary;
    DROP TABLE IF EXISTS part_of_speech;
  `);
}

export function endPool() {
  if (!hasOpenPool) return;

  pool.end();
  hasOpenPool = false;
}

function establishPool() {
  if (hasOpenPool) return;

  pool = mysql
    .createPool({
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      multipleStatements: true,
    })
    .promise();

  hasOpenPool = true;
}
