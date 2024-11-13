export class HeaderMainPage {
    elements = {
        accountButton: () => cy.get('[data-cy="accountMenu"]'),
        logInButton: () => cy.get('[data-cy="login"]'),
        logOutButton: () => cy.get('[data-cy="logout"]'),
        passwordButton: () => cy.get('[data-cy="passwordItem"]'),   
    }
    goToLoginPage(){
        this.elements.accountButton().click({force: true});
        this.elements.logInButton().click({force: true});
        
    }
    logout(){
        this.elements.accountButton().click({force: true});
        this.elements.logOutButton().click({force: true});
        cy.visit('/');
    }
    itemPassword(){
        this.elements.accountButton().click({force: true});
        this.elements.passwordButton().click({force: true});    
    }
}