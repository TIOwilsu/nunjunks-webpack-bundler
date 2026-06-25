/// <reference types="cypress" />
/* global cy, context, beforeEach, it */

context('CSS', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080',);
  },);

  it('applies landing visual styles', () => {
    cy.get('body',).
      should('have.css', 'background-color', 'rgb(33, 37, 41)',);
    cy.get('.landing-header .nav-link',).
      first().
      should('have.css', 'color', 'rgba(255, 255, 255, 0.9)',);
    cy.get('.testimonial-card h3',).
      should('have.css', 'color', 'rgb(222, 226, 230)',);
  },);
},);
