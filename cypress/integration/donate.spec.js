describe("Donate page", () => {
 
    beforeEach(() => {
      cy.visit("/");
      // Click Donate navbar link
      cy.get('.navbar-nav:nth-child(1)').
        find('.nav-item:nth-child(3)').click()
    });
  
    it("allows a valid donation to be submitted", () => {
       // Fill out web form
        cy.get('#paymenttype').select('Visa')
        cy.get('input[data-test=amount]').type(321);
        cy.get('label').contains('Message').next().type('Best wishes');
        cy.contains('Thanks for your Donation').should('not.exist');
        cy.get('.error').should('not.exist')
        cy.get('button[type=submit]').click();
        cy.contains('Thanks for your Donation').should('exist');
     });
 
     it("shows error messages for incomplete form fields", () => {
        cy.get('button[type=submit]').click();
        cy.get('.error').contains('Amount') 
        cy.get('.error').contains('Message')
        cy.get('input[data-test=amount]').type(321);
        cy.get('.error').contains('Amount').should('not.exist')
        cy.get('label').contains('Message').next().type('Best wishes');
        cy.get('.error').should('not.exist')
     });
})