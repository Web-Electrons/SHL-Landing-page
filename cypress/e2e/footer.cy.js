describe('Footer Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should navigate to the About Us page', () => {
    cy.get('#footer_aboutUs').should('be.visible').click()
    cy.url().should('include', '/aboutUs')
    cy.get('h1').contains('About Us')
  })
})
