import { faker } from '@faker-js/faker';
import { LoginPage } from "../../pages/loginPage";
import { HeaderMainPage } from "../../pages/headerMainPage";
import { ChangePasswordPage } from "../../pages/changePasswordPage";

let loginPage = new LoginPage;
let headerMainPage = new HeaderMainPage;
let changePasswordPage = new ChangePasswordPage; 

let login = 'anna_password_change2';
let currentPassword = 'kjhuYTfd7';
let newPassword = faker.internet.password(11);

describe("Testing change password API + UI",() => {
    beforeEach("Go to Main page", () => {
        cy.visit('/');
    });
    
    it("Testing user change password", () => {
        cy.intercept('POST', '/api/account/change-password').as('changePasswordRequest');

        headerMainPage.goToLoginPage();
        loginPage.signin(login, currentPassword); 
        headerMainPage.itemPassword();
        changePasswordPage.changePassword(currentPassword,newPassword);
        currentPassword = newPassword;

        cy.wait('@changePasswordRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);

        headerMainPage.logout();
        });
    });

    it("Testing user can sign in with new password", () => {
        headerMainPage.goToLoginPage();
        loginPage.signin(login,currentPassword);
        headerMainPage.itemPassword();
        changePasswordPage.changePassword(currentPassword,'kjhuYTfd7');
    });
})