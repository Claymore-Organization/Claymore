
describe('All forum posts page tests', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/forum')
    })

    it('Navigates to the forum page correctly', () => {
        cy.contains("My Posts")
        cy.contains("New")
        cy.contains("Updated")
        cy.contains("In Progress")
        cy.contains("Completed")
    })

    it('Loads forum post correctly', () => {
        cy.get("#newposts").click();
        cy.get('[id^=fp-N0oYBQ8fsY_Pc6f17t8]').contains('Alex Li')
        cy.get('[id^=fp-N0oYBQ8fsY_Pc6f17t8]').contains('I really like to drink water. It keeps me alive.')
    })

    it('Navigates to forum thread correctly', () => {
        cy.get("#updposts").click();
        cy.get('Link').get('[id=fp-N0oY_x-yxufHeZSK3b1]').first().click()
    })

    it('Navigates to new forum post page correctly', () => {
        cy.get('Button').contains('New Post').click()
        cy.location('pathname').should('eq', '/newPost')
        // cy.get('Link').contains('Hey').click()
    })
})

describe('New Forum thread tests', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/newPost')
    })

    it('Navigates to the new forum thread page correctly', () => {
        cy.contains("Post Title")
        cy.contains("Post Content")
    })

    it('Creates a new forum post correctly', () => {
        cy.get('New Post').should('not.exist');
        cy.get('[id=postTitle]').type('Cypress test title')
        cy.get('[id=postContent]').type('Cypress test content')
        cy.contains('New Post')
        cy.get('Button').contains('New Post').click()
        cy.contains("Cypress test title")
        cy.contains("Cypress test content")
        cy.contains('Submit')
    })
})

describe('Forum thread page tests', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/forum/post/-N0oY_x-yxufHeZSK3b1')
    })

    it('Navigates to the forum thread page correctly', () => {
        cy.contains("Hey")
        cy.contains("Alex Li")
        cy.contains("My post")
        cy.contains('Submit')
    })

    it('Leaves a reply message correctly', () => {
        cy.get('[id=newMsg]').type('Cypress test reply')
        cy.get('form').submit()
        cy.contains('Cypress test reply')
    })
})