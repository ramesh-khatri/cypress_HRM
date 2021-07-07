/// <reference types="Cypress" />

import leaveListPages from "../../../pageobjects/leave/leaveList/leaveListPages";

const objLeaveList = new leaveListPages();
describe('Leave section leave list test', () => {
    let credential = "";
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
        cy.fixture('data/common/loginData.json').then(loginData => {
            credential = loginData;
        });
        cy.wait(2000)
    })

    it('Should able to view the next page', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objLeaveList.navToLeaveListPage()
        objLeaveList.uncheckPendingList()
        objLeaveList.verifyNextBtn()
    })

})