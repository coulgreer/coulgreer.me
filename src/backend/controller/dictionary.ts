import { RowDataPacket } from "mysql2";
import { query, Citation, Vocabulary } from "../config/database";

export async function getAllWords() {
  const [rows] = await query(
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
  const [rows] = await query(
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

export async function getWordId(word: string) {
  const [rows] = await query(
    `SELECT id
      FROM vocabulary v
      WHERE word = ?`,
    [word]
  );

  return rows[0].id;
}

export async function insertWord(c: Citation, v: Vocabulary) {
  const vocabId = await getAutoIncrement("vocabulary");
  const citationId = await getAutoIncrement("citation");
  const partOfSpeech = await checkPartOfSpeech(v);

  await query(
    `
    INSERT INTO citation
    (quote, author, body_of_work, context)
    VALUES
    (?, ?, ?, ?);
    `,
    [c.quote, c.author, c.bodyOfWork, c.context]
  );
  await query(
    `
    INSERT INTO vocabulary
    (word, part_of_speech, phonetic, definition)
    VALUES
    (?, ?, ?, ?);`,
    [v.word, partOfSpeech, v.phonetic, v.definition]
  );
  await query(
    `
      INSERT INTO entry (vocabulary_id, citation_id)
      VALUES (?, ?);
      `,
    [vocabId, citationId]
  );
}

async function getAutoIncrement(tableName: string) {
  const [rows] = await query(
    `
      SELECT AUTO_INCREMENT
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME=?;
      `,
    [tableName]
  );

  return rows[0].AUTO_INCREMENT;
}

async function checkPartOfSpeech(v: Vocabulary) {
  let [rows] = await query(
    `SELECT *
    FROM part_of_speech
    WHERE full_form=?;`,
    [v.partOfSpeech]
  );

  if (rows.length > 0) {
    return v.partOfSpeech;
  } else {
    [rows] = await query(
      `SELECT full_form
      FROM part_of_speech
      WHERE abbreviation=?;`,
      [v.partOfSpeech]
    );
    return rows[0]["full_form"];
  }
}
