/*Selectors*/
let adminLink = "#menu_admin_viewAdminModule"
let jobLink = "#menu_admin_Job"
let jobTitlesLink = "#menu_admin_viewJobTitleList"
let addJobLink = "#btnAdd"
let jobTitleField = "#jobTitle_jobTitle"
let jobDescriptionField = "#jobTitle_jobDescription"
let jobSpecificationBtn = "#jobTitle_jobSpec"
let noteField = "#jobTitle_note"
let saveBtn = "#btnSave"
let cancelBtn = "#btnCancel"
let successMsg = ".message"
let validationTitleError = ".validation-error"
let maxNoteError = "span.validation-error"
let firstTitle = "tbody > :nth-child(1) > :nth-child(2) > a"
let checkJobTitle = "tbody > :nth-child(2) > :nth-child(2)"
let replaceJobSpecification = "#jobTitle_jobSpecUpdate_3"
let deleteBtn = "#btnDelete"
let deleteOkBtn = "#dialogDeleteBtn"
let deleteCancelBtn = "#deleteConfModal > .modal-footer > .reset"
let headingText = "h1"
let checkFirstJobTitle = "#ohrmList_chkSelectRecord_3"
let tableBody = "table> tbody> tr> td:nth-child(2)"
let jobTitleSortFirst = ":nth-child(2) > .null"
let jobTitleHeadUp = ".ASC"

class jobPage {
    constructor() {
    };

    navtoJobPage() {
        cy.get(adminLink).click({force: true});
        cy.get(jobLink).click({force: true});
        cy.get(jobTitlesLink).click({force: true});
    }

    navtoJobAddPage() {
        cy.get(addJobLink).click({force: true});
    }

    jobTitleFormWithAllData(jobTitle, jobDescription, jobSpecification, note) {
        cy.get(jobTitleField).type(jobTitle);
        cy.get(jobDescriptionField).type(jobDescription);
        cy.get(jobSpecificationBtn).attachFile(jobSpecification);
        cy.get(noteField).type(note);
        cy.get(saveBtn).click({force: true})
    }

    jobTitleFormWithoutJobSpecification(jobTitle, jobDescription, note) {
        cy.get(jobTitleField).type(jobTitle);
        cy.get(jobDescriptionField).type(jobDescription);
        cy.get(noteField).type(note);
        cy.get(saveBtn).click({force: true})
    }

    getRandomName() {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = 0; i < 5; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return "R"+result.toString();
    }

    verifySuccessMsg(message) {
        cy.get(successMsg).contains(message)
    }

    verifyValidationMsg(validationField, message) {
        if(validationField == "jobtitle") {
            cy.get(validationTitleError).contains(message)
        }
        else if(validationField == "note") {
            cy.get(maxNoteError).contains(message)
        }
        else if(validationField == "jobspecification") {
            cy.get(successMsg).contains(message)
        }
        else if(validationField == "existingJobTitleError") {
            cy.get(maxNoteError).contains(message)
        }

    }

    verifyCancelBtn() {
        cy.get(cancelBtn).click({force : true})
    }

    verifyJobTitleEdit(jobTitle, jobDescription, jobSpecification, note){
        cy.get(firstTitle).click({force : true});
        cy.wait(2000)
        cy.get(saveBtn).click({force : true});
        cy.get(jobTitleField).clear({force : true }).click({force : true}).type(jobTitle);
        cy.get(jobDescriptionField).clear({force : true}).type(jobDescription);
        cy.get("body").then($body => {
            if($body.find(replaceJobSpecification).length > 0) { //return true if replace button exist
                cy.get(replaceJobSpecification).click({force : true});
            }
            else if($body.find(jobSpecificationBtn).length > 0){
                cy.get(jobSpecificationBtn).attachFile(jobSpecification);
            }
        });
        cy.get(noteField).clear({force: true}).type(note);
        cy.get(saveBtn).click({force: true});
    }

    verifyDeleteButton(){
        cy.get(checkJobTitle).prev().click();
        cy.get(deleteBtn).click({force : true});
        cy.get(deleteOkBtn, {timeout:5000}).click({force : true});
    }

    verifyDeleteCancelButton(){
        cy.get(checkFirstJobTitle).click({force : true});
        cy.get(deleteBtn).click({force : true});
        cy.get(deleteCancelBtn, {timeout : 5000}).click({force : true})
    }

    verifyModalClose(headText){
        cy.wait(1000)
        cy.get(headingText, {timeout : 5000}).invoke('text').then(headline=> {
            expect(headline).to.equal(headText)
        })
    }

    getTableDataBeforeSorting() {
        let myArray = []
        cy.get(tableBody).each(($el, $index) => {
            let mydata = $el.text()
            myArray.push(mydata.trim())  
        })
        cy.writeFile('cypress/fixtures/files/tempBefore.txt', myArray)        
    }

    getTableDataAfterSorting() {
        cy.get(jobTitleSortFirst).click({force: true})
        cy.get(jobTitleHeadUp).click({force: true})
        let mySortedArray = []
        cy.get(tableBody).each(($el, $index) => {
            let text = $el.text()
            mySortedArray.unshift(text.trim())
        })
        cy.writeFile('cypress/fixtures/files/tempAfter.txt', mySortedArray)
    }

}
export default jobPage;
