/*Selectors*/
let usernameField = "#txtUsername"
let passwordField = "#txtPassword"
let loginBtn = "#btnLogin"
let invalidMessage = "#spanMessage"
let profileLink = "#welcome"
let logoutLink = "#welcome-menu > :nth-child(1) > :nth-child(2) > a"

class loginPage {
    constructor() { };
    cmd_performLogin(username, password) {
        cy.get(usernameField).type(username);
        cy.get(passwordField).type(password);
        this.clickLoginBtn()
        cy.wait(1000)
    }

    doLogout() {
        cy.get(profileLink).click({force: true});
        cy.get(logoutLink).click({force : true})
    }

    blankUsernameField(password) {
        cy.get(passwordField).type(password);
        cy.get(loginBtn).click({force:true})
    }

    blankPasswordField(username) {
        cy.get(usernameField).type(username);
        cy.get(loginBtn).click({force:true})
    }

    clickLoginBtn() {
        cy.get(loginBtn).click({force:true})
    }

    verifyErrorMessage(message) {
        cy.get(invalidMessage).contains(message)
    }
}
export default loginPage;