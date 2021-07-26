describe("service is available", async function () {
  it("should be available on localhost:3000", function () {
    cy.visit("http://localhost:3000");
  });

  it("should add first bun", () => {
    cy.get("#bun")
      .find("[class^=burger-ingredients-list_ingredients_list__]")
      .find("[class^=burger-ingredients-item_wrapper__]")
      .first()
      .as("firstBun");
    cy.get("[class^=burger-constructor_constructor__]").as("constructor");
    cy.get("@firstBun").should("exist");

    cy.get("@firstBun")
      .find("[class^=burger-ingredients-item_image]")
      .should("be.visible")
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });

    cy.get("@constructor").should("exist");

    cy.get("@firstBun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
  });

  it("should add first souce", () => {
    cy.get("#sauce")
      .find("[class^=burger-ingredients-list_ingredients_list__]")
      .find("[class^=burger-ingredients-item_wrapper__]")
      .first()
      .as("firstSauce");
    cy.get("[class^=burger-constructor_constructor__]").as("constructor");
    cy.get("@firstSauce").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
  });

  it("should add extra souce", () => {
    cy.get("#sauce")
      .find("[class^=burger-ingredients-list_ingredients_list__]")
      .find("[class^=burger-ingredients-item_wrapper__]")
      .first()
      .as("firstSauce");
    cy.get("[class^=burger-constructor_constructor__]").as("constructor");
    cy.get("@firstSauce").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
  });

  it("should remove extra sauce", () => {
    cy.get("[class^=burger-constructor_constructor__]")
      .find("[class^=burger-constructor_constructorList__]")
      .find("[class^=burger-constructor-drag-ingredient_constructorItem__]")
      .eq(1)
      .as("extraSauce");
    cy.get("@extraSauce").find("[class^=constructor-element__action]").find("svg").click();
  });

  it("should add new souce", () => {
    cy.get("#sauce")
      .find("[class^=burger-ingredients-list_ingredients_list__]")
      .find("[class^=burger-ingredients-item_wrapper__]")
      .eq(1)
      .as("secondSauce");
    cy.get("[class^=burger-constructor_constructor__]").as("constructor");
    cy.get("@secondSauce").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
  });

  it("should add meat", () => {
    cy.get("#main")
      .find("[class^=burger-ingredients-list_ingredients_list__]")
      .find("[class^=burger-ingredients-item_wrapper__]")
      .first()
      .as("firstMain");
    cy.get("[class^=burger-constructor_constructor__]").as("constructor");
    cy.get("@firstMain").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
  });

  it("should change ingredients position in constructor", () => {
    cy.get("[class^=burger-constructor_constructor__]")
      .find("[class^=burger-constructor_constructorList__]")
      .find("[class^=burger-constructor-drag-ingredient_constructorItem__]")
      .eq(2)
      .as("lastItem");
    cy.get("[class^=burger-constructor_constructor__]")
      .find("[class^=burger-constructor_constructorList__]")
      .find("[class^=burger-constructor-drag-ingredient_constructorItem__]")
      .eq(1)
      .as("middleItem");

    cy.get("@lastItem").trigger("dragstart");

    cy.get("@middleItem").trigger("dragenter").trigger("drop");
  });

  it("should change bun", () => {
    cy.get("#bun")
      .find("[class^=burger-ingredients-list_ingredients_list__]")
      .find("[class^=burger-ingredients-item_wrapper__]")
      .eq(1)
      .as("secondBun");
    cy.get("[class^=burger-constructor_constructor__]").as("constructor");
    cy.get("@secondBun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
  });
});
