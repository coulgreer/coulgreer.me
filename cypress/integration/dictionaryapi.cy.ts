import entries from "../../__fixtures__/api-dictionaryResponse.json";

describe("Dictionary API", () => {
  before(() => {
    cy.task("teardown");
  });

  beforeEach(() => {
    cy.task("setup");
    cy.task("seedDatabase");
  });

  afterEach(() => {
    cy.task("teardown");
  });

  after(() => {
    cy.task("cleanup");
  });

  describe("Getting words from dictionary", () => {
    it("should get a list of all words", () => {
      cy.request("GET", "/api/dictionary").then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.words).to.have.lengthOf(3);
      });
    });

    it("should get one word", () => {
      const target = entries.words[0].word;

      cy.request("GET", `/api/dictionary/${target}`).then(
        ({ status, body }) => {
          expect(status).to.equal(200);
          expect(body.word).to.equal(target);
        }
      );
    });

    it("should return client-error status code", () => {
      const nonexistantWord = "imaginaryword";

      cy.request({
        method: "GET",
        url: `/api/dictionary/${nonexistantWord}`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.equal(404);
        expect(body).to.have.property("error");
        expect(body).to.have.property("target", nonexistantWord);
      });
    });
  });

  describe("Adding words to dictionary", () => {
    const partOfSpeech = { fullForm: "noun", abbreviation: "n." };
    const citation = {
      quote: "A new form of quote",
      author: "The Ether",
      bodyOfWork: "The Void",
      context: "Places Unknown",
    };

    describe("should add a word...", () => {
      const vocabulary = {
        word: "new",
        partOfSpeech: "",
        definition: "a new definition",
      };

      afterEach(() => {
        cy.request("POST", "/api/dictionary", { vocabulary, citation }).then(
          ({ status, body }) => {
            expect(status).to.equal(201);
            expect(body).to.have.property("success", true);
          }
        );

        cy.request("GET", `/api/dictionary/${vocabulary.word}`).then(
          (response) => {
            expect(response.status).to.equal(200);
          }
        );
      });

      it("when using an existing full-form part of speech", () => {
        vocabulary.partOfSpeech = partOfSpeech.fullForm;
      });

      it("when using an existing abbreviation part of speech", () => {
        vocabulary.partOfSpeech = partOfSpeech.abbreviation;
      });
    });

    it("should return server error when using a non-existant part of speech", () => {
      const erroneousPartOfSpeech = "totalandutternonsense";
      const vocabulary = {
        word: "new",
        partOfSpeech: erroneousPartOfSpeech,
        definition: "a new definition",
      };

      cy.request({
        method: "POST",
        url: "/api/dictionary",
        body: { vocabulary, citation },
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.equal(500);
        expect(body).to.have.property("success", false);
        expect(body.word.vocabulary).to.have.property(
          "partOfSpeech",
          erroneousPartOfSpeech
        );
      });
    });
  });
});
