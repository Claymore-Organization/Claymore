// Shop Tests
describe('Shop page tests', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/menu')
    })

    it('Navigates to the menu page correctly', () => {
        cy.contains("Figures")
        cy.contains("Pre-orders")
        cy.contains("Shopping Cart")
        cy.contains("Total")
        cy.contains("$0.00")
    })

    it('Adds a figure to cart correctly', () => {
        cy.get('Button').first().click()
        cy.contains("Melina Figure (Elden Ring)")
        cy.contains("1 x $69.99")
        cy.contains("Total")
        cy.contains("$69.99")
        cy.contains("Continue to Checkout")
    })

    it('Removes a figure from cart correctly', () => {
        cy.get('Button').first().click()
        cy.get('Button').first().click()
        cy.contains("Melina Figure (Elden Ring)")
        cy.contains("2 x $69.99")
        cy.contains("Total")
        cy.contains("$139.98")
        cy.contains("Continue to Checkout")
        cy.get('Button').eq(1).click()
        cy.contains("Melina Figure (Elden Ring)")
        cy.contains("1 x $69.99")
        cy.contains("Total")
        cy.contains("$69.99")
        cy.contains("Continue to Checkout")
        cy.get('Button').eq(1).click()
        cy.contains("Total")
        cy.contains("$0.00")
        cy.get('Button').contains('Continue to Checkout').should('not.exist');
    })

    it('Navigates to checkout correctly', () => {
        cy.get('Button').first().click()
        cy.contains("Melina Figure (Elden Ring)")
        cy.contains("1 x $69.99")
        cy.contains("Total")
        cy.contains("$69.99")
        cy.contains("Continue to Checkout")
        cy.get("Button").contains("Continue to Checkout").click()
        cy.location('pathname').should('eq', '/order')
    })

    it('Places an order correctly', () => {
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
    })
    
})
