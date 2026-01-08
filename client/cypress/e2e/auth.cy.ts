describe('Authentication', () => {
  const testUser = {
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    name: 'Test User'
  };

  it('should display sign in page', () => {
    cy.visit('/login');
    cy.contains('Sign In').should('be.visible');
  });

  it('should display sign up page', () => {
    cy.visit('/register');
    cy.contains('Create Account').should('be.visible');
  });

  it('should register new user', () => {
    cy.visit('/register');
    cy.get('input[type="text"]').type(testUser.name);
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`, { timeout: 10000 });
  });

  it('should login with created user', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`, { timeout: 10000 });
  });

  it('should show validation with empty fields', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').should('have.attr', 'required');
    cy.get('input[type="password"]').should('have.attr', 'required');
  });
});
