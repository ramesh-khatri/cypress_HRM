//selectors
let leave = "#menu_leave_viewLeaveModule > b"
let myleave = "#menu_leave_viewMyLeaveList"
let all = "#leaveList_chkSearchFilter_checkboxgroup_allcheck"
let reject = "#leaveList_chkSearchFilter_-1"
let pending_approval = "#leaveList_chkSearchFilter_1"
let cancelled = "#leaveList_chkSearchFilter_0"
let scheduled = "#leaveList_chkSearchFilter_2"
let taken = "#leaveList_chkSearchFilter_3"
let searchBtn = "#btnSearch"
let action = "#select_leave_action_66"
let comments =":nth-child(1) > :nth-child(7) > .commentContainerLong > .callout"

class MyLeavePage {
    constructor() {

    }

    checkAppliedLeave() {
        cy.get(leave).click().wait(2000)
        cy.get(myleave).click({
            force: true
        })
        cy.get(all).click()
        cy.get(pending_approval).click()
        cy.get(searchBtn).click()
        cy.get(comments).type("Requested Leave Has Been Cancelled")
        cy.get(action).select("Cancel")
    }

}
export default MyLeavePage;