import mysql from "mysql2";
import "dotenv/config";
import fs from "fs";
import path from "path";

let pool = mysql
  .createPool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
  })
  .promise();

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

export async function buildTables() {
  const queries = fs
    .readFileSync(path.join(__dirname, "../model/schema.sql"))
    .toString();

  return await pool.query(queries);
}

export async function destroyTables() {
  // Order of dropped tables matter. Those with foriegn keys should be dropped first.
  return await pool.query(`
    DROP TABLE IF EXISTS entry;
    DROP TABLE IF EXISTS citation;
    DROP TABLE IF EXISTS vocabulary;
    DROP TABLE IF EXISTS part_of_speech;
  `);
}

export default pool;
