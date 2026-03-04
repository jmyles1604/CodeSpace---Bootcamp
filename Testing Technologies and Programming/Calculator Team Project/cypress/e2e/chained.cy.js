// Tests for chained operations using operator precedence
describe('Chained operations', () => {

  it('handles chained operations with correct precedence', () => {
    cy.visit('/');
    cy.contains('button', '1').click();
    cy.contains('button', '2').click();
    cy.contains('button', '+').click();
    cy.contains('button', '7').click();
    cy.contains('button', '×').click();
    cy.contains('button', '3').click();
    cy.contains('button', '=').click();

    // Your calculator uses operator precedence: 12 + (7 × 3) = 33
    cy.get('#display').should('have.value', '33');
  });

});
