/// <reference types="cypress" />

describe('employee page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/employee')
  })

  it('should contain Payloads', () => {
    cy.contains('Payloads')
  })

  it('should have some orders', () => {
    cy.get('.Payload').children().its('length').should('be.gt', 0)
  })

  it('Can send a drone', () => {
    cy.get('.Payload').children().first().contains("Send Drone");
    cy.get('.Payload').children().first().contains("Pending");

    cy.get('.Payload').children().first().get(".sendButton").first().click();
    cy.get('.Payload').children().first().contains("Sent");
  })

})
