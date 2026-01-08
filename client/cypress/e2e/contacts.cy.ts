describe('Contacts Management', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should display contacts list', () => {
    cy.contains('Contacts').should('be.visible');
  });

  it('should navigate to add contact page', () => {
    cy.contains('New Contact').click();
    cy.url().should('include', '/new-contact');
  });

  it('should create new contact', () => {
    cy.contains('New Contact').click();
    cy.url().should('include', '/new-contact');
    cy.get('form').should('exist');
  });

  it('should search contacts', () => {
    cy.get('input[placeholder*="Search"]').should('exist');
  });
});
