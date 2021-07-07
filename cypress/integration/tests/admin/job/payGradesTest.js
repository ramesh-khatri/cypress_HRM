/// <reference types="Cypress" />

import payGradesPage from "../../../pageobjects/admin/job/payGradesPage";

const objPayGrade = new payGradesPage();
describe('Admin section pay grade test', () => {
    let credential = "";
    let data = "";
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
        cy.fixture('data/common/loginData.json').then(loginData => {
            credential = loginData;
        });
        cy.fixture("data/admin/job/payGrade.json").then(payData => {
            data = payData;
        })
        cy.wait(2000)
    })

    it('Should able to add pay grade', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.openPayGradeAddForm();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/payGrade');
        objPayGrade.addPayGrade(data.valid.name.concat(objPayGrade.getRandomName()));
        objPayGrade.verifySuccessMsg(' Successfully Saved ');
    })

    it('Should not be able to add duplicate pay grade', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        cy.wait(2000);
        cy.get('tbody > :nth-child(1) > :nth-child(2) > a').invoke('text').then((existingGrade) => {
            objPayGrade.openPayGradeAddForm();
            cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/payGrade');
            objPayGrade.addPayGrade(existingGrade);
            objPayGrade.verifyValidationError('Already exists');
        })
    })

    it('Should able to add currency', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.openPayGradeAddForm();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/payGrade');
        objPayGrade.addPayGrade(data.valid.name.concat(objPayGrade.getRandomName()));
        objPayGrade.assignCurrency(data.valid.currency, data.valid.min_salary, data.valid.max_salary);
        objPayGrade.verifySuccessMsg('Successfully Saved')
    })

    it('Should able to cancel the pay grade form', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.openPayGradeAddForm();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/payGrade');
        objPayGrade.cancelPayGrade();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/viewPayGrades');       
    })

    it('Should not be able to add empty pay grade', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.openPayGradeAddForm();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/payGrade');
        objPayGrade.addPayGrade(" ");
        objPayGrade.verifyValidationError('Required')
    })

    it('Should able to edit pay grade', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.editPayGrade(data.valid.name.concat(objPayGrade.getRandomName()));
        objPayGrade.verifySuccessMsg('Successfully Saved');
    })

    it('Should not be able to add empty currency', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.openPayGradeAddForm();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/payGrade');
        objPayGrade.addPayGrade(data.valid.name.concat(objPayGrade.getRandomName()));
        objPayGrade.assignCurrency(" ", data.valid.min_salary, data.valid.max_salary);
        objPayGrade.verifyCurrencyValidation('Required')
    })

    it('Should not be able to add negative salary amount', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.openPayGradeAddForm();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/payGrade');
        objPayGrade.addPayGrade(data.valid.name.concat(objPayGrade.getRandomName()));
        objPayGrade.assignCurrency(data.valid.currency, data.invalid.neg_min_salary, data.valid.max_salary);
        objPayGrade.verifyNegativeSalary('Should be a positive number')
    })

    it('Should not be able to add min salary greater than max salary', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.openPayGradeAddForm();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/payGrade');
        objPayGrade.addPayGrade(data.valid.name.concat(objPayGrade.getRandomName()));
        objPayGrade.assignCurrency(data.valid.currency, data.valid.max_salary, data.valid.min_salary);
        objPayGrade.verifySalaryAmount('Should be higher than Minimum Salary')
    })

    it('Should able to edit the currency', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.editCurrency(data.valid.currency, data.valid.min_salary, data.valid.max_salary);
        objPayGrade.verifySuccessMsg('Successfully Saved')
    })

    it('Should able to cancel currency form', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.openPayGradeAddForm();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/payGrade');
        objPayGrade.addPayGrade(data.valid.name.concat(objPayGrade.getRandomName()));
        objPayGrade.cancelCurrency();
        objPayGrade.verifyCurrencyFormClose('Assigned Currencies')
    })

    it('Should able to delete pay grade', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.deletePayGrade();
        objPayGrade.verifySuccessMsg('Successfully Deleted')
    })

    it('Should able to cancel of delete confirmation', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objPayGrade.navToPayGradePage();
        objPayGrade.verifyDeleteCancelBtn();
        objPayGrade.verifyDeleteFormClose('Pay Grades')
    })

})