describe("Navigation", () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit("/");
  });

  it("should navigate to the recipe page", () => {
    cy.findByRole("link", { name: /cookbook/i }).click();

    const nav = cy.findByRole("navigation");
    const footer = cy.findByRole("contentinfo");
    const heading = cy.findByRole("heading", { name: /recipes/i });

    cy.url().should("include", "/recipes");

    nav.should("exist");
    footer.should("exist");
    heading.should("exist");
  });

  it("should navigate to the blog page", () => {
    cy.findByRole("link", { name: /journal/i }).click();

    const nav = cy.findByRole("navigation");
    const footer = cy.findByRole("contentinfo");
    const heading = cy.findByRole("heading", { name: /blog/i });

    nav.should("exist");
    footer.should("exist");
    heading.should("exist");
  });

  it("should navigate to the projects page", () => {
    cy.findByRole("link", { name: /scrapbook/i }).click();

    const nav = cy.findByRole("navigation");
    const footer = cy.findByRole("contentinfo");
    const heading = cy.findByRole("heading", { name: /projects/i });

    nav.should("exist");
    footer.should("exist");
    heading.should("exist");
  });

  it("should navigate to the dictionary page", () => {
    cy.findByRole("link", { name: /dictionary/i }).click();

    const nav = cy.findByRole("navigation");
    const footer = cy.findByRole("contentinfo");
    const heading = cy.findByRole("heading", { name: /dictionary/i });

    nav.should("exist");
    footer.should("exist");
    heading.should("exist");
  });
});
