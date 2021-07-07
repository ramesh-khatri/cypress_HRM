/// <reference types="Cypress"/>

import jobPage from "../../../pageobjects/admin/job/jobPage";

const objJobPage = new jobPage();
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

    it('Should able to add job title', function () {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobPage.navtoJobPage();
        cy.wait(2000);
        objJobPage.navtoJobAddPage();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/saveJobTitle');
        const filePath = 'files/sample.pdf'
        objJobPage.jobTitleFormWithAllData(data.valid.jobtitle.concat(objJobPage.getRandomName()), data.valid.jobdescription, filePath, data.valid.note);
        objJobPage.verifySuccessMsg('Successfully Saved')
    })

    it('Should able to save by adding only job title field', function () {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobPage.navtoJobPage();
        cy.wait(2000);
        objJobPage.navtoJobAddPage();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/saveJobTitle');
        objJobPage.jobTitleFormWithoutJobSpecification(data.valid.jobtitle.concat(objJobPage.getRandomName()), " ", " ");
        objJobPage.verifySuccessMsg('Successfully Saved')
    })

    it('Should not be able to add empty job title', function () {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobPage.navtoJobPage();
        cy.wait(2000);
        objJobPage.navtoJobAddPage();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/saveJobTitle');
        const filePath = 'files/sample.pdf'
        objJobPage.jobTitleFormWithAllData(" ", data.valid.jobdescription, filePath, data.valid.note);
        objJobPage.verifyValidationMsg('jobtitle', 'Required')
    })

    it('Should not be able to add more than 400 chars in note field', function () {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobPage.navtoJobPage();
        cy.wait(2000);
        objJobPage.navtoJobAddPage();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/saveJobTitle');
        const filePath = 'files/sample.pdf'
        objJobPage.jobTitleFormWithAllData(data.valid.jobtitle, data.valid.jobdescription, filePath, data.invalid.note);
        objJobPage.verifyValidationMsg('note', 'Should be less than 400 characters')
    })

    it('Should able to add more than 1 MB file in job specification', function () {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobPage.navtoJobPage();
        cy.wait(2000);
        objJobPage.navtoJobAddPage();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/saveJobTitle');
        const filePath = 'files/sample1_6mb.pdf'
        objJobPage.jobTitleFormWithAllData(data.valid.jobtitle.concat(objJobPage.getRandomName()), data.valid.jobdescription, filePath, data.valid.note);
        objJobPage.verifyValidationMsg('jobspecification', 'Validation Failed')
    })

    it('Should able to cancel the form', function () {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobPage.navtoJobPage();
        cy.wait(2000);
        objJobPage.navtoJobAddPage();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/saveJobTitle');
        cy.wait(2000);
        objJobPage.verifyCancelBtn();
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/viewJobTitleList/jobTitleId/');
    })

    it('Should able to edit job title', function () {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobPage.navtoJobPage();
        cy.wait(2000);
        const filePath = 'files/sample.pdf'
        objJobPage.verifyJobTitleEdit(data.valid.jobtitle.concat(objJobPage.getRandomName()), data.valid.jobdescription, filePath, data.valid.note);
        objJobPage.verifySuccessMsg('Successfully Updated')
    })

    it('Should able to delete job title', function () {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobPage.navtoJobPage();
        cy.wait(2000);
        objJobPage.verifyDeleteButton();
        objJobPage.verifySuccessMsg('Successfully Deleted')
    })

    it('Should able to cancel the delete modal', function () {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobPage.navtoJobPage();
        cy.wait(2000);
        objJobPage.verifyDeleteCancelButton();
        objJobPage.verifyModalClose('Job Titles')
    })

    it('Should not be able to add duplicate job title', function () {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobPage.navtoJobPage();
        cy.wait(2000);
        cy.get('tbody > :nth-child(1) > :nth-child(2) > a').invoke('text').then((existingTitle) => {
            objJobPage.navtoJobAddPage();
            cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/saveJobTitle');
            const filePath = 'files/sample.pdf'
            objJobPage.jobTitleFormWithAllData(existingTitle, data.valid.jobdescription, filePath, data.valid.note);
        });
        objJobPage.verifyValidationMsg('existingJobTitleError', 'Already exists')      
    })

    it('Should able to sort job title', function () {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobPage.navtoJobPage();
        objJobPage.getTableDataBeforeSorting()
        objJobPage.getTableDataAfterSorting()
        cy.readFile('cypress/fixtures/files/tempBefore.txt').then((pushSort) => {
            cy.readFile('cypress/fixtures/files/tempAfter.txt').then((unshiftSort) => {
                expect(pushSort).to.deep.equal(unshiftSort)
            })
        })
    })


    // This job titile>>Job Specification is accepting all extension file type less than 1MB 

})