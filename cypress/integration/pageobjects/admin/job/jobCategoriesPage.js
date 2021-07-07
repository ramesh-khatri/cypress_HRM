/*Selectors*/
let adminLink = "#menu_admin_viewAdminModule"
let jobLink = "#menu_admin_Job"
let jobCategoriesLink = "#menu_admin_jobCategory"
let addJobCategoryBtn = "#btnAdd"
let nameField = "#jobCategory_name"
let saveBtn = "#btnSave"
let cancelBtn = "#btnCancel"
let successMsg = ".message"
let requiredError = "span.validation-error"
let deleteDailogOk = "#dialogDeleteBtn"
let deleteDailogCancel = "#deleteConfModal > .modal-footer > .reset"
let jobCategoriesTitle = "#jobCategoryHeading"
let jobCategoriesListTitle = "#search-results > .head > h1"
let firstjobCategories = ":nth-child(1) > .left > a"
let firstjobCategoriesBody = ":nth-child(1) > .left"
let deletejobCategoriesBtn = "#btnDelete"

class emplymentStatusPage {
    constructor() {
    };

    navTojobCategoriesPage() {
        cy.get(adminLink).click({force: true});
        cy.get(jobLink, {timeout : 5000}).click({force: true});
        cy.get(jobCategoriesLink).click({force: true});
    }

    openjobCategoriesAddForm() {
        cy.wait(2000);
        cy.get(addJobCategoryBtn).click({force : true});
    }

    addjobCategories(name){
        cy.get(nameField, {timeout : 5000}).type(name);
        cy.get(saveBtn).click({force: true});
    }

    editjobCategories(name){
        cy.wait(1000)
        cy.get(firstjobCategories).click({force : true});
        cy.get(nameField).clear().click({force : true}).type(name);
        cy.get(saveBtn).click({force: true});
    }

    deletejobCategories(){
        cy.wait(1000);
        cy.get(firstjobCategoriesBody).prev().click();
        cy.get(deletejobCategoriesBtn).click();
        cy.wait(1000);
        cy.get(deleteDailogOk).click({force : true});
    }

    verifyDeleteCancelBtn(){
        cy.get(firstjobCategoriesBody).prev().click();
        cy.get(deletejobCategoriesBtn).click();
        cy.get(deleteDailogCancel).click();
    }

    verifySuccessMsg(message){
        cy.get(successMsg).contains(message);
    }

    canceljobCategories(){
        cy.wait(2000)
        cy.get(cancelBtn).click({force : true});
    }

    getRandomName() {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = 0; i < 5; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return "J"+result.toString();
    }

    verifyValidationError(message){
        cy.get(requiredError).contains(message);
    }

    verifyjobCategoriesTitle(headText){
        cy.get(jobCategoriesTitle, {timeout : 5000}).invoke('text').then(headline=> {
            expect(headline).to.equal(headText)
        })
    }

    verifyjobCategoriesListTitle(headText){
        cy.get(jobCategoriesListTitle, {timeout : 5000}).invoke('text').then(headline=> {
            expect(headline).to.equal(headText)
        })
    }
}
export default emplymentStatusPage;