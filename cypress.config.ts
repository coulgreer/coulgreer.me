import { defineConfig } from "cypress";
import mysql from "mysql2";
import { Connection } from "mysql2/promise";
import fs from "fs";
import path from "path";

import pool, * as database from "./src/backend/config/database";

export default defineConfig({
  fixturesFolder: "__fixtures__",
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.{j,t}s",
    specPattern: "cypress/{e2e,integration}/*cy.{j,t}s",
    setupNodeEvents(on) {
      let connection: Connection;

      on("task", {
        setup: () => database.buildTables(),
        teardown: () => database.destroyTables(),
        seedDatabase: () => {
          const queries = fs
            .readFileSync(
              path.join(__dirname, "./src/backend/model/test-data.sql")
            )
            .toString();

          connection = mysql
            .createConnection({
              user: process.env.USER,
              password: process.env.PASSWORD,
              database: process.env.DATABASE,
              multipleStatements: true,
            })
            .promise();

          const results = connection.query(queries);
          connection.end();

          return results;
        },
        cleanUp: () => {
          pool.end();
          return null;
        },
      });
    },
  },
});
