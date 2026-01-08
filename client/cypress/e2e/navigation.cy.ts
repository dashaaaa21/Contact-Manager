describe('Navigation', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should navigate between pages', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    cy.contains('New Contact').click();
    cy.url().should('include', '/new-contact');

    cy.visit('/');
    cy.contains('Contacts').should('be.visible');
  });

  it('should logout user', () => {
    cy.contains('Logout').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should redirect to welcome when not logged in', () => {
    cy.clearAllSessionStorage();
    cy.clearAllLocalStorage();
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should display 404 page for invalid routes when logged in', () => {
    cy.visit('/invalid-route');
    cy.contains('404').should('be.visible');
  });
});
