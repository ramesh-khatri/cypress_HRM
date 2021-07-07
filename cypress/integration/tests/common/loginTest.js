///<reference types ="Cypress" />
import loginPage from "../../pageobjects/common/loginPage";

const objloginPage = new loginPage();
describe('Login page test', function () {
    let userCredential = ""
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
        cy.fixture('data/common/loginData.json').then(text => {
            userCredential = text
        })
        cy.wait(2000)
    })
    /* Login Test */
    it('Can login with valid credential', function () {
        cy.doLogin(userCredential.valid.username, userCredential.valid.password)
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/dashboard');
    })

    it('Cannot login with invalid credential', function () {
        cy.doLogin(userCredential.invalid.username, userCredential.invalid.password)
        objloginPage.verifyErrorMessage('Invalid credentials')
    })

    it('Cannot login with blank username', function () {
        objloginPage.blankUsernameField(userCredential.valid.password)
        objloginPage.verifyErrorMessage('Username cannot be empty')
    })

    it('Cannot login with blank password', function () {
        objloginPage.blankPasswordField(userCredential.valid.username)
        objloginPage.verifyErrorMessage('Password cannot be empty')
    })

    it('Cannot login with empty username and password', function () {
        objloginPage.clickLoginBtn()
        objloginPage.verifyErrorMessage('Username cannot be empty')
    })

    it('Can able to logout', function () {
        cy.doLogin(userCredential.valid.username, userCredential.valid.password)
        objloginPage.doLogout()
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/auth/login');
    })
})