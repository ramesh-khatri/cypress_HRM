/// <reference types="Cypress" />

import employmentStatusPage from "../../../pageobjects/admin/job/employmentStatusPage";

const objEmpStatus = new employmentStatusPage();
describe('Admin section employment status test', () => {
    let credential = "";
    let data = "";
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
        cy.fixture('data/common/loginData.json').then(loginData => {
            credential = loginData;
        });
        cy.fixture("data/admin/job/employmentStatus.json").then(payData => {
            data = payData;
        })
        cy.wait(2000)
    })

    it('Should able to add employment status', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objEmpStatus.navToEmploymentStatusPage();
        objEmpStatus.openEmploymentStatusAddForm();
        objEmpStatus.verifyEmploymentStatusTitle('Add Employment Status')
        objEmpStatus.addEmploymentStatus(data.valid.name.concat(objEmpStatus.getRandomName()));
        objEmpStatus.verifySuccessMsg('Successfully Saved');
    })

    it('Should not be able to add duplicate employment status', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objEmpStatus.navToEmploymentStatusPage();
        cy.wait(2000);
        cy.get('tbody > :nth-child(1) > :nth-child(2) > a').invoke('text').then((existingStatus) => {
            objEmpStatus.openEmploymentStatusAddForm();
            objEmpStatus.verifyEmploymentStatusTitle('Add Employment Status')
            objEmpStatus.addEmploymentStatus(existingStatus);
            objEmpStatus.verifyValidationError('Already exists');
        })
    })

    it('Should not be able to add empty employment status name', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objEmpStatus.navToEmploymentStatusPage();
        objEmpStatus.openEmploymentStatusAddForm();
        objEmpStatus.verifyEmploymentStatusTitle('Add Employment Status')
        objEmpStatus.addEmploymentStatus(" ");
        objEmpStatus.verifyValidationError('Required');
    })

    it('Should able to cancel employment status form', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objEmpStatus.navToEmploymentStatusPage();
        objEmpStatus.openEmploymentStatusAddForm();
        objEmpStatus.verifyEmploymentStatusTitle('Add Employment Status')
        objEmpStatus.cancelEmploymentStatus();
        objEmpStatus.verifyEmploymentStatusListTitle('Employment Status')
    })

    it('Should able to edit employment status', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objEmpStatus.navToEmploymentStatusPage();
        objEmpStatus.editEmploymentStatus(data.valid.name.concat(objEmpStatus.getRandomName()));
        objEmpStatus.verifyEmploymentStatusListTitle('Employment Status')
        objEmpStatus.verifySuccessMsg('Successfully Saved');
    })

    it('Should able to delete employment status', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objEmpStatus.navToEmploymentStatusPage();
        objEmpStatus.deleteEmploymentStatus();
        objEmpStatus.verifySuccessMsg('Successfully Deleted')
    })

    it('Should able to cancel delete confirmation', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objEmpStatus.navToEmploymentStatusPage();
        objEmpStatus.verifyDeleteCancelBtn();
        objEmpStatus.verifyEmploymentStatusListTitle('Employment Status')
    })

})