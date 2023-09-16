import fs from "fs";
import path from "path";
import entries from "../../../__fixtures__/api-dictionaryResponse.json";

import * as dictionary from "./dictionary";
import * as database from "../config/database";

describe("Database", () => {
  const { words } = entries;

  beforeAll(async () => {
    await database.destroyTables();
  });

  beforeEach(async () => {
    await database.buildTables();
  });

  afterEach(async () => {
    await database.destroyTables();
  });

  after(() => {
    database.endPool();
  });

  describe("Read", () => {
    beforeEach(async () => {
      const queries = fs
        .readFileSync(path.join(__dirname, "../model/test-data.sql"))
        .toString();

      await database.query(queries);
    });

    it("should return all words", () => {
      return dictionary.getAllWords().then((data) => {
        const [rows] = data;
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const word = words[i];
          expect(row).toBe(word);
        }
      });
    });

    it("should return specified word", () => {
      return dictionary.getWord(1).then((data) => {
        const [row] = data;
        expect(row).toStrictEqual(words[0]);
      });
    });

    it("should return falsy data when query cannot find entry", () => {
      const invalidId = 9001;
      return dictionary.getWord(invalidId).then((data) => {
        const [row] = data;
        expect(row).toBeFalsy();
      });
    });

    it("should return id", () => {
      const [entry] = words;
      const word = entry.word;

      return dictionary.getWordId(word).then((data) => {
        expect(data).toBe(entry.id);
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
      await database.query("INSERT INTO part_of_speech VALUES ('noun', ?);", [
        pos_abbreviation,
      ]);
      await database.query("ALTER TABLE entry AUTO_INCREMENT=?;", [entryId]);

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
