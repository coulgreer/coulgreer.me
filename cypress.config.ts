import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "__fixtures__",
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.{j,t}s",
    specPattern: "cypress/{e2e,integration}/*cy.{j,t}s",
  },
});
