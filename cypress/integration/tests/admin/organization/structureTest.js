/// <reference types="Cypress" />

import structurePage from "../../../pageobjects/admin/organization/structurePage";

const objStructure = new structurePage();
describe('Admin section organization structure test', () => {
    let credential = "";
    let data = "";
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
        cy.fixture('data/common/loginData.json').then(loginData => {
            credential = loginData;
        });
        cy.fixture('data/admin/organization/structure.json').then(structureData => {
            data = structureData;
        })
        cy.wait(2000)
    })

    it('Should able to Add Unit in organization', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objStructure.navToStructurePage()
        objStructure.openAddUnitForm()
        objStructure.addUnit(data.valid.unit_id, data.valid.name.concat(objStructure.getRandomName()), data.valid.description)
        objStructure.verifySuccessMsg('Successfully Saved')       
    })

    it('Should able to Edit Unit', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objStructure.navToStructurePage() 
        objStructure.editUnit(data.valid.unit_id, data.valid.name.concat(objStructure.getRandomName()), data.valid.description)
        objStructure.verifySuccessMsg('Successfully Saved')      
    })

    it('Should not be able to delete Unit', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objStructure.navToStructurePage() 
        objStructure.deleteUnit()
        objStructure.verifySuccessMsg('Successfully Deleted')    
    })


    it('Should able to Add Unit with only Name field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objStructure.navToStructurePage()
        objStructure.openAddUnitForm()
        objStructure.addUnit(" ", data.valid.name.concat(objStructure.getRandomName()), " ")
        objStructure.verifySuccessMsg('Successfully Saved')       
    })

    it('Should not be able to add duplicate Unit', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objStructure.navToStructurePage() 
        var duplicateData = data.valid.name.concat(objStructure.getRandomName())
        objStructure.verifyDuplicateUnit(data.valid.unit_id, duplicateData, data.valid.description)
        objStructure.verifySuccessMsg('Name Already Exists')    
    })

    it('Should not be able to add unit with more than 100 chars in Unit Id', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objStructure.navToStructurePage()
        objStructure.openAddUnitForm()
        objStructure.addUnit(data.invalid.max_length, data.valid.name.concat(objStructure.getRandomName()), data.valid.description)
        objStructure.validateErrorMsg('unit', 'Should be less than 100 characters')      
    })

    it('Should not be able to add unit with more than 100 chars in Name field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objStructure.navToStructurePage()
        objStructure.openAddUnitForm()
        objStructure.addUnit(data.valid.unit_id, data.invalid.max_length, data.valid.description)
        objStructure.validateErrorMsg('name', 'Should be less than 100 characters')      
    })

    it('Should not be able to add unit with blank Name field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objStructure.navToStructurePage()
        objStructure.openAddUnitForm()
        objStructure.addUnit(data.valid.unit_id," ", data.valid.description)
        objStructure.validateErrorMsg('name', 'Required')      
    })

    it('Should not be able to add unit with more than 400 chars in Description field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objStructure.navToStructurePage()
        objStructure.openAddUnitForm()
        objStructure.addUnit(data.valid.unit_id, data.valid.name.concat(objStructure.getRandomName()), data.invalid.max_length)
        objStructure.validateErrorMsg('description', 'Should be less than 400 characters')      
    })

    it('Should able to cancel the add form', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objStructure.navToStructurePage()
        objStructure.openAddUnitForm()
        objStructure.cancelUnitForm()
        objStructure.verifyMainTitle('Organization Structure')  
    })

})