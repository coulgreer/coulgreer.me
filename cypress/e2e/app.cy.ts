describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
    /* TODO (Coul Greer): Look into optimization or cypress waiting for a full load before testing */
    cy.wait(3000); // The page does not fully load thus wait is needed.
  });

  it("should navigate to the recipe page", () => {
    cy.findByRole("link", { name: /cookbook/i }).click();

    cy.url().should("include", "/recipes");

    const nav = cy.findByRole("navigation");
    const footer = cy.findByRole("contentinfo");
    const heading = cy.findByRole("heading", { name: /recipes/i });

    nav.should("exist");
    footer.should("exist");
    heading.should("exist");
  });

  it("should navigate to the blog page", () => {
    cy.findByRole("link", { name: /journal/i }).click();

    cy.url().should("include", "/blog");

    const nav = cy.findByRole("navigation");
    const footer = cy.findByRole("contentinfo");
    const heading = cy.findByRole("heading", { name: /blog/i });

    nav.should("exist");
    footer.should("exist");
    heading.should("exist");
  });

  it("should navigate to the projects page", () => {
    cy.findByRole("link", { name: /scrapbook/i }).click();

    cy.url().should("include", "/projects");

    const nav = cy.findByRole("navigation");
    const footer = cy.findByRole("contentinfo");
    const heading = cy.findByRole("heading", { name: /projects/i });

    nav.should("exist");
    footer.should("exist");
    heading.should("exist");
  });

  it("should navigate to the dictionary page", () => {
    cy.findByRole("link", { name: /dictionary/i }).click();

    cy.url().should("include", "/dictionary");

    const nav = cy.findByRole("navigation");
    const footer = cy.findByRole("contentinfo");

    nav.should("exist");
    footer.should("exist");
  });
});
