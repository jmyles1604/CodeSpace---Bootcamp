// Tests for clear, decimals, and error handling
describe('Special calculator functions', () => {

  it('clears the display', () => {
    cy.visit('/');
    cy.contains('button', '7').click();
    cy.contains('button', 'C').click();
    cy.get('#display').should('have.value', '');
  });

  it('handles decimal input', () => {
    cy.visit('/');
    cy.contains('button', '1').click();
    cy.contains('button', '.').click();
    cy.contains('button', '5').click();
    cy.get('#display').should('have.value', '1.5');
  });

  it('handles divide by zero', () => {
    cy.visit('/');
    cy.contains('button', '8').click();
    cy.contains('button', '÷').click();
    cy.contains('button', '0').click();
    cy.contains('button', '=').click();

    cy.get('#display').should('have.value', 'Error');
  });

});
