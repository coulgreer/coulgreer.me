import mysql, { RowDataPacket } from "mysql2";
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

export async function endPool() {
  pool.end();
}

export async function buildTables() {
  const queries = fs
    .readFileSync(path.join(__dirname, "./model/schema.sql"))
    .toString();

  await pool.query(queries);
}

export async function destroyTables() {
  // Order of dropped tables matter. Those with foriegn keys should be dropped first.
  await pool.query(`
    DROP TABLE IF EXISTS entry;
    DROP TABLE IF EXISTS citation;
    DROP TABLE IF EXISTS vocabulary;
    DROP TABLE IF EXISTS part_of_speech;
  `);
}

export async function getAllWords() {
  const [rows] = await pool.query<RowDataPacket[][]>(
    `SELECT e.id, v.word, pos.part_of_speech, pos.abbreviation AS pos_abbreviation, v.phonetic, v.definition, c.quote, c.author, c.body_of_work, c.context
    FROM (((entry e
    INNER JOIN vocabulary v ON e.vocabulary_id = v.id)
    INNER JOIN part_of_speech pos ON v.part_of_speech = pos.part_of_speech)
    INNER JOIN citation c on e.citation_id = c.id);
    `
  );

  return rows;
}

export async function getWord(id: number) {
  const [rows] = await pool.query<RowDataPacket[][]>(
    `SELECT e.id, v.word, pos.part_of_speech, pos.abbreviation AS pos_abbreviation, v.phonetic, v.definition, c.quote, c.author, c.body_of_work, c.context
    FROM (((entry e
    INNER JOIN vocabulary v ON e.vocabulary_id = v.id)
    INNER JOIN part_of_speech pos ON v.part_of_speech = pos.part_of_speech)
    INNER JOIN citation c on e.citation_id = c.id)
    WHERE e.id = ?;
    `,
    [id]
  );

  return rows;
}

export async function insertWord(c: Citation, v: Vocabulary) {
  const vocabId = await getAutoIncrement("vocabulary");
  const citationId = await getAutoIncrement("citation");

  await pool.query(
    `
  INSERT INTO citation
  (quote, author, body_of_work, context)
  VALUES
  (?, ?, ?, ?);
  `,
    [c.quote, c.author, c.bodyOfWork, c.context]
  );
  await pool.query(
    `
  INSERT INTO vocabulary
  (word, part_of_speech, phonetic, definition)
  VALUES
  (?, ?, ?, ?);`,
    [v.word, v.partOfSpeech, v.phonetic, v.definition]
  );
  await pool.query(
    `
    INSERT entry (vocabulary_id, citation_id)
    VALUES (?, ?)
    `,
    [vocabId, citationId]
  );
}

async function getAutoIncrement(tableName: string) {
  const [rows] = await pool.query(
    `
    SELECT AUTO_INCREMENT
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_NAME=?;
    `,
    [tableName]
  );

  return rows[0].AUTO_INCREMENT;
}
