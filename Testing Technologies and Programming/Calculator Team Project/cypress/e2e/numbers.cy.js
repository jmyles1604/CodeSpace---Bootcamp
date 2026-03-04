// Tests for number button functionality
describe('Number button functionality', () => {

  // Basic example test
  it('displays numbers when clicked', () => {
    cy.visit('/');
    cy.contains('button', '7').click();
    cy.get('#display').should('have.value', '7');
  });

  // Loop through all digits 0–9
  const numbers = ['0','1','2','3','4','5','6','7','8','9'];

  numbers.forEach(num => {
    it(`displays ${num} when ${num} is clicked`, () => {
      cy.visit('/');
      cy.contains('button', num).click();
      cy.get('#display').should('have.value', num);
    });
  });

});
