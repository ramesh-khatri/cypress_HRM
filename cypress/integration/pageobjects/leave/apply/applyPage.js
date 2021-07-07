/*Selectors*/
let leave ="#menu_leave_viewLeaveModule > b"
let apply ="#menu_leave_applyLeave"
let leaveBalance ='//*[@id="applyleave_leaveBalance"]/text()'
let leaveType ="#applyleave_txtLeaveType"
let fromDate="#applyleave_txtFromDate"
let toDate="#applyleave_txtToDate"
let partialdays ="#applyleave_duration_duration"
let comment ="#applyleave_txtComment"
let applyBtn ="#applyBtn"
let message =".message"
//let message =".successBodyEdit"


 class ApplyPage{
    constructor() { };

    applyleave(){
        cy.get(leave).click()
        cy.get(apply).click({force:true})
        cy.get(leaveType).select("US - FMLA").should ("have.value", "2").wait(2000)
        cy.xpath(leaveBalance).then(($data)=>{
            const text =$data.text()
            cy.log(text)
        })
        //const todaysDate = Cypress.moment().format('yyyy-MM-dd')
       //cy.log(todaysDate)

        cy.get(fromDate).clear().type("2020-12-20{enter}")
        cy.get(toDate).clear().type("2020-12-22{enter}")
        cy.get(partialdays).select("full_day", { force: true }).should("have.value", "full_day")
        cy.get(comment).type("Leave for personal problem")
        cy.get(applyBtn).click()
        cy.get(message).contains("Successfully Submitted")
    
    }
}
export default ApplyPage;

