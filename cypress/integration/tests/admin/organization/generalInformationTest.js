/// <reference types="Cypress" />

import generalInformationPage from "../../../pageobjects/admin/organization/generalInformationPage";

const objGeneralInfo = new generalInformationPage();
describe('Admin section organization general information test', () => {
    let credential = "";
    let data = "";
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
        cy.fixture('data/common/loginData.json').then(loginData => {
            credential = loginData;
        });
        cy.fixture("data/admin/organization/generalInformation.json").then(generalData => {
            data = generalData;
        })
        cy.wait(2000)
    })

    it('Should able to edit organization general information', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objGeneralInfo.navToGeneralInformationPage();
        objGeneralInfo.editGeneralInformation(data.valid.org_name, data.valid.phone, data.valid.email, data.valid.address_one, data.valid.city, data.valid.zip_code, data.valid.note, data.valid.tax_id, data.valid.registration_no, data.valid.fax, data.valid.address_two, data.valid.state, data.valid.country)
        objGeneralInfo.verifySuccessMsg('Successfully Saved')
    })

    it('Should not be able to save general information with empty organization name', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objGeneralInfo.navToGeneralInformationPage();
        objGeneralInfo.editGeneralInformation(" ", data.valid.phone, data.valid.email, data.valid.address_one, data.valid.city, data.valid.zip_code, data.valid.note, data.valid.tax_id, data.valid.registration_no, data.valid.fax, data.valid.address_two, data.valid.state, data.valid.country)
        objGeneralInfo.validateErrorMsg('name', 'Required')
    })

    it('Should not be able to save general information with invalid phone number', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objGeneralInfo.navToGeneralInformationPage();
        objGeneralInfo.editGeneralInformation(data.valid.org_name, data.invalid.phone, data.valid.email, data.valid.address_one, data.valid.city, data.valid.zip_code, data.valid.note, data.valid.tax_id, data.valid.registration_no, data.valid.fax, data.valid.address_two, data.valid.state, data.valid.country)
        objGeneralInfo.validateErrorMsg('phone', 'Allows numbers and only + - / ( )')
    })

    it('Should not be able to save general information with invalid email', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objGeneralInfo.navToGeneralInformationPage();
        objGeneralInfo.editGeneralInformation(data.valid.org_name, data.valid.phone, data.invalid.email, data.valid.address_one, data.valid.city, data.valid.zip_code, data.valid.note, data.valid.tax_id, data.valid.registration_no, data.valid.fax, data.valid.address_two, data.valid.state, data.valid.country)
        objGeneralInfo.validateErrorMsg('email', 'Expected format: admin@example.com')
    })

    it('Should not be able to save general information with invalid fax', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objGeneralInfo.navToGeneralInformationPage();
        objGeneralInfo.editGeneralInformation(data.valid.org_name, data.valid.phone, data.valid.email, data.valid.address_one, data.valid.city, data.valid.zip_code, data.valid.note, data.valid.tax_id, data.valid.registration_no, data.invalid.fax, data.valid.address_two, data.valid.state, data.valid.country)
        objGeneralInfo.validateErrorMsg('fax', 'Allows numbers and only + - / ( )')
    })

})