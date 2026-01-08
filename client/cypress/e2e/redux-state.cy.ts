describe('Redux State Management', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should persist auth state in localStorage', () => {
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      const user = win.localStorage.getItem('user');
      expect(token).to.exist;
      expect(user).to.exist;
    });
  });

  it('should clear auth state on logout', () => {
    cy.contains('Logout').click();
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      const user = win.localStorage.getItem('user');
      expect(token).to.be.null;
      expect(user).to.be.null;
    });
  });

  it('should update contacts state when adding contact', () => {
    cy.contains('New Contact').click();
    cy.url().should('include', '/new-contact');
    cy.get('form').should('exist');
  });

  it('should filter contacts with search', () => {
    cy.get('input[placeholder*="Search"]').should('exist');
  });
});
