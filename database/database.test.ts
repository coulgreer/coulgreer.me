import mysql from "mysql2";
import fs from "fs";
import path from "path";

import * as database from "./database";

let connection;

beforeEach(async () => {
  await database.buildTables();

  connection = mysql
    .createConnection({
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      multipleStatements: true,
    })
    .promise();

  const queries = fs
    .readFileSync(path.join(__dirname, "./model/test-data.sql"))
    .toString();

  await connection.query(queries);
});

afterEach(async () => {
  await database.destroyTables();
  await connection.end();
});

describe("Database", () => {
  it("should get all words from database", () => {
    const entries = [
      {
        id: 1,
        word: "quote",
        part_of_speech: "noun",
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
        partOfSpeech: "article",
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
        partOfSpeech: "verb",
        pos_abbreviation: "v.",
        phonetic: "",
        definition: "the definition of USED",
        quote: "Some kind of quote used for the thrid citation",
        author: "Them and those",
        body_of_work: "Places Unknown",
        context: "Long ago",
      },
    ];

    return database.getAllWords().then((data) => {
      const [rows] = data;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const entry = entries[i];
        expect(row).toBe(entry);
      }
    });
  });
});
