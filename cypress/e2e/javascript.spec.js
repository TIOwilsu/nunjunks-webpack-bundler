/// <reference types="cypress" />
/* global cy, context, beforeEach, it */

context('JavaScript', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080',);
  },);

  it('toggles FAQ accordion item', () => {
    cy.get('#faqOne',).should('have.class', 'show',);
    cy.get('button[data-bs-target="#faqTwo"]',).click();
    cy.get('#faqTwo',).should('have.class', 'show',);
    cy.get('#faqOne',).should('not.have.class', 'show',);
  },);
},);
