describe('Contact Statuses', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should display contact statuses', () => {
    cy.contains('Work').should('be.visible');
    cy.contains('Family').should('be.visible');
    cy.contains('Private').should('be.visible');
    cy.contains('Friends').should('be.visible');
    cy.contains('Others').should('be.visible');
  });

  it('should navigate to statuses page', () => {
    cy.contains('Statuses').click();
    cy.url().should('include', '/contact-statuses');
  });
});
