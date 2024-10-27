/// <reference types="cypress" />

describe('Student auth', () => {
    beforeEach(() => {
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
        cy.url().should("eq", "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/?page=1&sort=id,asc")
    })

    it('Check "Brand title" link in header', () => {
        cy.visit("/account/settings")
        cy.get(".brand-title").should('have.text', 'Sqlverifier').click()
        cy.url().should("eq", "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/?page=1&sort=id,asc")
    })

    it('Check "Home" link in header', () => {
        cy.visit("/account/settings")
        cy.get("#header-tabs > li:nth-child(1) > a > span > span").should("have.text", "Home").click()
        cy.url().should("eq", "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/?page=1&sort=id,asc")
    })

    it('Check "Entities/Task" link in header', () => {
        cy.get('[data-cy="entity"] > .d-flex').should("have.text", "Entities").click()
        cy.get('[href="/task"] > span').click()
        cy.url().should("eq", "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/task?page=1&sort=id,asc")
    })
    
    it('Check "Entities/User Task" link in header', () => {
        cy.visit("/account/settings")
        cy.get('[data-cy="entity"] > .d-flex').should("have.text", "Entities").click()
        cy.get('[href="/user-task"] > span').click()
        cy.url().should("eq", "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/user-task")
    })

    it('Check "Swagger/API" link in header', () => {
        cy.visit("/user-task")
        cy.get('[data-cy="docsMenu"] > .d-flex').should("have.text", "Swagger").click()
        cy.get('[data-cy="docsMenu"] > .dropdown-menu > .dropdown-item').click()
        cy.url().should("eq", "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/docs/docs")
    })

    it('Check "Français" switch to language in header', () => {
        cy.get(":nth-child(4) > .d-flex > span").should("have.text", "English").click()
        cy.get('[value="fr"]').click()
        cy.get(":nth-child(4) > .d-flex > span").should("have.text", "Français")
        cy.get('[data-cy="entity"] > .d-flex').should("have.text", "Entités")
        cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Compte")
    })

    it ('Check "Русский" switch to language in header', () => {
        cy.get(":nth-child(4) > .d-flex > span").should("have.text", "English").click()
        cy.get('[value="ru"]').click()
        cy.get(":nth-child(4) > .d-flex > span").should("have.text", "Русский")
        cy.get("#header-tabs > li:nth-child(1) > a > span > span").should("have.text","Главная")
        cy.get('[data-cy="entity"] > .d-flex').should("have.text", "Сущности")
        cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Профиль")
    })

    it('Check "Українська" switch to language in header', () => {
        cy.get(":nth-child(4) > .d-flex > span").should("have.text", "English").click() 
        cy.get('[value="ua"]').click()
        cy.get(":nth-child(4) > .d-flex > span").should("have.text", "Українська")
        cy.get("#header-tabs > li:nth-child(1) > a > span > span").should("have.text","Головна")
        cy.get('[data-cy="entity"] > .d-flex').should("have.text", "Сутності")
        cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Профіль")
    })

    it('Check "English" switch to language in header', () => {
        cy.get(":nth-child(4) > .d-flex > span").click()
        cy.get('[value="ru"]').click()
        cy.get(":nth-child(4) > .d-flex > span").click()
        cy.get('[value="en"]').click()
        cy.get(":nth-child(4) > .d-flex > span").should("have.text", "English")
        cy.get("#header-tabs > li:nth-child(1) > a > span > span").should("have.text","Home")
        cy.get('[data-cy="entity"] > .d-flex').should("have.text", "Entities")
        cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Account")
    })

    it('Check "Account/Settings" link in header', () => {
        cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Account").click()
        cy.get('[data-cy="settings"]').click()
        cy.url().should("eq", "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/account/settings")
    })

    it('Check "Account/Password" link in header', () => {
        cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Account").click()
        cy.get('[data-cy="passwordItem"]').click()
        cy.url().should("eq", "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/account/password")
    })

    it('Check "Account/Sing out" link in header', () => {
        cy.get(":nth-child(5) > .d-flex > span").should("have.text", "Account").click()
        cy.get('[data-cy="logout"]').click()
        cy.url().should("eq", "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/logout")
    })
})