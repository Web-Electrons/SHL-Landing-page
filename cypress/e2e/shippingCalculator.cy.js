describe("Shipping Calculator - Filled Form", () => {
  it("fill form in shipping calculator", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/en/shipping_calculator");

    cy.intercept("POST", "http://localhost:3000/api/warehouse/list").as(
      "getWarehouses_list"
    );

    cy.intercept("GET", "http://localhost:3000/api/Service_list").as(
      "getService_list"
    );

    cy.wait(["@getWarehouses_list", "@getService_list"]);

    cy.get('input[name="dimension.weight"]').type("12", { force: true });
    cy.get('input[name="dimension.length"]').type("12", { force: true });
    cy.get('input[name="dimension.width"]').type("12", { force: true });
    cy.get('input[name="dimension.height"]').type("12", { force: true });
    cy.get('input[name="shipped_to.address"]').type(
      "5000 Rue Sainte-Catherine Ouest",
      { force: true }
    );
    cy.get('input[name="shipped_to.state"]').type("QC", { force: true });
    cy.get('input[name="shipped_to.city"]').type("Montreal", { force: true });
    cy.get('input[name="shipped_to.zip"]').type("H3Z 1T3", { force: true });
    // cy.get('').type("H3Z 1T3", { force: true });

    cy.get(":nth-child(4) > :nth-child(2) > .flex-col > :nth-child(1)") // container form field
      .find("button") // cari button di dalam container itu
      .click();
    cy.contains('[role="option"]', "Canada").click(); // pilih opsi

    cy.get("#r4").click();
    cy.get("#continue_service").click();
    // cy.get('input[name="dimension.weight"]').type("12");
  });
});

// describe("Forward Package", () => {
//   it("should select the forward package and find the carrier", () => {});
// });
