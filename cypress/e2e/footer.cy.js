describe('Footer Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should navigate to the About Us page', () => {
    cy.get('#footer_aboutUs').should('be.visible').click()
    cy.url().should('include', '/aboutUs')
    cy.get('h1').contains('About Us')
  })
  it('should navigate to the Membership page', () => {
    cy.get('#footer_membership').should('be.visible').click()
    cy.url().should('include', '#membership')
    cy.get('h1').contains('Membership')
  })
  it('should navigate to the Shopping Ideas page', () => {
    cy.get('#footer_shopping').should('be.visible').click()
    cy.url().should('include', '/shopping_ideas')
    cy.get('h1').contains('Shopping Ideas')
  })
  it('should navigate to the Prohibited Items page', () => {
    cy.get('#footer_prohibited').should('be.visible').click()
    cy.url().should('include', '/prohibited-items')
    cy.get('h1').contains('Prohibited items')
  })
  it('should navigate to the Mailbox page', () => {
    cy.get('#footer_mailbox').should('be.visible').click()
    cy.url().should('include', '#cross-border')
    cy.get('h2').contains('Cross-Border')
  })
  it('should navigate to the Shipping Labels page', () => {
    cy.get('#footer_shipment').should('be.visible').click()
    cy.url().should('include', '/shippingLabels')
    cy.get('h1').contains('Shipping Labels')
  })
  it('should navigate to shipping calculator page', () => {
    cy.get('#footer_shipping_calculator').should('be.visible').click()
    cy.url().should('include', '/shipping_calculator')
    cy.get('h1').contains('Shipping Calculator')
  })

  it('should navigate to terms page', () => {
    cy.get('#footer_terms').should('be.visible').click()
    cy.url().should('include', '/terms')
    cy.get('h1').contains('Terms and Conditions')
  })

  it('should navigate to privacy page', () => {
    cy.get('#footer_privacy').should('be.visible').click()
    cy.url().should('include', '/privacy')
    cy.get('h1').contains('Privacy policy')
  })
})
