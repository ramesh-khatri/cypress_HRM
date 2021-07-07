/*Selectors*/
let adminLink = "#menu_admin_viewAdminModule"
let jobLink = "#menu_admin_Job"
let payGradeLink = "#menu_admin_viewPayGrades"
let addPayGradeBtn = "#btnAdd"
let deletePayGrade = "#btnDelete"
let secondPayGradeLink = "tbody > :nth-child(2) > :nth-child(2) > a"
let firstPayGradeLink = "tbody > :nth-child(1) > :nth-child(2)"
let nameField = "#payGrade_name"
let saveBtn = "#btnSave"
let cancelBtn = "#btnCancel"
let requiredError = "span.validation-error"
let successMsg = ".message"
let addCurrencyBtn = "#btnAddCurrency"
let currencyField = "#payGradeCurrency_currencyName"
let minSalaryField = "#payGradeCurrency_minSalary"
let maxSalaryField = "#payGradeCurrency_maxSalary"
let saveCurrencyBtn = "#btnSaveCurrency"
let cancelCurrencyBtn = "#cancelButton"
let salaryMinMaxValidation = ":nth-child(3) > span.validation-error"
let negativeSalaryVaidation = ":nth-child(2) > span.validation-error"
let invalidCurrency = ":nth-child(1) > span.validation-error"
let firstCurrencyLink = ".editLink"
let currencyFormHeading = "#currencyListHeading"
let deleteDailogOk = "#dialogDeleteBtn"
let deleteDailogCancel = "#deleteConfModal > .modal-footer > .reset"
let payGradeTitle = "h1"


class payGradePage {
    constructor() {
    };

    navToPayGradePage() {
        cy.get(adminLink).click({force: true});
        cy.get(jobLink, {timeout : 5000}).click({force: true});
        cy.get(payGradeLink).click({force: true});
    }

    openPayGradeAddForm() {
        cy.wait(2000);
        cy.get(addPayGradeBtn).click({force : true});
    }

    addPayGrade(name){
        cy.get(nameField, {timeout : 5000}).type(name);
        cy.get(saveBtn).click({force: true});
    }

    editPayGrade(name){
        cy.get(secondPayGradeLink).click({force : true});
        cy.wait(2000);
        cy.get(saveBtn).click({force: true});
        cy.get(nameField).click({force : true}).type(name);
        cy.get(saveBtn).click({force: true});
    }

    deletePayGrade(){
        cy.wait(1000);
        cy.get(firstPayGradeLink).prev().click();
        cy.get(deletePayGrade).click();
        cy.wait(1000);
        cy.get(deleteDailogOk).click({force : true});
    }

    verifyDeleteCancelBtn(){
        cy.get(firstPayGradeLink).prev().click();
        cy.get(deletePayGrade).click();
        cy.get(deleteDailogCancel).click();
    }

    verifySuccessMsg(message){
        cy.get(successMsg).contains(message);
    }

    cancelPayGrade(){
        cy.wait(2000)
        cy.get(cancelBtn).click({force : true});
    }

    assignCurrency(currency, min_salary, max_salary) {
        cy.wait(2000);
        cy.get(addCurrencyBtn).click({force : true});
        cy.get(currencyField).type(currency);
        cy.get(minSalaryField).type(min_salary);
        cy.get(maxSalaryField).type(max_salary);
        cy.get(saveCurrencyBtn).click({force : true});
    }

    editCurrency(currency, min_salary, max_salary) {
        cy.get(secondPayGradeLink).click({force : true});
        cy.wait(2000)
        cy.get(firstCurrencyLink).click({force : true});
        cy.wait(1000);
        cy.get(currencyField).clear({force : true}).type(currency);
        cy.get(minSalaryField).clear({force : true}).type(min_salary);
        cy.get(maxSalaryField).clear({force : true}).type(max_salary);
        cy.get(saveCurrencyBtn).click({force : true});
    }

    cancelCurrency(){
        cy.wait(2000);
        cy.get(addCurrencyBtn).click({force : true});
        cy.get(cancelCurrencyBtn).click({force : true});
    }

    getRandomName() {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = 0; i < 5; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return "G"+result.toString();
    }

    verifyValidationError(message){
        cy.get(requiredError).contains(message);
    }

    verifyCurrencyValidation(message){
        cy.get(invalidCurrency).contains(message);
    }

    verifyNegativeSalary(message){
        cy.get(negativeSalaryVaidation).contains(message);
    }

    verifySalaryAmount(message){
        cy.get(salaryMinMaxValidation).contains(message);
    }

    verifyCurrencyFormClose(headText){
        cy.get(currencyFormHeading, {timeout : 5000}).invoke('text').then(headline=> {
            expect(headline).to.equal(headText)
        })
    }

    verifyDeleteFormClose(headText){
        cy.get(payGradeTitle, {timeout : 5000}).invoke('text').then(headline=> {
            expect(headline).to.equal(headText)
        })
    }
    
}
export default payGradePage;














