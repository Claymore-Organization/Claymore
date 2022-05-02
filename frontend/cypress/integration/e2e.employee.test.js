// Shop Tests
describe('Employee page tests', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/employee')
    })

    it('Navigates to the employee page correctly', () => {
        cy.contains("Orders")
        cy.contains("Ship To")
        cy.contains("- new")
    })

    it('New order placed correctly', () => {
        cy.visit('http://localhost:3000/menu')
        cy.get('Button').first().click()
        cy.contains("Melina Figure (Elden Ring)")
        cy.contains("1 x $69.99")
        cy.contains("Total")
        cy.contains("$69.99")
        cy.contains("Continue to Checkout")
        cy.get("Button").contains("Continue to Checkout").click()
        cy.location('pathname').should('eq', '/order')
        cy.contains("Shipping address")
        cy.contains("City")
        cy.get('[id=address1]').clear().type("5331 Beeler St.")
        cy.get("Button").contains('Next').click()
        cy.contains("Payment method")
        cy.contains("CVV")
        cy.get("Button").contains('Next').click()
        cy.contains("Order summary")
        cy.contains("Melina Figure (Elden Ring)")
        cy.contains("1 x $69.99")
        cy.contains("$69.99")
        cy.get("Button").contains('Place order').click()
        cy.contains("Thank you for your order.")
        cy.visit('http://localhost:3000/employee')
        cy.contains("5331 Beeler St.")
    })
})
