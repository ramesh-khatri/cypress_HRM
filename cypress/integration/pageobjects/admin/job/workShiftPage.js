/*Selectors*/
let adminLink = "#menu_admin_viewAdminModule"
let jobLink = "#menu_admin_Job"
let workShiftLink = "#menu_admin_workShift"
let addWorkShiftBtn = "#btnAdd"
let nameField = "#workShift_name"
let fromField = "#workShift_workHours_from"
let toField = "#workShift_workHours_to"
let workShitAvailableEmployee = "#workShift_availableEmp"
let assignedEmployeeList = "#workShift_assignedEmp"
let assignEmployeeLink = "#btnAssignEmployee"
let removeEmployeeLink = "#btnRemoveEmployee"
let saveBtn = "#btnSave"
let cancelBtn = "#btnCancel"
let successMsg = ".message"
let requiredError = "span.validation-error"
let deleteDailogOk = "#dialogDeleteBtn"
let deleteDailogCancel = "#deleteConfModal > .modal-footer > .reset"
let workShiftAddTitle = "#workShiftHeading"
let workShiftListTitle = "#search-results > .head > h1"
let firstWorkShift = "tbody > :nth-child(1) > :nth-child(2) > a"
let firstWorkShiftBody = "#resultTable > tbody > :nth-child(1) > :nth-child(2)"
let deleteWorkShiftBtn = "#btnDelete"

class workShiftPage {
    constructor() {
    };

    navToWorkShiftPage() {
        cy.get(adminLink).click({force: true});
        cy.get(jobLink, {timeout : 5000}).click({force: true});
        cy.get(workShiftLink).click({force: true});
    }

    openWorkShiftAddForm() {
        cy.wait(2000);
        cy.get(addWorkShiftBtn).click({force : true});
    }

    addWorkShiftWithoutEmployee(name, from, to){
        cy.get(nameField, {timeout : 5000}).type(name);
        cy.get(fromField).select(from);
        cy.get(toField).select(to);
        cy.get(saveBtn).click({force: true});
    }

    addWorkShiftWithEmployee(name, from, to, nameVal1){
        cy.get(nameField, {timeout : 5000}).type('A'+name);
        cy.get(fromField).select(from);
        cy.get(toField).select(to);
        cy.get(workShitAvailableEmployee).select(nameVal1);
        cy.get(assignEmployeeLink).click();
        cy.get(assignedEmployeeList).select(nameVal1);
        cy.get(removeEmployeeLink).click();
        cy.get(saveBtn).click({force: true});
    }

    addWorkShiftWithEmptyTime(name){
        cy.get(nameField, {timeout : 5000}).type(name);
        cy.get(fromField).select('');
        cy.get(toField).select('');
        cy.get(saveBtn).click({force: true});
    }

    editWorkShift(name, from, to){
        cy.wait(2000)
        cy.get(firstWorkShift).click({force : true});
        cy.get(nameField).clear().click({force : true}).type(name);
        cy.get(fromField).select(from);
        cy.get(toField).select(to);
        cy.get(saveBtn).click({force: true});
    }

    deleteWorkShift(){
        cy.wait(1000);
        cy.get(firstWorkShiftBody).prev().click();
        cy.get(deleteWorkShiftBtn).click();
        cy.wait(1000);
        cy.get(deleteDailogOk).click({force : true});
    }

    verifyDeleteCancelBtn(){
        cy.get(firstWorkShiftBody).prev().click();
        cy.get(deleteWorkShiftBtn).click();
        cy.get(deleteDailogCancel).click();
    }

    verifySuccessMsg(message){
        cy.get(successMsg).contains(message);
    }

    cancelWorkShift(){
        cy.wait(2000)
        cy.get(cancelBtn).click({force : true});
    }

    getRandomName() {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = 0; i < 5; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return "W"+result.toString();
    }

    verifyValidationError(message){
        cy.get(requiredError).contains(message);
    }

    verifyWorkShiftAddTitle(headText){
        cy.get(workShiftAddTitle, {timeout : 5000}).invoke('text').then(headline=> {
            expect(headline).to.equal(headText)
        })
    }

    verifyWorkShiftListTitle(headText){
        cy.get(workShiftListTitle, {timeout : 5000}).invoke('text').then(headline=> {
            expect(headline).to.equal(headText)
        })
    }
}
export default workShiftPage;