// Shop Tests
describe('Owner page tests', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/addFigure')
    })

    it('Navigates to the owner page correctly', () => {
        cy.contains("Add New Shop Item")
        cy.contains("Item Name")
        cy.contains("Image URL")
        cy.contains("Item Price")
        cy.contains("Item Stock")
        cy.contains("Is this a pre-order item?")
        cy.get("Button").contains("Add Item")
    })

    it('Adds a new figure to the shop correctly', () => {
       cy.get("[id=itemName]").type("Cypress test figure")
       cy.get("[id=imageURL]").type("https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png")
       cy.get("[id=stock]").type("10")
       cy.get("[id=price]").type("999.99")
       cy.get("Button").contains("Add Item").click()
       cy.contains("Item added! Check menu for update")
       cy.visit('http://localhost:3000/menu')
       cy.contains("Cypress test figure")
    })

    it('Adds a new figure to the shop correctly', () => {
        cy.get("[id=itemName]").type("Cypress test pre-order figure")
        cy.get("[id=imageURL]").type("https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png")
        cy.get("[id=stock]").type("10")
        cy.get("[id=price]").type("999.99")
        cy.get("[id=present]").click()
        cy.get("Button").contains("Add Item").click()
        cy.contains("Item added! Check menu for update")
        cy.visit('http://localhost:3000/menu')
        cy.contains("Cypress test pre-order figure")
     })
    
})
