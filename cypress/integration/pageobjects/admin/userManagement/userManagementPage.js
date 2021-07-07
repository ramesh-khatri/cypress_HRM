/*Selectors*/
let adminLink = "#menu_admin_viewAdminModule"
let searchUsernameField = "#searchSystemUser_userName"
let searchUserRoleField = "#searchSystemUser_userType"
let searchEmployeeNameField = "#searchSystemUser_employeeName_empName"
let searchStatusField = "#searchSystemUser_status"
let resultTableUserName = "tbody > tr >td:nth-child(2)"
let resultTableUSerRole = "tbody > tr >td:nth-child(3)"
let resultTableEmployeeName = "tbody > tr >td:nth-child(4)"
let resultTableStatus = "tbody > tr >td:nth-child(5)"
let resultTableEmpty = "td"
let tableBody = "table> tbody> tr> td:nth-child(2)"
let userNameSortFirst = ":nth-child(2) > .null"
let userNameHeadUp = ".ASC"
let searchBtn = "#searchBtn"
let resetBtn = "#resetBtn"


class userManagementPage {
    constructor() {
    };

    navToUserManagement() {
        cy.get(adminLink).click({force: true});
    }

    searchUsingUsername(username) {
        cy.get(searchUsernameField).type(username)
    }

    searchUsingUserRole(role) {
        cy.get(searchUserRoleField).select(role)
    }

    searchUsingEmployeeName(emp_name) {
        cy.get(searchEmployeeNameField).type(emp_name)
    }

    searchUsingStatus(status) {
        cy.get(searchStatusField).select(status)
    }

    clickSearchBtn() {
        cy.get(searchBtn).click({force: true})
    }
    
    getRandomName() {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = 0; i < 5; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return "In@val!d"+result.toString();
    }

    verifyDataInTable(field, search_data) {
        if (field == 'username') {
            cy.get(resultTableUserName).invoke('text').then((result_data) => {
                expect(result_data).to.have.string(search_data)
            })
        }

        else if (field == 'userrole') {
            cy.get(resultTableUSerRole).invoke('text').then((result_data) => {
                expect(result_data).to.have.string(search_data)
            })
        }

        else if (field == 'employee') {
            cy.get(resultTableEmployeeName).invoke('text').then((result_data) => {
                expect(result_data).to.have.string(search_data)
            })
        }

        else if (field == 'status') {
            cy.get(resultTableStatus).invoke('text').then((result_data) => {
                expect(result_data).to.have.string(search_data)
            })
        }

        else if (field == 'empty') {
            cy.get(resultTableEmpty).invoke('text').then((result_data) => {
                expect(result_data).to.have.string(search_data)
            })
        }
        
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
        cy.get(userNameSortFirst).click({force: true})
        cy.get(userNameHeadUp).click({force: true})
        let mySortedArray = []
        cy.get(tableBody).each(($el, $index) => {
            let text = $el.text()
            mySortedArray.unshift(text.trim())
        })
        cy.writeFile('cypress/fixtures/files/tempAfter.txt', mySortedArray)
    }

}
export default userManagementPage;