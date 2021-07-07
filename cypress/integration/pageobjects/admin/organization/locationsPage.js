/*Selectors*/
let adminLink = "#menu_admin_viewAdminModule"
let orgLink = "#menu_admin_Organization"
let locationLink = "#menu_admin_viewLocations"
let addLocationBtn = "#btnAdd"
let nameField = "#location_name"
let countryField = "#location_country"
let stateField = "#location_province"
let cityField = "#location_city"
let addressField = "#location_address"
let zipField = "#location_zipCode"
let phoneField = "#location_phone"
let faxField = "#location_fax"
let noteField = "#location_notes"
let saveBtn = "#btnSave"
let cancelBtn = "#btnCancel"
let successMsg = ".message"
let nameError = ":nth-child(1) > span.validation-error"
let countryError = ":nth-child(2) > span.validation-error"
let stateError = "#location_province_li > span.validation-error"
let cityError = ":nth-child(5) > span.validation-error"
let addressError = ":nth-child(6) > span.validation-error"
let zipError = ":nth-child(7) > span.validation-error"
let phoneError = ":nth-child(8) > span.validation-error"
let faxError = ":nth-child(9) > span.validation-error"
let noteError = ":nth-child(10) > span.validation-error"
let deleteDailogOk = "#dialogDeleteBtn"
let deleteDailogCancel = "#deleteConfModal > .modal-footer > .reset"
let addLocationTitle = "#locationHeading"
let locationListSubTitle = ":nth-child(1) > label"
let deleteLocationBtn = "#btnDelete"
let firstLocationName = "tbody > :nth-child(1) > :nth-child(2) > a"
let firstLocationBody = "tbody > :nth-child(1) > :nth-child(2)"
let searchLocationNameField = "#searchLocation_name"
let searchCityField = "#searchLocation_city"
let searchCountryField = "#searchLocation_country"
let searchBtn = "#btnSearch"
let resetBtn = "#btnReset"
let firstCityData = ".odd > :nth-child(3)"
let firstCountryData = ".odd > :nth-child(4)"

class locationPage {
    constructor() {
    };

    navToLocationPage() {
        cy.get(adminLink).click({force: true})
        cy.get(orgLink, {timeout : 5000}).click({force: true})
        cy.get(locationLink).click({force: true})
    }

    openLocationAddForm() {
        cy.wait(2000)
        cy.get(addLocationBtn).click({force : true})
    }

    addLocation(name, country, state, city, address, zip, phone, fax, note) {
        cy.get(nameField).type(name)
        cy.get(countryField).select(country)
        cy.get(stateField).type(state)
        cy.get(cityField).type(city)
        cy.get(addressField).type(address)
        cy.get(zipField).type(zip)
        cy.get(phoneField).type(phone)
        cy.get(faxField).type(fax)
        cy.get(noteField).type(note)
        cy.get(saveBtn).click()
    }

    editLocation(name, country, state, city, address, zip, phone, fax, note) {
        cy.wait(1000)
        cy.get(firstLocationName).click({force : true})
        cy.wait(1000)
        cy.get(saveBtn).click({force: true})
        cy.get(nameField).clear().type(name)
        cy.get(countryField).select(country)
        cy.get(stateField).clear().type(state)
        cy.get(cityField).clear().type(city)
        cy.get(addressField).clear().type(address)
        cy.get(zipField).clear().type(zip)
        cy.get(phoneField).clear().type(phone)
        cy.get(faxField).clear().type(fax)
        cy.get(noteField).clear().type(note)
        cy.get(saveBtn).click()
    }

    deleteLocation(){
        cy.wait(1000)
        cy.get(firstLocationBody).prev().click()
        cy.get(deleteLocationBtn).click()
        cy.wait(1000)
        cy.get(deleteDailogOk).click({force : true})
    }

    searchLocationUsingName(name) {
        cy.get(searchLocationNameField).type(name)
        cy.get(searchBtn).click()
    }

    searchLocationUsingCity(city) {
        cy.get(searchCityField).type(city)
        cy.get(searchBtn).click()
    }

    searchLocationUsingCountry(country) {
        cy.get(searchCountryField).select(country)
        cy.get(searchBtn).click()
    }

    verifySearchData(search_field, data){
        if(search_field == 'location'){
            cy.get(firstLocationName).invoke('text').then((locationName) => {
                expect(locationName).to.have.string(data)
            })
        }
        else if(search_field == 'city'){
            cy.get(firstCityData).invoke('text').then((cityName) => {
                expect(cityName).to.have.string(data)
            })
        }
        else if(search_field == 'country'){
            cy.get(firstCountryData).invoke('text').then((countryName) => {
                expect(countryName).to.have.string(data)
            })
        }
    }

    addDataInSearchField(location, city, country){
        cy.get(searchLocationNameField).type(location)
        cy.get(searchCityField).type(city)
        cy.get(searchCountryField).select(country)
        cy.get(resetBtn).click({force: true})
    }

    verifySearchFieldIsEmpty(){
        cy.get(searchLocationNameField).invoke('text').then((location) => {
            expect(location).to.have.string("")
        })
        cy.get(searchCityField).invoke('text').then((city) => {
            expect(city).to.have.string("")
        })
        cy.get(searchCountryField).contains('-- Select --')
    }

    verifyDeleteCancelBtn(){
        cy.get(firstLocationBody).prev().click();
        cy.get(deleteLocationBtn).click();
        cy.wait(1000)
        cy.get(deleteDailogCancel).click();
    }

    verifySuccessMsg(message){
        cy.get(successMsg).contains(message);
    }

    cancelLocationForm(){
        cy.wait(2000)
        cy.get(cancelBtn).click({force : true});
    }

    validateErrorMsg(validationField, message){
        if(validationField == "name"){
            cy.get(nameError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField == "country"){
            cy.get(countryError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField=="state"){
            cy.get(stateError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField=="city"){
            cy.get(cityError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField=="address"){
            cy.get(addressError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField=="zip"){
            cy.get(zipError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField=="phone"){
            cy.get(phoneError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField=="fax"){
            cy.get(faxError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField=="note"){
            cy.get(noteError).then(error=>{
                expect(error).to.contain(message);
            })
        }
    }
    getRandomName() {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = 0; i < 5; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return "L"+result.toString();
    }

    verifyLocationListTitle(headText){
        cy.get(locationListSubTitle, {timeout : 5000}).invoke('text').then(headline=> {
            expect(headline).to.equal(headText)
        })
    }
}
export default locationPage;
