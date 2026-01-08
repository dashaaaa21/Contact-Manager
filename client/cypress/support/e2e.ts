Cypress.Commands.add('login', (email?: string, password?: string) => {
  const userEmail = email || 'cypress-test@example.com';
  const userPassword = password || 'CypressTest123!';
  
  cy.session([userEmail, userPassword], () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/register',
      body: { name: 'Cypress Test', email: userEmail, password: userPassword },
      failOnStatusCode: false
    });
    
    cy.visit('/login');
    cy.get('input[type="email"]').type(userEmail);
    cy.get('input[type="password"]').type(userPassword);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`, { timeout: 10000 });
  });
  
  cy.visit('/');
});

Cypress.Commands.add('register', (name: string, email: string, password: string) => {
  cy.visit('/register');
  cy.get('input[type="text"]').type(name);
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('eq', `${Cypress.config().baseUrl}/`, { timeout: 10000 });
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
      register(name: string, email: string, password: string): Chainable<void>;
    }
  }
}

export {};
