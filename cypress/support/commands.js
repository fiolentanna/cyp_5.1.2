// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkText', (selector, text) => {
    cy.get(selector).should("have.text", `${text}`);
})

Cypress.Commands.add('checkLangAfterChange', (langLang, homeLang, entityLang, profileLang) => { 
    cy.checkText(":nth-child(4) > .d-flex > span",`${langLang}`);
    cy.checkText("#header-tabs > li:nth-child(1) > a > span > span",`${homeLang}`);
    cy.checkText('[data-cy="entity"] > .d-flex',`${entityLang}`);
    cy.checkText(":nth-child(5) > .d-flex > span",`${profileLang}`);
})

Cypress.Commands.add('enterText', (selector, text) => {
    cy.get(selector).click().type(`${text}`).blur();
})

Cypress.Commands.add('checkEnterText', (selector, value) => {
    cy.get(selector).should("have.value", `${value}`);
})