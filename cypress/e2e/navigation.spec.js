/// <reference types="cypress" />
/* global cy, context, beforeEach, it */

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080',);
  },);

  it('renders landing page sections', () => {
    cy.get('#hero',).should('be.visible',);
    cy.get('#depoimentos',).should('be.visible',);
    cy.get('#faq',).should('be.visible',);
    cy.get('#rodape',).should('be.visible',);
  },);

  it('navigates with header links', () => {
    cy.get('header .nav-link[href="#depoimentos"]',).click();
    cy.location('hash',).should('equal', '#depoimentos',);

    cy.get('header .nav-link[href="#faq"]',).click();
    cy.location('hash',).should('equal', '#faq',);
  },);

  it('opens and closes mobile side menu', () => {
    cy.viewport('iphone-8',);
    cy.get('header button[aria-label="Abrir menu lateral"]',).filter(':visible',).first().click();
    cy.get('#mobileNavigation',).should('have.class', 'show',);
    cy.get('#mobileNavigation a[href="#faq"]',).should('be.visible',);
    cy.get('#mobileNavigation button[aria-label="Fechar"]',).click();
    cy.get('#mobileNavigation',).should('not.have.class', 'show',);
  },);
},);
