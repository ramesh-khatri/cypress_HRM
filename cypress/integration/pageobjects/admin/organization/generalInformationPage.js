/*Selectors*/
let adminLink = "#menu_admin_viewAdminModule"
let orgLink = "#menu_admin_Organization"
let generalInfoLink = "#menu_admin_viewOrganizationGeneralInformation"
let orgNameField = "#organization_name"
let phoneField = "#organization_phone"
let emailField = "#organization_email"
let addressOneField = "#organization_street1"
let cityField = "#organization_city"
let zipCodeField = "#organization_zipCode"
let noteField = "#organization_note"
let taxField = "#organization_taxId"
let regNumField = "#organization_registraionNumber"
let faxField = "#organization_fax"
let addressTwoField = "#organization_street2"
let stateField = "#organization_province"
let countryField = "#organization_country"
let editBtn = "#btnSaveGenInfo"
let successMsg = ".message"
let requiredError = "span.validation-error"
let phoneValidationError = ":nth-child(2) > :nth-child(1) > span.validation-error"
let emailValidationError = ":nth-child(3) > span.validation-error"
let faxValidationError = ":nth-child(2) > span.validation-error"

class generalInformationPage {
    constructor() {
    };

    navToGeneralInformationPage() {
        cy.get(adminLink).click({force: true});
        cy.get(orgLink, {timeout : 5000}).click({force: true});
        cy.get(generalInfoLink).click({force: true});
    }

    editGeneralInformation(name, phone, email, address_one, city, zip_code, note, tax_id, reg_no, fax, address_two, state, country) {
        cy.wait(1000);
        cy.get(editBtn).click({force: true});
        cy.get(orgNameField).clear().click().type(name);
        cy.get(phoneField).clear().click().type(phone);
        cy.get(emailField).clear().click().type(email);
        cy.get(addressOneField).clear().click().type(address_one);
        cy.get(cityField).clear().click().type(city);
        cy.get(zipCodeField).clear().click().type(zip_code);
        cy.get(noteField).clear().click().type(note);
        cy.get(taxField).clear().click().type(tax_id);
        cy.get(regNumField).clear().click().type(reg_no);
        cy.get(faxField).clear().click().type(fax);
        cy.get(addressTwoField).clear().click().type(address_two);
        cy.get(stateField).clear().click().type(state);
        cy.get(countryField).select(country);
        cy.get(editBtn).click({force: true})

    }

    verifySuccessMsg(message){
        cy.get(successMsg).contains(message);
    }

    validateErrorMsg(validationField, message){
        if(validationField == "name"){
            cy.get(requiredError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField == "phone"){
            cy.get(phoneValidationError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField=="email"){
            cy.get(emailValidationError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField=="fax"){
            cy.get(faxValidationError).then(error=>{
                expect(error).to.contain(message);
            })
        }
    }

}
export default generalInformationPage;