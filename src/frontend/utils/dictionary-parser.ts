export type Phonetic = {
  text?: string;
  audio: string;
  sourceUrl?: string;
  license?: {
    name: string;
    url: string;
  };
};

export type Definition = {
  definition: string;
  example?: string;
  synonyms: Array<string>;
  antonyms: Array<string>;
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Array<Definition>;
  synonyms: Array<string>;
  antonyms: Array<string>;
};

export type Entry = {
  word: string;
  phonetic?: string;
  phonetics: Array<Phonetic>;
  meanings: Array<Meaning>;
};

export type Data = Array<Entry>;

export type Results = {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
};

export function parse(json: Data): Results {
  const [entry] = json;
  const [meaning] = entry.meanings;

  return {
    word: entry.word,
    phonetic: parsePhonetic(entry),
    partOfSpeech: meaning.partOfSpeech,
    definition: meaning.definitions[0].definition,
  };
}

function parsePhonetic(entry: Entry): string {
  if (entry.phonetic) return entry.phonetic;

  for (let phonetic of entry.phonetics) {
    const text = phonetic.text;

    if (text) return text;
  }

  return "";
}
