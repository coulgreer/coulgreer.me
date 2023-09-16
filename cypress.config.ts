import { defineConfig } from "cypress";
import fs from "fs";
import path from "path";

import * as database from "./src/backend/config/database";

export default defineConfig({
  fixturesFolder: "__fixtures__",
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.{j,t}s",
    specPattern: "cypress/{e2e,integration}/*cy.{j,t}s",
    setupNodeEvents(on) {
      on("task", {
        setup: () => database.buildTables(),
        teardown: () => database.destroyTables(),
        seedDatabase: () => {
          const queries = fs
            .readFileSync(
              path.join(__dirname, "./src/backend/model/test-data.sql")
            )
            .toString();

          const results = database.query(queries);

          return results;
        },
        cleanup: () => {
          database.endPool();
          return null;
        },
      });
    },
  },
});
