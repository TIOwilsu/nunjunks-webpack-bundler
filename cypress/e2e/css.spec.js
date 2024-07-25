/// <reference types="cypress" />

context('CSS', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080',);
  },);


  it('homepage colours', () => {
    cy.get('body',).
      should('have.css', 'background-color', 'rgb(33, 37, 41)',);
    cy.get('.page-title',).
      should('have.css', 'color', 'rgb(222, 226, 230)',);
    cy.get('.page-title',).
      should('have.css', 'color', 'rgb(222, 226, 230)',); 
    cy.get('.card h3',).
      should('have.css', 'color', 'rgb(255, 255, 255)',);
  },);
},);
