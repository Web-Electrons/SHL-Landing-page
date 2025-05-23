describe("Navigation to About Page", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="about"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/about");

    // The new page should contain an h1 with "About"
    cy.get("h1").contains("About");
  });
});

describe("Navigate to Shopping Ideas page", () => {
  it("should navigate to the Shopping Ideas page when the link is clicked", () => {
    // Ganti dengan URL yang sesuai jika bukan root
    cy.visit("/");

    // Temukan link berdasarkan teks atau href
    cy.contains("a", "Shopping Ideas")
      .should("have.attr", "href", "/en/blog/shopping_ideas")
      .click();

    // Pastikan URL berubah ke halaman yang benar
    cy.url().should("include", "/en/blog/shopping_ideas");

    // Opsional: Cek apakah konten halaman tujuan ada
    cy.contains("Shopping Ideas").should("be.visible");
  });
});
