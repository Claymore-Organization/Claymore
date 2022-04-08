/// <reference types="cypress" />

describe('order page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/order')
  })

  it('should contain shipping address', () => {
    cy.contains('Shipping Address')
  })

  it('should click through pages', () => {
    cy.get('#forwardButton').click()
    cy.contains('Time Estimate')

    cy.get('#forwardButton').click()
    cy.contains('Payment Details')

    cy.get('#forwardButton').click()
    cy.contains('Review your Order')
  })

  it('should move forward and backward through pages', () => {
    cy.get('#forwardButton').click()
    cy.contains('Time Estimate')

    cy.get('#backwardButton').click()
    cy.contains('Shipping Address')

    cy.get('#forwardButton').click()
    cy.contains('Time Estimate')

    cy.get('#forwardButton').click()
    cy.contains('Payment Details')

    cy.get('#forwardButton').click()
    cy.contains('Review your Order')
  })

})
