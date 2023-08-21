import mysql from "mysql2";
import { Connection } from "mysql2/promise";
import fs from "fs";
import path from "path";

import * as dictionary from "./dictionary";
import pool, * as database from "../config/database";

describe("Database", () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = mysql
      .createConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        multipleStatements: true,
      })
      .promise();

    await database.destroyTables();
  });

  beforeEach(async () => {
    await database.buildTables();
  });

  afterEach(async () => {
    await database.destroyTables();
  });

  afterAll(async () => {
    await pool.end();
    await connection.end();
  });

  describe("Read", () => {
    const entries = [
      {
        id: 1,
        word: "quote",
        pos_full_form: "noun",
        pos_abbreviation: "n.",
        phonetic: "",
        definition: "the definition of QUOTE",
        quote: "A quote for the first citation",
        author: "You or me",
        body_of_work: "Reality",
        context: "Here and now",
      },
      {
        id: 2,
        word: "the",
        pos_full_form: "article",
        pos_abbreviation: "art.",
        phonetic: "",
        definition: "the definition of THE",
        quote: "The second citation's quote",
        author: "Him or her",
        body_of_work: "Cyberspace",
        context: "Then and there",
      },
      {
        id: 3,
        word: "used",
        pos_full_form: "verb",
        pos_abbreviation: "v.",
        phonetic: "",
        definition: "the definition of USED",
        quote: "Some kind of quote used for the thrid citation",
        author: "Them and those",
        body_of_work: "Places Unknown",
        context: "Long ago",
      },
    ];

    beforeEach(async () => {
      const queries = fs
        .readFileSync(path.join(__dirname, "../model/test-data.sql"))
        .toString();

      await connection.query(queries);
    });

    it("should return all words", () => {
      return dictionary.getAllWords().then((data) => {
        const [rows] = data;
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const entry = entries[i];
          expect(row).toBe(entry);
        }
      });
    });

    it("should return specified word", () => {
      return dictionary.getWord(1).then((data) => {
        const [row] = data;
        expect(row).toStrictEqual(entries[0]);
      });
    });

    it("should return falsy data when query cannot find entry", () => {
      const invalidId = 9001;
      return dictionary.getWord(invalidId).then((data) => {
        const [row] = data;
        expect(row).toBeFalsy();
      });
    });
  });

  describe("Create", () => {
    it("should insert word", async () => {
      const entryId = 100;
      const pos_abbreviation = "n.";
      const vocab: database.Vocabulary = {
        word: "tomorrow",
        partOfSpeech: "noun",
        phonetic: "to-mar-oh",
        definition: "the day after the present day",
      };
      const citation: database.Citation = {
        quote: "See you tomorrow",
        author: "Friendly Coworker",
        bodyOfWork: "Real Life",
        context: "June 20th",
      };
      await connection.query("INSERT INTO part_of_speech VALUES ('noun', ?);", [
        pos_abbreviation,
      ]);
      await connection.query("ALTER TABLE entry AUTO_INCREMENT=?;", [entryId]);

      await dictionary.insertWord(citation, vocab);

      const [row] = await dictionary.getWord(entryId);
      expect(row).toStrictEqual({
        id: entryId,
        word: vocab.word,
        pos_full_form: vocab.partOfSpeech,
        pos_abbreviation,
        phonetic: vocab.phonetic,
        definition: vocab.definition,
        quote: citation.quote,
        author: citation.author,
        body_of_work: citation.bodyOfWork,
        context: citation.context,
      });
    });
  });
});
