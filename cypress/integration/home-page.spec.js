describe("Home page", () => {
 
  beforeEach(() => {
    cy.visit("/");
  });

  it("Shows a header", () => {
    cy.get(".vue-title").should('contain','Homes for President !!');
  });

  describe("Navigation bar", () => {
      it("Shows the required links", () => {
        cy.get(".navbar").find('[data-test=donatebtn]' );
        cy.get(".navbar").contains('Home' );
        cy.get('.navbar-nav:nth-child(1)').within(() => {
          cy.get('.nav-item:first').should('contain', 'Home')
          cy.get('.nav-item:nth-child(2)').should('contain', 'Manage')
          cy.get('.nav-item:nth-child(3)').should('contain', 'Donate')
          cy.get('.nav-item:nth-child(4)').should('contain', 'Map')
        })
        cy.get('.navbar-nav:nth-child(2)').within(() => {
          cy.get('.nav-item:first').should('contain', 'About')
          cy.get('.nav-item:nth-child(2)').should('contain', 'Contact')
        })
      });

      it("Redirects when links are clicked", () => {
        cy.get('[data-test=donatebtn]').click();
        cy.url().should('include','/donate' )
        cy.get(".navbar").contains('Manage' ).click();
        cy.url().should('include','/donations' )
        // etc
      });
    })
});