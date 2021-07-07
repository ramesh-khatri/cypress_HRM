/*Selectors*/
let adminLink = "#menu_admin_viewAdminModule"
let orgLink = "#menu_admin_Organization"
let structurteLink = "#menu_admin_viewCompanyStructure"
let editBtn = "#btnEdit"
let addUnitIcon = "#treeLink_addChild_1"
let mainTitle = "h1"
let unitField = "#txtUnit_Id"
let nameField = "#txtName"
let descriptionField = "#txtDescription"
let saveBtn = "#btnSave"
let cancelBtn= "#btnCancel"
let structureList = "#ohrmTreeViewComponent_Tree"
let successMsg = ".message"
let nameError = "span.validation-error"
let unitError = ":nth-child(1) > span.validation-error"
let descriptionError = ".largeTextBox > span.validation-error"
let deleteDialogOk = "#dialogYes"
let deleteDailogCancel = '#dialogNo'

class structurePage {
    constructor() {
    };

    navToStructurePage() {
        cy.get(adminLink).click({force: true})
        cy.get(orgLink, {timeout : 5000}).click({force: true})
        cy.get(structurteLink).click({force: true})
    }

    openAddUnitForm() {
        cy.wait(2000)
        cy.get(addUnitIcon).click({force: true})
    }

    addUnit(unit, name, description) {
        cy.get(unitField).type(unit)
        cy.get(nameField).type(name)
        cy.get(descriptionField).type(description)
        cy.get(saveBtn).click({force: true})
    }

    editUnit(unit, name, description) {
        cy.get(editBtn).click({force: true})
        cy.get(structureList).find('li').eq(0).find('a').eq(0).click({force: true})
        cy.wait(2000)
        cy.get(unitField).type(unit)
        cy.get(nameField).type(name)
        cy.get(descriptionField).type(description)
        cy.get(saveBtn).click({force: true})
    }

    deleteUnit(){
        cy.get(editBtn).click({force: true})
        cy.get(structureList).find('li').eq(0).find('a').eq(2).click({force: true})
        cy.wait(1000)
        cy.get(deleteDialogOk, {timeout: 5000}).click({force: true})
    }

    verifyDuplicateUnit(unit, name, description) {
        cy.wait(1000)
        cy.get(addUnitIcon).click({force: true})
        cy.get(unitField, {timeout: 5000}).type(unit)
        cy.get(nameField).clear().type(name)
        cy.get(descriptionField).type(description)
        cy.get(saveBtn).click({force: true})
        cy.wait(1000)
        cy.get(editBtn).click({force: true})
        cy.get(addUnitIcon).click({force: true})
        cy.get(nameField).type(name)
        cy.get(saveBtn).click({force: true})
    }

    verifySuccessMsg(message){
        cy.get(successMsg).contains(message);
    }

    cancelUnitForm(){
        cy.wait(2000)
        cy.get(cancelBtn).click({force : true});
    }

    validateErrorMsg(validationField, message){
        if(validationField == "unit"){
            cy.get(unitError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField == "name"){
            cy.get(nameError).then(error=>{
                expect(error).to.contain(message);
            })
        }
        else if(validationField=="description"){
            cy.get(descriptionError).then(error=>{
                expect(error).to.contain(message);
            })
        }
    }

    verifyMainTitle(headText){
        cy.get(mainTitle, {timeout : 5000}).invoke('text').then(headline=> {
            expect(headline).to.equal(headText)
        })
    }

    getRandomName() {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = 0; i < 5; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return "S"+result.toString();
    }
}
export default structurePage;



