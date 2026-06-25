/// <reference types="cypress" />
/* global cy, context, beforeEach, it */

context('Images', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080',);
  },);

  it('resolves hero background image path', () => {
    cy.get('.hero-media',).
      should('have.attr', 'style',).
      and('contain', 'assets/images/',).
      and('not.contain', '@images/',);
  },);
},);
