/// <reference types="cypress" />
const positiveTestData = require("../../fixtures/positiveUserRegisterData.json");
const negativeTestData = require("../../fixtures/negativeUserRegisterData.json");

const usernameField = '[data-cy="username"]';
const emailField = '[data-cy="email"]';
const firstPasswordField = '[data-cy="firstPassword"]';
const confirmPasswordField = '[data-cy="secondPassword"]';
const submitButton = '[data-cy="submit"]';

describe("Register new user positive and negative", () => {
  beforeEach("Go to registration", () => {
    cy.visit("/");
    cy.get("#account-menu > a > span").click();
    cy.get('[data-cy="register"]').click();
  });

  it("Check a valid formats registrations", () => {
    positiveTestData.forEach((item) => {
        cy.enterText(usernameField, item.username); // Вводим текст из тестовых данных
        cy.checkEnterText(usernameField, item.username); // Проверяем, что значение введено корректно

        cy.enterText(emailField, item.email); // Вводим текст из тестовых данных
        cy.checkEnterText(emailField, item.email); // Проверяем, что значение введено корректно

        cy.enterText(firstPasswordField, item.password); // Вводим текст из тестовых данных
        cy.checkEnterText(firstPasswordField, item.password); // Проверяем, что значение введено корректно

        cy.enterText(confirmPasswordField, item.passwordConfirm); // Вводим текст из тестовых данных
        cy.checkEnterText(confirmPasswordField,item.passwordConfirm); // Проверяем, что значение введено корректно
        

       cy.reload(); // Перезагружаем страницу после каждой проверки
     });
   });

   it("Check negative registration", () => {
    negativeTestData.forEach((item) => {
        // Вводим значения в поля

        let isUsernameEmpty = !item.username;
        let isPasswordEmpty = !item.password;
        let isEmailEmpty = !item.email;
        let isPasswordConfirmEmpty = !item.passwordConfirm;

        if (item.username) {
            cy.enterText(usernameField, item.username); // Вводим текст из тестовых данных
            cy.checkEnterText(usernameField, item.username); // Проверяем, что значение введено корректно
        }

        // Вводим пароль, если он не пустой
        if (item.password) {
            cy.enterText(firstPasswordField, item.password); // Вводим текст из тестовых данных
            cy.checkEnterText(firstPasswordField, item.password); // Проверяем, что значение введено корректно
        }

        if(item.email) {
            cy.enterText(emailField, item.email);
            cy.checkEnterText(emailField, item.email);
        }

        if(item.passwordConfirm) {
            cy.enterText(confirmPasswordField, item.passwordConfirm);
            cy.checkEnterText(confirmPasswordField, item.passwordConfirm);
        }
        
        // Клик по кнопке регистрации
        cy.get(submitButton).click();

        // Проверяем, что на странице появился элемент с классом "invalid-feedback"
        if (!item.username || !item.email || !item.password || !item.passwordConfirm) {
            // Если есть пустые поля, проверяем наличие элемента с ошибкой
            cy.get('.invalid-feedback').should('be.visible');
        } else {
            // Если все поля заполнены, можно проверить другие условия, если необходимо
            // Например, проверка на успешную регистрацию или другие ошибки
            cy.get('.success-message').should('not.exist'); // Пример проверки отсутствия успешного сообщения
        }

        cy.reload(); // Перезагружаем страницу после каждой проверки
        });
    });
 })


