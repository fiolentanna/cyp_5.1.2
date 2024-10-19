/// <reference types="cypress" />

describe('visit sqlverifier', () => {
    beforeEach(() => {
      cy.visit('https://sqlverifier-live-6e21ca0ed768.herokuapp.com/')
    })
  
    it('find Brandname text at app-header', () => {
      cy.get('.brand-title').should('have.text', 'Sqlverifier')
    })
    
    it('find title', () => {
      cy.get('[data-cy="TaskHeading"]').should('have.text', 'Tasks')
    })
  })