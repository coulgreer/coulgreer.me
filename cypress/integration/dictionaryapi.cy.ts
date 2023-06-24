describe("Dictionary API", () => {
  it("should receive a 2xx status", () => {
    const validWord = "hello";

    cy.request(`/dictionary/${validWord}`).its("status").should("equal", 200);
  });

  it("should return 404 status", () => {
    const invalidWord = "somethingthatcouldntpossiblybeinthedictionary";

    cy.request(`/dictionary/${invalidWord}`).its("status").should("equal", 404);
  });

  it("should successfully pull data", () => {
    const headword = "cacophonous";

    cy.visit(`/dictionary/${headword}`);

    expect(cy.findByRole("heading", { name: new RegExp(headword, "i") }));
  });

  it("should fail to pull data then display placeholder data", () => {
    const headword = "awordthatisreallyaphrase";

    cy.visit(`/dictionary/${headword}`);

    expect(cy.findByRole("heading", { name: /mystique/i }));
  });
});
