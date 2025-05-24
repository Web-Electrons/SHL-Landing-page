describe('HomeNavbar Navigation Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  context('Desktop Navbar Navigation', () => {
    beforeEach(() => {
      cy.viewport(1280, 800) // Simulasi tampilan desktop
    })

    it('should navigate to Shipping Addresses section', () => {
      cy.get('#navbar_shippingAddress').should('be.visible').click()
      cy.url().should('include', '#cross-border')
    })

    it('Should navigate to Shipping Labels page', () => {
      cy.get('#navbar_shippingLabels').should('be.visible').click()
      cy.url().should('include', '/shippingLabels')
    })

    it('should navigate to About Us page', () => {
      cy.get('#navbar_aboutUs').should('be.visible').click()
      cy.url().should('include', '/aboutUs')
    })

    it('should navigate to Sign Up page', () => {
      cy.get('#navbar_signup').should('be.visible').click()
      cy.origin('https://client.shiplink.ca', () => {
        cy.url({ timeout: 10000 }).should('include', '/signup') // atau bisa pakai Cypress.env()
        cy.contains('Sign up') // mencari teks "Sign up" di halaman
      })
    })

    it('should navigate to Login page', () => {
      cy.get('#navbar_login').should('be.visible').click()
      cy.origin('https://client.shiplink.ca', () => {
        cy.url({ timeout: 10000 }).should('include', '/login') // atau bisa pakai Cypress.env()
        cy.contains('Log In') // mencari teks "Sign up" di halaman
      })
    })

    it('should change language to French', () => {
      cy.get('#navbar_language').should('be.visible').click()
      cy.get('#navbar_language_fr').should('be.visible').click()
      cy.url().should('include', '/fr')
      cy.get('h1').contains('Achetez')
    })
    it('should change language to Spanish', () => {
      cy.get('#navbar_language').should('be.visible').click()
      cy.get('#navbar_language_es').should('be.visible').click()
      cy.url().should('include', '/es')
      cy.get('h1').contains('Compre')
    })
  })

  context('Mobile Navbar Navigation', () => {
    beforeEach(() => {
      cy.viewport('iphone-6') // Simulasi tampilan mobile
      cy.visit('/')
      cy.get('#mobile_navbar_button').should('be.visible').click()
    })

    it('should navigate to Shipping Addresses section', () => {
      cy.get('#mobile_navbar_shippingAddress').should('be.visible').click()
      cy.url().should('include', '#cross-border')
      cy.get('h2').contains('Cross-Border')
    })

    it('should navigate to Shipping Labels page', () => {
      cy.get('#mobile_navbar_shippingLabels').should('be.visible').click()
      cy.url().should('include', '/shippingLabels')
      cy.get('h1').contains('Shipping Labels')
    })

    it('should navigate to About Us page', () => {
      cy.get('#mobile_navbar_aboutUs').should('be.visible').click()
      cy.url().should('include', '/aboutUs')
      cy.get('h1').contains('About Us')
    })

    it('should change language to french', () => {
      cy.get('#mobile_navbar_language').should('be.visible').click()
      cy.get('#mobile_navbar_language_fr').should('be.visible').click()
      cy.url().should('include', '/fr')
      cy.get('h1').contains('Achetez')
    })

    it('should change language to spanish', () => {
      cy.get('#mobile_navbar_language').should('be.visible').click()
      cy.get('#mobile_navbar_language_es').should('be.visible').click()
      cy.url().should('include', '/es')
      cy.get('h1').contains('Compre')
    })
  })
})

// describe('Navigation to About Page', () => {
//   it('should navigate to the about page', () => {
//     // Start from the index page
//     cy.visit('http://localhost:3000/')

//     // Find a link with an href attribute containing "about" and click it
//     cy.get('a[href*="about"]').click()

//     // The new url should include "/about"
//     cy.url().should('include', '/about')

//     // The new page should contain an h1 with "About"
//     cy.get('h1').contains('About')
//   })
// })

// describe('Navigate to Shopping Ideas page', () => {
//   it('should navigate to the Shopping Ideas page when the link is clicked', () => {
//     // Ganti dengan URL yang sesuai jika bukan root
//     cy.visit('/')

//     // Temukan link berdasarkan teks atau href
//     cy.contains('a', 'Shopping Ideas')
//       .should('have.attr', 'href', '/en/blog/shopping_ideas')
//       .click()

//     // Pastikan URL berubah ke halaman yang benar
//     cy.url().should('include', '/en/blog/shopping_ideas')

//     // Opsional: Cek apakah konten halaman tujuan ada
//     cy.contains('Shopping Ideas').should('be.visible')
//   })
// })
