import { defineConfig } from "cypress";

export default defineConfig({
  downloadsFolder: "tests/cypress/downloads",
  fixturesFolder: "tests/__fixtures__",
  screenshotsFolder: "tests/cypress/screenshots",
  videosFolder: "tests/cypress/videos",
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "tests/cypress/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "tests/cypress/{e2e,integration}/*.{js,jsx,ts,tsx}",
  },
});
