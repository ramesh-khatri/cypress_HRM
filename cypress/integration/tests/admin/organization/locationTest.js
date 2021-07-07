/// <reference types="Cypress" />

import locationPage from "../../../pageobjects/admin/organization/locationsPage";

const objLocation = new locationPage();
describe('Admin section organization location test', () => {
    let credential = "";
    let data = "";
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
        cy.fixture('data/common/loginData.json').then(loginData => {
            credential = loginData;
        });
        cy.fixture("data/admin/organization/locations.json").then(locationData => {
            data = locationData;
        })
        cy.wait(2000)
    })

    it('Should able to add location', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.valid.name.concat(objLocation.getRandomName()), data.valid.country, data.valid.state, data.valid.city, data.valid.address, data.valid.zip_code, data.valid.phone, data.valid.fax, data.valid.note)
        objLocation.verifySuccessMsg('Successfully Saved')
    })

    it('Should able to edit location', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.editLocation(data.valid.name.concat(objLocation.getRandomName()), data.valid.country, data.valid.state, data.valid.city, data.valid.address, data.valid.zip_code, data.valid.phone, data.valid.fax, data.valid.note)
        objLocation.verifySuccessMsg('Successfully Updated')
    })

    it('Should able to delete location', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.deleteLocation()
        objLocation.verifySuccessMsg('Successfully Deleted')
    })

    it('Should able to cancel delete confirmation modal', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.verifyDeleteCancelBtn()
        objLocation.verifyLocationListTitle('Location Name')
    })

    it('Should not be able to add duplicate location', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        cy.wait(2000);
        cy.get('tbody > :nth-child(1) > :nth-child(2) > a').invoke('text').then((existingLocation) => {
            objLocation.openLocationAddForm();
            objLocation.addLocation(existingLocation, data.valid.country, data.valid.state, data.valid.city, data.valid.address, data.valid.zip_code, data.valid.phone, data.valid.fax, data.valid.note)
            objLocation.validateErrorMsg('name', 'Already exists')
        })
    })

    it('Should not be able to add location with empty Name field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(" ", data.valid.country, data.valid.state, data.valid.city, data.valid.address, data.valid.zip_code, data.valid.phone, data.valid.fax, data.valid.note)
        objLocation.validateErrorMsg('name', 'Required')
    })

    it('Should not be able to add location with empty Country field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.valid.name.concat(objLocation.getRandomName()), data.invalid.country, data.valid.state, data.valid.city, data.valid.address, data.valid.zip_code, data.valid.phone, data.valid.fax, data.valid.note)
        objLocation.validateErrorMsg('country', 'Required')
    })  
    
    it('Should not be able to add location with more the 100 chars in Name field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.invalid.max_length, data.valid.country, data.valid.state, data.valid.city, data.valid.address, data.valid.zip_code, data.valid.phone, data.valid.fax, data.valid.note)
        objLocation.validateErrorMsg('name', 'Should be less than 100 characters')
    }) 

    it('Should not be able to add location with more the 50 chars in State/Province field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.valid.name.concat(objLocation.getRandomName()), data.valid.country, data.invalid.max_length, data.valid.city, data.valid.address, data.valid.zip_code, data.valid.phone, data.valid.fax, data.valid.note)
        objLocation.validateErrorMsg('state', 'Should be less than 50 characters')
    }) 

    it('Should not be able to add location with more the 50 chars in City field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.valid.name.concat(objLocation.getRandomName()), data.valid.country, data.valid.state, data.invalid.max_length, data.valid.address, data.valid.zip_code, data.valid.phone, data.valid.fax, data.valid.note)
        objLocation.validateErrorMsg('city', 'Should be less than 50 characters')
    }) 

    it('Should not be able to add location with more than 250 chars in Address field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.valid.name.concat(objLocation.getRandomName()), data.valid.country, data.valid.state, data.valid.city, data.invalid.max_length, data.valid.zip_code, data.valid.phone, data.valid.fax, data.valid.note)
        objLocation.validateErrorMsg('address', 'Should be less than 250 characters')
    })

    it('Should not be able to add location with more than 30 chars in Zip/Postal Code field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.valid.name.concat(objLocation.getRandomName()), data.valid.country, data.valid.state, data.valid.city, data.valid.address, data.invalid.max_length, data.valid.phone, data.valid.fax, data.valid.note)
        objLocation.validateErrorMsg('zip', 'Should be less than 30 characters')
    })

    it('Should not be able to add location with more than 30 chars in Phone field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.valid.name.concat(objLocation.getRandomName()), data.valid.country, data.valid.state, data.valid.city, data.valid.address, data.valid.zip_code, data.invalid.max_length, data.valid.fax, data.valid.note)
        objLocation.validateErrorMsg('phone', 'Should be less than 30 characters')
    })

    it('Should not be able to add location with invalid char in Phone field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.valid.name.concat(objLocation.getRandomName()), data.valid.country, data.valid.state, data.valid.city, data.valid.address, data.valid.zip_code, data.invalid.phone, data.valid.fax, data.valid.note)
        objLocation.validateErrorMsg('phone', 'Allows numbers and only + - / ( )')
    })


    it('Should not be able to add location with more than 30 chars in Fax field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.valid.name.concat(objLocation.getRandomName()), data.valid.country, data.valid.state, data.valid.city, data.valid.address, data.valid.zip_code, data.valid.phone, data.invalid.max_length, data.valid.note)
        objLocation.validateErrorMsg('fax', 'Should be less than 30 characters')
    })

    it('Should not be able to add location with invalid char in Fax field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.valid.name.concat(objLocation.getRandomName()), data.valid.country, data.valid.state, data.valid.city, data.valid.address, data.valid.zip_code, data.valid.phone, data.invalid.fax, data.valid.note)
        objLocation.validateErrorMsg('fax', 'Allows numbers and only + - / ( )')
    })

    it('Should not be able to add location with more than 250 chars in Notes field', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.addLocation(data.valid.name.concat(objLocation.getRandomName()), data.valid.country, data.valid.state, data.valid.city, data.valid.address, data.valid.zip_code, data.valid.phone, data.valid.fax, data.invalid.max_length)
        objLocation.validateErrorMsg('note', 'Should be less than 250 characters')
    })

    it('Should able to cancel the location form', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.openLocationAddForm()
        objLocation.cancelLocationForm()
        cy.url().should('eq', Cypress.env('devUrl')+'index.php/admin/viewLocations?locationId=');
    })

    it('Should able to search location using Location Name', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.searchLocationUsingName(data.valid.name)
        objLocation.verifySearchData('location', data.valid.name)
    })

    it('Should able to search location using City Name', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.searchLocationUsingCity(data.valid.city)
        objLocation.verifySearchData('city', data.valid.city)
    })

    it('Should able to search location using Country Name', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.searchLocationUsingCountry(data.valid.country)
        objLocation.verifySearchData('country', data.valid.country)
    })

    it('Should able to Reset search fields', () => {
        cy.doLogin(credential.valid.username, credential.valid.password)
        objLocation.navToLocationPage()
        objLocation.addDataInSearchField(data.valid.name, data.valid.city, data.valid.country)
        objLocation.verifySearchFieldIsEmpty()
    })

})