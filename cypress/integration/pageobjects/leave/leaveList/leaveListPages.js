/*Selectors*/
let leaveLink = "#menu_leave_viewLeaveModule > b"
let uncheckPendingBox = "#leaveList_chkSearchFilter_1"
let searchBtn = "#btnSearch"
let prevBtn = "div.top > .paging > .previous > .tiptip"
let nextBtn = "div.top > .paging > .next > .tiptip"
let firstPagePaginationBtn = "div.top > .paging > .first > .tiptip"
let lastPagePaginationBtn = "div.top > .paging > .last > .tiptip"
let resultTableList = "#resultTable"
let paginationValue = "div.top > .paging > .desc"
let firstTableData = "tbody> tr:nth-child(1)>td"
let firstPaginationNumberFocus = "div.top > .paging > :nth-child(4) > .current"
let secondPaginationNumberFocus = "div.top > .paging > :nth-child(5) > .current"


class leaveListPages {
    constructor() {
    };

    navToLeaveListPage() {
        cy.get(leaveLink).click({force: true})
    }

    uncheckPendingList() {
        cy.get(uncheckPendingBox).click({force: true})
        cy.get(searchBtn).click({force: true})
    }

    verifyNextBtn(){
        cy.get(firstTableData).invoke('text').then((initialData) => {
            cy.log('first')
            cy.log(initialData)
            cy.get(firstPaginationNumberFocus).invoke('text').then((firstNumber) => {
                cy.get(nextBtn).click({force: true})
                cy.get(firstTableData).invoke('text').then((afterData) => {
                    cy.log('second')
                    cy.get(secondPaginationNumberFocus).invoke('text').then((secondNumber) => {
                        expect(firstNumber).to.not.equal(secondNumber)
                        expect(initialData).to.not.equal(afterData)
                    })
            })  
            })
              
        })
    }

}
export default leaveListPages;


