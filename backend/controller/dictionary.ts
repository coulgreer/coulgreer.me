import { RowDataPacket } from "mysql2";
import pool, { Citation, Vocabulary } from "../config/database";

export async function getAllWords() {
  const [rows] = await pool.query<RowDataPacket[][]>(
    `SELECT e.id, v.word, pos.full_form AS pos_full_form, pos.abbreviation AS pos_abbreviation, v.phonetic, v.definition, c.quote, c.author, c.body_of_work, c.context
      FROM (((entry e
      INNER JOIN vocabulary v ON e.vocabulary_id = v.id)
      INNER JOIN part_of_speech pos ON v.part_of_speech = pos.full_form)
      INNER JOIN citation c on e.citation_id = c.id);
      `
  );

  return rows;
}

export async function getWord(id: number) {
  const [rows] = await pool.query<RowDataPacket[][]>(
    `SELECT e.id, v.word, pos.full_form AS pos_full_form, pos.abbreviation AS pos_abbreviation, v.phonetic, v.definition, c.quote, c.author, c.body_of_work, c.context
      FROM (((entry e
      INNER JOIN vocabulary v ON e.vocabulary_id = v.id)
      INNER JOIN part_of_speech pos ON v.part_of_speech = pos.full_form)
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
