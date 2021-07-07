/// <reference types="Cypress" />

import userManagementPage from "../../../pageobjects/admin/userManagement/userManagementPage";

const objUser = new userManagementPage();
describe('Admin section User Management test', () => {
    let credential = ""
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
        cy.fixture('data/common/loginData.json').then(loginData => {
            credential = loginData;
        })
        cy.wait(2000)
    })

    //Added another testcase for sorting at last
    // it('Should able to sort username', () => {
    //     cy.doLogin(credential.valid.username, credential.valid.password);
    //     objUser.navToUserManagement()
    //     cy.get('tbody > tr:nth-child(1) >td:nth-child(2)').invoke('text').then((beforeSort) => {
    //         cy.get(':nth-child(2) > .null').click({force: true})
    //         cy.get('.ASC').click({force: true})
    //         cy.get('tbody > tr >td:nth-child(2)').eq(-1).invoke('text').then((afterSort) => {
    //             expect(beforeSort).to.deep.equal(afterSort)           
    //         })
    //     })
    // })

    it('Should able to sort Employee Name', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objUser.navToUserManagement()
        cy.get(':nth-child(4) > .null', {timeout: 5000}).click({force: true})
        cy.get('tbody > tr:nth-child(1) > td:nth-child(4)').invoke('text').then((beforeSort) => {
            cy.get('.ASC').click({force: true})
            cy.get('tbody > tr >td:nth-child(4)').eq(-1).invoke('text').then((afterSort) => {
                expect(beforeSort).to.deep.equal(afterSort)           
            })
        })
    })

    it('Should able to search using Username', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objUser.navToUserManagement()
        cy.get('tbody > :nth-child(2) > :nth-child(2) > a').invoke('text').then((uname) =>{
            objUser.searchUsingUsername(uname)
            objUser.clickSearchBtn()
            objUser.verifyDataInTable('username', uname)
        })        
    })
    
    it('Should able to search using User Role', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objUser.navToUserManagement()
        cy.get('tbody > tr:nth-child(2) > td:nth-child(3)').invoke('text').then((userrole) =>{
            cy.log(userrole)
            objUser.searchUsingUserRole(userrole)
            objUser.clickSearchBtn()
            objUser.verifyDataInTable('userrole', userrole)
        })      
    })

    it('Should able to search using Employee Name', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objUser.navToUserManagement()
        cy.get('tbody > :nth-child(2) > :nth-child(4)').invoke('text').then((name) =>{
            objUser.searchUsingEmployeeName(name)
            objUser.clickSearchBtn('employee', name)
            objUser.verifyDataInTable(name)
        })      
    })

    it('Should able to search using Status', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objUser.navToUserManagement()
        cy.get('tbody > :nth-child(2) > :nth-child(5)').invoke('text').then((status) =>{
            objUser.searchUsingStatus(status)
            objUser.clickSearchBtn()
            objUser.verifyDataInTable('status', status)
        })      
    })

    it('Should not show any result in table when searched using not matching value in Username', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objUser.navToUserManagement()
        objUser.searchUsingUsername(objUser.getRandomName())
        objUser.clickSearchBtn()
        objUser.verifyDataInTable('empty', 'No Records Found')    
    })

    it('Should able to sort username', () => {
        cy.doLogin(credential.valid.username, credential.valid.password);
        objUser.navToUserManagement()
        objUser.getTableDataBeforeSorting()
        objUser.getTableDataAfterSorting()
        cy.readFile('cypress/fixtures/files/tempBefore.txt').then((pushSort) => {
            cy.readFile('cypress/fixtures/files/tempAfter.txt').then((unshiftSort) => {
                expect(pushSort).to.deep.equal(unshiftSort)
            })
        })
    })

})
