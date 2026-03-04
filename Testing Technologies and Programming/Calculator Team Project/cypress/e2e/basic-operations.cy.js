// Tests for +, -, ×, ÷ operations
describe('Basic arithmetic operations', () => {

  it('performs addition correctly', () => {
    cy.visit('/');
    cy.contains('button', '7').click();
    cy.contains('button', '+').click();
    cy.contains('button', '8').click();
    cy.contains('button', '=').click();
    cy.get('#display').should('have.value', '15');
  });

  it('performs subtraction correctly', () => {
    cy.visit('/');
    cy.contains('button', '9').click();
    cy.contains('button', '-').click();
    cy.contains('button', '4').click();
    cy.contains('button', '=').click();
    cy.get('#display').should('have.value', '5');
  });

  it('performs multiplication correctly', () => {
    cy.visit('/');
    cy.contains('button', '6').click();
    cy.contains('button', '×').click();
    cy.contains('button', '7').click();
    cy.contains('button', '=').click();
    cy.get('#display').should('have.value', '42');
  });

  it('performs division correctly', () => {
    cy.visit('/');
    cy.contains('button', '8').click();
    cy.contains('button', '÷').click();
    cy.contains('button', '2').click();
    cy.contains('button', '=').click();
    cy.get('#display').should('have.value', '4');
  });

});
