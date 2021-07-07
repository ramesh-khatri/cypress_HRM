/*Selectors*/
let adminLink = "#menu_admin_viewAdminModule"
let jobLink = "#menu_admin_Job"
let employmentStatusLink = "#menu_admin_employmentStatus"
let addEmploymentBtn = "#btnAdd"
let nameField = "#empStatus_name"
let saveBtn = "#btnSave"
let cancelBtn = "#btnCancel"
let successMsg = ".message"
let requiredError = "span.validation-error"
let deleteDailogOk = "#dialogDeleteBtn"
let deleteDailogCancel = "#deleteConfModal > .modal-footer > .reset"
let employmentStatusTitle = "#empStatusHeading"
let employmentStatusListTitle = "#search-results > .head > h1"
let firstEmploymentStatusBody = ":nth-child(1) > .left"
let firstEmploymentStatus = ':nth-child(1) > .left > a'
let deleteEmploymentStatusBtn = "#btnDelete"

class emplymentStatusPage {
    constructor() {
    };

    navToEmploymentStatusPage() {
        cy.get(adminLink).click({force: true});
        cy.get(jobLink, {timeout : 5000}).click({force: true});
        cy.get(employmentStatusLink).click({force: true});
    }

    openEmploymentStatusAddForm() {
        cy.wait(2000);
        cy.get(addEmploymentBtn).click({force : true});
    }

    addEmploymentStatus(name){
        cy.get(nameField, {timeout : 5000}).type(name);
        cy.get(saveBtn).click({force: true});
    }

    editEmploymentStatus(name){
        cy.wait(1000);
        cy.get(firstEmploymentStatus).click({force : true});
        cy.get(nameField).clear().click({force : true}).type(name);
        cy.get(saveBtn).click({force: true});
    }

    deleteEmploymentStatus(){
        cy.wait(1000);
        cy.get(firstEmploymentStatusBody).prev().click();
        cy.get(deleteEmploymentStatusBtn).click();
        cy.wait(1000);
        cy.get(deleteDailogOk).click({force : true});
    }

    verifyDeleteCancelBtn(){
        cy.get(firstEmploymentStatusBody).prev().click();
        cy.get(deleteEmploymentStatusBtn).click();
        cy.get(deleteDailogCancel).click();
    }

    verifySuccessMsg(message){
        cy.get(successMsg).contains(message);
    }

    cancelEmploymentStatus(){
        cy.wait(2000)
        cy.get(cancelBtn).click({force : true});
    }

    getRandomName() {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = 0; i < 5; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return "E"+result.toString();
    }

    verifyValidationError(message){
        cy.get(requiredError).contains(message);
    }

    verifyEmploymentStatusTitle(headText){
        cy.get(employmentStatusTitle, {timeout : 5000}).invoke('text').then(headline=> {
            expect(headline).to.equal(headText)
        })
    }

    verifyEmploymentStatusListTitle(headText){
        cy.get(employmentStatusListTitle, {timeout : 5000}).invoke('text').then(headline=> {
            expect(headline).to.equal(headText)
        })
    }
}
export default emplymentStatusPage;