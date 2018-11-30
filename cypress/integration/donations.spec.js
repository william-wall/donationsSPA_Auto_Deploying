
describe("Manage Donations page", () => {

    beforeEach(() => {
        // Delete all donations in the API's datastore
        cy.request('https://donationweb-ssd-nodeserver.herokuapp.com/donations/')
          .its('body')
          .then( (donations) => {
             donations.forEach( (element) => {
                cy.request('DELETE',
                   'https://donationweb-ssd-nodeserver.herokuapp.com/donations/' + element._id)
             });
          })
          // Populate API's datastore
          cy.fixture('donations')
            .then((donations) => {
                donations.forEach((donation) => {
                  cy.request('POST',
                     'https://donationweb-ssd-nodeserver.herokuapp.com/donations/', donation )
                })
          })
          cy.visit("/");
          // Click Manage Donations navbar link
          cy.get('.navbar-nav:nth-child(1)').
              find('.nav-item:nth-child(2)').click()
  
     });
    
    it("allows a donation to be deleted", () => {
        cy.get('tbody').find('tr').should('have.length', 4)
        // Click trash/delete link of 3rd donation in list
        cy.get('tbody').find('tr:nth-child(3)').find('td:nth-child(8)').click()
        // Click confirmation button
        cy.get('button').contains('Delete').click()
        cy.get('tbody').find('tr').should('have.length', 3)
    });

    // it("shows and hides a donation's message", () => {
    //     // Click + symbol of 2nd donation in list
    //     cy.get('tbody').find('tr:nth-child(2)').find('td:nth-child(1)').click();
    //     cy.get('div.vue-message', {timeout: 5000}).should('contain', 'The message is [ Hope this helps')
    //     // Unclick same + symbol
    //     cy.get('tbody').find('tr:nth-child(2)').find('td:nth-child(1)').click();
    //     cy.get('div.vue-message').should('not.exist')
    // });
})