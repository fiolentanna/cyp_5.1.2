const positiveTestData = require("../../fixtures/positiveUserLoginData.json");
const negativeTestData = require("../../fixtures/negativeUserLoginData.json");
const loginPageSelectors = require("../../fixtures/loginPageSelectors.json");
const headerButtonsSelectors = require("../../fixtures/headerButtonsSelectors.json");


describe("Sign-in form testing", () => {
    beforeEach("Go to sign-in form", () => {
        cy.visit("/");
        cy.get(headerButtonsSelectors.accountButton).click();
        cy.get(headerButtonsSelectors.signInButton).click();
    });

    it("Successful user login", () => {
        positiveTestData.forEach((item) => {
            cy.enterText(loginPageSelectors.usernameField, item.username); // Вводим текст из тестовых данных
            cy.checkEnterText(loginPageSelectors.usernameField, item.username); // Проверяем, что значение введено корректно
      
            cy.enterText(loginPageSelectors.passwordField, item.password); // Вводим текст из тестовых данных
            cy.checkEnterText(loginPageSelectors.passwordField, item.password); // Проверяем, что значение введено корректно

            cy.get(loginPageSelectors.submitButton).click();
            cy.url().should("eq", Cypress.config().baseUrl + "?page=1&sort=id,asc")
        });
    });

    it("Fail login test with conditional input", () => {
        negativeTestData.forEach((item) => {
            // Флаг для проверки наличия пустого поля
            let isUsernameEmpty = !item.username;
            let isPasswordEmpty = !item.password;
    
            // Вводим имя пользователя, если оно не пустое
            if (item.username) {
                cy.enterText(loginPageSelectors.usernameField, item.username); // Вводим текст из тестовых данных
                cy.checkEnterText(loginPageSelectors.usernameField, item.username); // Проверяем, что значение введено корректно
            }
    
            // Вводим пароль, если он не пустой
            if (item.password) {
                cy.enterText(loginPageSelectors.passwordField, item.password); // Вводим текст из тестовых данных
                cy.checkEnterText(loginPageSelectors.passwordField, item.password); // Проверяем, что значение введено корректно
            }
    
            // Нажимаем кнопку отправки формы
            cy.get(loginPageSelectors.submitButton).click();
    
            // Проверяем наличие ошибки в зависимости от пустоты полей
            if (isUsernameEmpty || isPasswordEmpty) {
                // Если одно из полей пустое, проверяем наличие ошибки
                cy.get('.invalid-feedback', { timeout: 10000 }).should('be.visible');// Проверка, что ошибка видима
            } else {
                // Если оба поля заполнены, проверяем наличие другой ошибки (например, неверные учетные данные)
                cy.get('[data-cy="loginError"]').should('be.visible'); // Проверка, что элемент видим
            }
    
            cy.reload(); // Перезагружаем страницу после каждой проверки
        });
    });
})


