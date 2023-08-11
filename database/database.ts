import mysql, { RowDataPacket } from "mysql2";
import { Connection } from "mysql2/promise";
import "dotenv/config";
import fs from "fs";
import path from "path";

let connection: Connection;

export async function establishConnection() {
  connection = mysql
    .createConnection({
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      multipleStatements: true,
    })
    .promise();
}

export async function endConnection() {
  await connection.end();
}

export async function buildTables() {
  const queries = fs
    .readFileSync(path.join(__dirname, "./model/schema.sql"))
    .toString();

  await connection.query(queries);
}

export async function destroyTables() {
  // Order of dropped tables matter. Those with foriegn keys should be dropped first.
  await connection.query(`
    DROP TABLE IF EXISTS entry;
    DROP TABLE IF EXISTS citation;
    DROP TABLE IF EXISTS vocabulary;
    DROP TABLE IF EXISTS part_of_speech;
  `);
}

export async function getAllWords() {
  const [rows] = await connection.query<RowDataPacket[][]>(
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
  const [rows] = await connection.query<RowDataPacket[][]>(
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
