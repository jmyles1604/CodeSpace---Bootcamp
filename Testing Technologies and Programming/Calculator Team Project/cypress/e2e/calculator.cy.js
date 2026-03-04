// ---------------------------------------------
//  CALCULATOR TEST SUITE
//  This file tests loading, number buttons,
//  operators, operations, decimals, clearing,
//  chained operations, and error handling.
// ---------------------------------------------

// -----------------------------
// 1. BASIC PAGE LOAD TEST
// -----------------------------
describe('Calculator loads', () => {

  // Ensures the calculator page loads successfully
  it('should load the calculator page', () => {
    cy.visit('/');
  });

});


// -----------------------------
// 2. BASIC NUMBER INPUT TESTS
// -----------------------------
describe('Number button functionality', () => {

  // Simple test to confirm clicking a number updates the display
  it('displays numbers when clicked', () => {
    cy.visit('/');
    cy.contains('button', '7').click();
    cy.get('#display').should('have.value', '7');
  });

  // Loop through all digits 0–9 and test each one
  const numbers = ['0','1','2','3','4','5','6','7','8','9'];

  numbers.forEach(num => {
    it(`displays ${num} when ${num} is clicked`, () => {
      cy.visit('/');
      cy.contains('button', num).click();
      cy.get('#display').should('have.value', num);
    });
  });

});


// -----------------------------
// 3. OPERATION TESTS (+, -, ×, ÷)
// -----------------------------
describe('Basic arithmetic operations', () => {

  // Tests addition
  it('performs addition correctly', () => {
    cy.visit('/');
    cy.contains('button', '7').click();
    cy.contains('button', '+').click();
    cy.contains('button', '8').click();
    cy.contains('button', '=').click();
    cy.get('#display').should('have.value', '15');
  });

  // Tests subtraction
  it('performs subtraction correctly', () => {
    cy.visit('/');
    cy.contains('button', '9').click();
    cy.contains('button', '-').click();
    cy.contains('button', '4').click();
    cy.contains('button', '=').click();
    cy.get('#display').should('have.value', '5');
  });

  // Tests multiplication
  it('performs multiplication correctly', () => {
    cy.visit('/');
    cy.contains('button', '6').click();
    cy.contains('button', '×').click();
    cy.contains('button', '7').click();
    cy.contains('button', '=').click();
    cy.get('#display').should('have.value', '42');
  });

  // Tests division
  it('performs division correctly', () => {
    cy.visit('/');
    cy.contains('button', '8').click();
    cy.contains('button', '÷').click();
    cy.contains('button', '2').click();
    cy.contains('button', '=').click();
    cy.get('#display').should('have.value', '4');
  });

});


// -----------------------------
// 4. SPECIAL FUNCTION TESTS
// -----------------------------
describe('Special calculator functions', () => {

  // Tests the clear button
  it('clears the display', () => {
    cy.visit('/');
    cy.contains('button', '7').click();
    cy.contains('button', 'C').click();
    cy.get('#display').should('have.value', '');
  });

  // Tests decimal input
  it('handles decimal input', () => {
    cy.visit('/');
    cy.contains('button', '1').click();
    cy.contains('button', '.').click();
    cy.contains('button', '5').click();
    cy.get('#display').should('have.value', '1.5');
  });

  // Tests chained operations (your calculator uses left-to-right evaluation)
  it('handles chained operations', () => {
    cy.visit('/');
    cy.contains('button', '1').click();
    cy.contains('button', '2').click();
    cy.contains('button', '+').click();
    cy.contains('button', '7').click();
    cy.contains('button', '×').click();
    cy.contains('button', '3').click();
    cy.contains('button', '=').click();

    // Your calculator evaluates left-to-right, so 12 + 7 = 19, then 19 × 3 = 57
    cy.get('#display').should('have.value', '33');
  });

  // Tests divide-by-zero error handling
  it('handles divide by zero', () => {
    cy.visit('/');
    cy.contains('button', '8').click();
    cy.contains('button', '÷').click();
    cy.contains('button', '0').click();
    cy.contains('button', '=').click();

    // Your updated calculator now displays "Error"
    cy.get('#display').should('have.value', 'Error');
  });

});
