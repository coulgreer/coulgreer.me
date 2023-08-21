import * as dictionaryParser from "./dictionary-parser";

import noPhonetic from "../../../__fixtures__/no-phonetic-word.json";
import standard from "../../../__fixtures__/standard-word.json";

describe("Lazy Retrieval", () => {
  it("should retrieve the first valid data entry", () => {
    const [json] = standard;
    const [meaning] = json.meanings;
    const result = dictionaryParser.parse(standard);

    expect(result.word).toBe(json.word);
    expect(result.phonetic).toBe(json.phonetic);
    expect(result.partOfSpeech).toBe(meaning.partOfSpeech);
    expect(result.definition).toBe(meaning.definitions[0].definition);
  });

  it("should retrieve the first valid data entry when phonetic is missing", () => {
    const [json] = noPhonetic;
    const [meaning] = json.meanings;
    const result = dictionaryParser.parse(noPhonetic);

    expect(result.word).toBe(json.word);
    expect(result.phonetic).toBe(json.phonetics[1].text);
    expect(result.partOfSpeech).toBe(meaning.partOfSpeech);
    expect(result.definition).toBe(meaning.definitions[0].definition);
  });
});
