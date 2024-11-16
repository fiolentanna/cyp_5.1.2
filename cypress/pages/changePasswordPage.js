export class ChangePasswordPage {
    elements = {
        currentPasswordField: () => cy.get('#currentPassword'),
        newPasswordField: () => cy.get('#newPassword'),
        passwordConfirmField: () => cy.get('#confirmPassword'),
        saveButton: () => cy.get('[data-cy="submit"]'),
    }
    changePassword(password, newPassword) {
        this.elements.currentPasswordField().type(password);
        this.elements.newPasswordField().type(newPassword);
        this.elements.passwordConfirmField().type(newPassword);
        this.elements.saveButton().click();
    }
}