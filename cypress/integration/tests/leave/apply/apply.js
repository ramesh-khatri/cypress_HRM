///<reference types="Cypress"/>

import ApplyPage from "../../../pageobjects/leave/apply/applyPage";
const applypageObj = new ApplyPage()


describe('Admin section job page test', () => {
    let credential = "";
    let data = "";
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
        cy.fixture('data/common/loginData.json').then(loginData => {
            credential = loginData;
        });
        cy.fixture("data/admin/job/job.json").then(jobData => {
            data = jobData;
        })
        cy.wait(2000)
    })

    it('Should able to take leave', function () {
       cy.doLogin(credential.valid.username, credential.valid.password);
       applypageObj.applyleave();
 
    })

})