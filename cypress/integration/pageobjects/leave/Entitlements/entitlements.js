// //selectors
let leave = "#menu_leave_viewLeaveModule > b"
let engtitlements = "#menu_leave_Entitlements"
let addEngtitlements ="#menu_leave_addLeaveEntitlement"
let employeeEngtitlements ="#menu_leave_viewLeaveEntitlements"
let myEngtitlements ="#menu_leave_viewMyLeaveEntitlements"
let addMultipleEmployee ="#entitlements_filters_bulk_assign"
let location ="#entitlements_filters_location"
let subUnit ="#entitlements_filters_subunit"
let leaveType ="#entitlements_leave_type"
let leavePeroid="#period"
let entitlement="#entitlements_entitlement"
let save="#btnSave"
//let employeeName=".even > :nth-child(1)"
let employeeName="tbody > :nth-child(2) > :nth-child(1)"
let confirmBtn ="#dialogConfirmBtn"
let successmsg=".message"
let employee ="#entitlements_employee_empName"
let searchBtn="#searchBtn"
let leaveTypeMyLeave ="#entitlements_leave_type"
let leavePeroidMyLeave ="#period"
let searchBtnMyLeave ="#searchBtn"
let deleteBtnLeave ="#btnDelete"
let selectFirst ='//*[@id="resultTable"]/tbody/tr/td[1]'
let trCheck ="//*[@id='resultTable']/tbody"
let confirmDeleteBtn="#dialogDeleteBtn"


 class Entitlement{
    constructor(){
    }

    addEmployeeEntitlement(){
        cy.get(leave).click()
        cy.get(addEngtitlements).click({force: true})
        cy.get(addMultipleEmployee).click()
        cy.get(location).select("Canada").should("have.value","3,-1")
        cy.get(subUnit).select("Engineering").should("have.value", "3")
        cy.get(leaveType).select("US - Vacation").should("have.value" , "1")
       // cy.get(leavePeroid).select("01-2021-01 - 12-2021-31")//.should("have.value", "01-2020-01$$12-2020-31")
        cy.get(entitlement).type("2")
        cy.get(save).click()
        cy.get(employeeName).then(($data)=>{
            const name = $data.text()
            cy.writeFile("cypress/fixtures/Leave/EmployeeName.txt", name)
            cy.log(name)
        })
        cy.get(confirmBtn).click()
        // cy.get(successmsg).should(($data)=>{
        //     expect($data).to.have.text('Entitlements added to 1 employees(s)')
        // })
        
    }

    employeeEngtitlementsView(){
        cy.get(leave).click()
        cy.get(employeeEngtitlements).click({force: true})
       
         cy.readFile("cypress/fixtures/Leave/EmployeeName.txt").then((data) => {
            var name = data
            cy.get(employee).click().type(name)
            cy.log(name)
            cy.get(searchBtn).click().wait(2000)
        })
        
        
    }
    myEngtitlement(){
        cy.get(myEngtitlements).click({force:true}).wait(2000)
        cy.get(leaveTypeMyLeave).select("US - Vacation").should("have.value", "1")
        //expect(cy.xpath(trCheck).find('tr')).to.have.lengthOf(1)
        cy.get(leavePeroidMyLeave).select("2020-01-01 - 2020-12-31").should("have.value", "2020-01-01$$2020-12-31")
        cy.get(searchBtnMyLeave).click()
        cy.xpath(selectFirst).click()
        cy.get(deleteBtnLeave).click()
        cy.get(confirmDeleteBtn).click()
        cy.get('.message').contains("Entitlement/s will not be deleted since it's already in use")


    } 
}

export default Entitlement