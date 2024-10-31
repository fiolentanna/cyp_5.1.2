/// <reference types="cypress" />

describe('Header links for Student', () => {
    beforeEach("Login by student", () => {
        cy.visit("/")
        cy.get("#account-menu > a > span").click()
        cy.get("#login-item").click()
        cy.get("#username").type("student_cypress")
        cy.get("#password").type("student_cypress")
        cy.get('[data-cy="submit"]').click()
    })   
    
    it('Check "Logo" link in header', () => {
        cy.visit("/account/settings")
        cy.get(".brand-icon").click()
        cy.url().should("eq", Cypress.config().baseUrl + "?page=1&sort=id,asc")
    })

    it('Check "Brand title" link in header', () => {
        cy.visit("/account/settings")
        cy.checkText(".brand-title","Sqlverifier").click()
        cy.url().should("eq", Cypress.config().baseUrl + "?page=1&sort=id,asc")
    })

    it('Check "Home" link in header', () => {
        cy.visit("/account/settings")
        cy.checkText("#header-tabs > li:nth-child(1) > a > span > span","Home").click()
        cy.url().should("eq", Cypress.config().baseUrl + "?page=1&sort=id,asc")
    })

    it('Check "Entities/Task" link in header', () => {
        cy.checkText('[data-cy="entity"] > .d-flex','Entities').click()
        cy.get('[href="/task"] > span').click()
        cy.url().should("eq", Cypress.config().baseUrl + "task?page=1&sort=id,asc")
    })
    
    it('Check "Entities/User Task" link in header', () => {
        cy.visit("/account/settings")
        cy.checkText('[data-cy="entity"] > .d-flex','Entities').click()
        cy.get('[href="/user-task"] > span').click()
        cy.url().should("eq", Cypress.config().baseUrl + "user-task")
    })

    it('Check "Swagger/API" link in header', () => {
        cy.visit("/user-task")
        cy.checkText('[data-cy="docsMenu"] > .d-flex','Swagger').click()
        cy.get('[data-cy="docsMenu"] > .dropdown-menu > .dropdown-item').click()
        cy.url().should("eq", Cypress.config().baseUrl + "docs/docs")
    })

    it('Check "Français" switch to language in header', () => {
        cy.checkText(":nth-child(4) > .d-flex > span","English").click()
        cy.get('[value="fr"]').click()
        cy.checkLangAfterChange('Français', 'Accueil', 'Entités', 'Compte')
    })

    it ('Check "Русский" switch to language in header', () => {
        cy.checkText(":nth-child(4) > .d-flex > span","English").click()
        cy.get('[value="ru"]').click()
        cy.checkLangAfterChange('Русский', 'Главная', 'Сущности', 'Профиль')
    })

    it('Check "Українська" switch to language in header', () => { 
        cy.checkText(":nth-child(4) > .d-flex > span","English").click()
        cy.get('[value="ua"]').click()
        cy.checkLangAfterChange('Українська', 'Головна', 'Сутності', 'Профіль')
    })

    it('Check "English" switch to language in header', () => {
        cy.get(":nth-child(4) > .d-flex > span").click()
        cy.get('[value="ru"]').click()
        cy.get(":nth-child(4) > .d-flex > span").click()
        cy.get('[value="en"]').click()
        cy.checkLangAfterChange('English', 'Home', 'Entities', 'Account')
    })

    it('Check "Account/Settings" link in header', () => {
        cy.checkText(":nth-child(5) > .d-flex > span","Account").click()
        cy.get('[data-cy="settings"]').click()
        cy.url().should("eq", Cypress.config().baseUrl + "account/settings")
    })

    it('Check "Account/Password" link in header', () => {
        cy.checkText(":nth-child(5) > .d-flex > span","Account").click()
        cy.get('[data-cy="passwordItem"]').click()
        cy.url().should("eq", Cypress.config().baseUrl + "account/password")
    })

    it('Check "Account/Sing out" link in header', () => {
        cy.checkText(":nth-child(5) > .d-flex > span","Account").click()
        cy.get('[data-cy="logout"]').click()
        cy.url().should("eq", Cypress.config().baseUrl + "logout")
    })
})