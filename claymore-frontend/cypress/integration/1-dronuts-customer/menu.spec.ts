/// <reference types="cypress" />

describe('menu page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/menu')
  })

  it('cart should be empty when loaded', () => {
    cy.get('#cartContainer').children().should('have.length', 0);
  })

  it('should be able to add a donut to cart', () => {
    cy.get('#addChocolateFrosted').click();
    cy.get('#cartContainer').children().should('have.length', 1);

  })

})
