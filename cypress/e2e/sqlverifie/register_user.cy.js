const positiveTestData = require("../../fixtures/positiveUserRegisterData.json");
const negativeTestData = require("../../fixtures/negativeUserRegisterData.json");
const registerPageSelectors = require("../../fixtures/registerPageSelectors.json");
const headerButtonsSelectors = require("../../fixtures/headerButtonsSelectors.json");

describe("Register new user positive and negative", () => {
  beforeEach("Go to registration", () => {
    cy.visit("/");
    cy.get(headerButtonsSelectors.accountButton).click();
    cy.get(headerButtonsSelectors.registerButton).click();
  });

  it("Check a valid formats registrations", () => {
    positiveTestData.forEach((item) => {
        cy.enterText(registerPageSelectors.usernameField, item.username); // Вводим текст из тестовых данных
        cy.checkEnterText(registerPageSelectors.usernameField, item.username); // Проверяем, что значение введено корректно

        cy.enterText(registerPageSelectors.emailField, item.email); // Вводим текст из тестовых данных
        cy.checkEnterText(registerPageSelectors.emailField, item.email); // Проверяем, что значение введено корректно

        cy.enterText(registerPageSelectors.firstPasswordField, item.password); // Вводим текст из тестовых данных
        cy.checkEnterText(registerPageSelectors.firstPasswordField, item.password); // Проверяем, что значение введено корректно

        cy.enterText(registerPageSelectors.confirmPasswordField, item.passwordConfirm); // Вводим текст из тестовых данных
        cy.checkEnterText(registerPageSelectors.confirmPasswordField,item.passwordConfirm); // Проверяем, что значение введено корректно
        
        cy.get(registerPageSelectors.submitButton).click();

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
            cy.enterText(registerPageSelectors.usernameField, item.username); // Вводим текст из тестовых данных
            cy.checkEnterText(registerPageSelectors.usernameField, item.username); // Проверяем, что значение введено корректно
        }

        // Вводим пароль, если он не пустой
        if (item.password) {
            cy.enterText(registerPageSelectors.firstPasswordField, item.password); // Вводим текст из тестовых данных
            cy.checkEnterText(registerPageSelectors.firstPasswordField, item.password); // Проверяем, что значение введено корректно
        }

        if(item.email) {
            cy.enterText(registerPageSelectors.emailField, item.email);
            cy.checkEnterText(registerPageSelectors.emailField, item.email);
        }

        if(item.passwordConfirm) {
            cy.enterText(registerPageSelectors.confirmPasswordField, item.passwordConfirm);
            cy.checkEnterText(registerPageSelectors.confirmPasswordField, item.passwordConfirm);
        }
        
        // Клик по кнопке регистрации
        cy.get(registerPageSelectors.submitButton).click();

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


