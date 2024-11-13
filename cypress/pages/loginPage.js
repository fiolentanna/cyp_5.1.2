export class LoginPage {
    elements = {
        usernameField: () => cy.get('[data-cy="username"]'),
        passwordField: () => cy.get('[data-cy="password"]'),
        submitButton: () => cy.get('[data-cy="submit"]'),
    }
    signin(username, password) {
        this.elements.usernameField().type(username);
        this.elements.passwordField().type(password);
        this.elements.submitButton().click({force: true});
    }
}