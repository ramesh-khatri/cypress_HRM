/// <reference types="Cypress" />

import workShiftPage from "../../../pageobjects/admin/job/workShiftPage";

const objWorkShift = new workShiftPage();
describe('Admin section work shift test', () => {
    let credential = "";
    let data = "";
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
        cy.fixture('data/common/loginData.json').then(loginData => {
            credential = loginData;
        });
        cy.fixture("data/admin/job/workShift.json").then(shiftData => {
            data = shiftData;
        })
        cy.wait(2000)
    })

    it('Should able to add work shift without assigning employee', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objWorkShift.navToWorkShiftPage();
        objWorkShift.openWorkShiftAddForm();
        objWorkShift.verifyWorkShiftAddTitle('Add Work Shift')
        objWorkShift.addWorkShiftWithoutEmployee(data.valid.shift_name.concat(objWorkShift.getRandomName()), data.valid.from, data.valid.to);
        objWorkShift.verifySuccessMsg('Successfully Saved');
    })

    it('Should able to assign/remove employee', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objWorkShift.navToWorkShiftPage();
        objWorkShift.openWorkShiftAddForm();
        objWorkShift.verifyWorkShiftAddTitle('Add Work Shift')
        objWorkShift.addWorkShiftWithEmployee(objWorkShift.getRandomName().concat(data.valid.shift_name), data.valid.from, data.valid.to, data.valid.nameValue1);
        objWorkShift.verifySuccessMsg('Successfully Saved');
    })

    it('Should able to cancel workshift form', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objWorkShift.navToWorkShiftPage();
        objWorkShift.openWorkShiftAddForm();
        objWorkShift.cancelWorkShift();
        objWorkShift.verifyWorkShiftListTitle('Work Shifts')
    })

    it('Should not be be able to add blank workshift name', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objWorkShift.navToWorkShiftPage();
        objWorkShift.openWorkShiftAddForm();
        objWorkShift.openWorkShiftAddForm();
        objWorkShift.verifyWorkShiftAddTitle('Add Work Shift');
        objWorkShift.addWorkShiftWithoutEmployee(" ", data.valid.from, data.valid.to);
        objWorkShift.verifyValidationError('Required')
    })

    it('Should not be be able to add blank workshift time', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objWorkShift.navToWorkShiftPage();
        objWorkShift.openWorkShiftAddForm();
        objWorkShift.openWorkShiftAddForm();
        objWorkShift.verifyWorkShiftAddTitle('Add Work Shift');
        objWorkShift.addWorkShiftWithEmptyTime(data.valid.shift_name.concat(objWorkShift.getRandomName()), data.valid.from, data.valid.to);
        objWorkShift.verifyValidationError('Required')
    })

    it('Should not be able to add workshift where "from" time is greater than "to" time', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objWorkShift.navToWorkShiftPage();
        objWorkShift.openWorkShiftAddForm();
        objWorkShift.verifyWorkShiftAddTitle('Add Work Shift')
        objWorkShift.addWorkShiftWithoutEmployee(data.valid.shift_name.concat(objWorkShift.getRandomName()), data.valid.to, data.valid.from);
        objWorkShift.verifyValidationError('From time should be less than To time');
    })

    it('Should able to edit work shift', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objWorkShift.navToWorkShiftPage();
        objWorkShift.editWorkShift(data.valid.shift_name.concat(objWorkShift.getRandomName()), data.valid.from, data.valid.to);
        objWorkShift.verifySuccessMsg('Successfully Saved');
    })

    it('Should not be able to add duplicate work shift', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objWorkShift.navToWorkShiftPage();
        cy.wait(2000);
        cy.get('tbody > :nth-child(1) > :nth-child(2) > a').invoke('text').then((existingShift) => {
            objWorkShift.openWorkShiftAddForm();
            objWorkShift.verifyWorkShiftAddTitle('Add Work Shift')
            objWorkShift.addWorkShiftWithoutEmployee(existingShift, data.valid.from, data.valid.to);
            objWorkShift.verifyValidationError('Already exists')
        })
    })

    it('Should able to delete work shift', () => {
            cy.doLogin(credential.valid.username, credential.valid.password);
            objWorkShift.navToWorkShiftPage();
            objWorkShift.deleteWorkShift();
            objWorkShift.verifySuccessMsg('Successfully Deleted')
    })

    it('Should able to cancel workshift delete confirmation', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objWorkShift.navToWorkShiftPage();
        objWorkShift.verifyDeleteCancelBtn();
        objWorkShift.verifyWorkShiftListTitle('Work Shifts')
    })

})