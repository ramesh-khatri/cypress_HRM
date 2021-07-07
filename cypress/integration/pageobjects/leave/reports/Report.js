// //selectors
let leave = "#menu_leave_viewLeaveModule > b"
let report ="#menu_leave_Reports"
let leaveAndReport ="#menu_leave_viewLeaveBalanceReport"
let myLeaveAndReport="#menu_leave_viewMyLeaveBalanceReport"
let generateFor="#leave_balance_report_type"
let leaveType="#leave_balance_leave_type"
let from ="#period"
let jonTitle ="#leave_balance_job_title"
let location ="#leave_balance_location"
let subUnit ="#leave_balance_sub_unit"
let viewBtn ="#viewBtn"
let form1 ="#period"
let viewBtn1="#viewBtn"
export class Report{

    leaveEntitlementsandUsageReport(){
        cy.get(leave).click()
        cy.get(leaveAndReport).click({force:true})
        cy.get(generateFor).select("Leave Type").should("have.value", "1").wait(2000)
        cy.get(leaveType).select("US - Vacation").should("have.value", "1")
        cy.get(from).select("2020-01-01 - 2020-12-31").should("have.value", "2020-01-01$$2020-12-31")
        cy.get(jonTitle).select("All")
        cy.get(location).select("Canada").should("have.value", "3,-1")
        cy.get(subUnit).select("All")
        cy.get(viewBtn).click()
    } 

    myLeaveEntitlementsandUsageReport(){
        cy.get(leave).click()
        cy.get(myLeaveAndReport).click({force:true})
        cy.get(form1).select("2020-01-01 - 2020-12-31")
        cy.get(viewBtn1).click()

    }
}

