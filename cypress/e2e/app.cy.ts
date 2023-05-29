describe("Navigation", () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit("/");
  });

  it("should navigate to the about page", () => {
    cy.findByRole("link", { name: /cookbook/i }).click();

    const nav = cy.findByRole("navigation");
    const footer = cy.findByRole("contentinfo");
    const heading = cy.findByRole("heading", { name: /recipes/i });

    cy.url().should("include", "/recipes");

    nav.should("exist");
    footer.should("exist");
    heading.should("exist");
  });
});
