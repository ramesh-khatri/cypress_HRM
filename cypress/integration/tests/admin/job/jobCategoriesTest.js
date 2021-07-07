/// <reference types="Cypress" />

import jobCategoriesPage from "../../../pageobjects/admin/job/jobCategoriesPage";

const objJobCategories = new jobCategoriesPage();
describe('Admin section job categories test', () => {
    let credential = "";
    let data = "";
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
        cy.fixture('data/common/loginData.json').then(loginData => {
            credential = loginData;
        });
        cy.fixture("data/admin/job/jobCategories.json").then(categoryData => {
            data = categoryData;
        })
        cy.wait(2000)
    })

    it('Should able to add job categories', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobCategories.navTojobCategoriesPage();
        objJobCategories.openjobCategoriesAddForm();
        objJobCategories.verifyjobCategoriesTitle('Add Job Category')
        objJobCategories.addjobCategories(data.valid.name.concat(objJobCategories.getRandomName()));
        objJobCategories.verifySuccessMsg('Successfully Saved');
    })

    it('Should not be able to add duplicate job categories', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobCategories.navTojobCategoriesPage();
        cy.wait(2000);
        cy.get('tbody > :nth-child(1) > :nth-child(2) > a').invoke('text').then((existingStatus) => {
            objJobCategories.openjobCategoriesAddForm();
            objJobCategories.verifyjobCategoriesTitle('Add Job Category')
            objJobCategories.addjobCategories(existingStatus);
            objJobCategories.verifyValidationError('Already exists');
        })
    })

    it('Should not be able to add empty job categories name', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobCategories.navTojobCategoriesPage();
        objJobCategories.openjobCategoriesAddForm();
        objJobCategories.verifyjobCategoriesTitle('Add Job Category')
        objJobCategories.addjobCategories(" ");
        objJobCategories.verifyValidationError('Required');
    })

    it('Should able to cancel job categories form', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobCategories.navTojobCategoriesPage();
        objJobCategories.openjobCategoriesAddForm();
        objJobCategories.verifyjobCategoriesTitle('Add Job Category')
        objJobCategories.canceljobCategories();
        objJobCategories.verifyjobCategoriesListTitle('Job Categories')
    })

    it('Should able to edit job categories', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobCategories.navTojobCategoriesPage();
        objJobCategories.editjobCategories(data.valid.name.concat(objJobCategories.getRandomName()));
        objJobCategories.verifyjobCategoriesListTitle('Job Categories')
        objJobCategories.verifySuccessMsg('Successfully Saved');
    })

    it('Should able to delete job categories', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobCategories.navTojobCategoriesPage();
        objJobCategories.deletejobCategories();
        objJobCategories.verifySuccessMsg('Successfully Deleted')
    })

    it('Should able to cancel delete confirmation', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objJobCategories.navTojobCategoriesPage();
        objJobCategories.verifyDeleteCancelBtn();
        objJobCategories.verifyjobCategoriesListTitle('Job Categories')
    })

})