///<reference types="Cypress"/>

import { Report } from "../../../pageobjects/leave/reports/Report";


const report= new Report

describe('Admin login and check leave', () => {
    
    before(function () {
        cy.visit(Cypress.env('devUrl'));
      
        cy.fixture('data/common/loginData.json').then(loginData => {
           let  credential = loginData;
           cy.doLogin(credential.valid.username, credential.valid.password);
        });
        Cypress.Cookies.preserveOnce("orangehrm");
    })
    beforeEach(() => {
        Cypress.Cookies.preserveOnce("orangehrm");
    });

    it('Should able to check Leave Entitlements and Usage Report ',  () => {
        report.leaveEntitlementsandUsageReport()        
    
    })
    it('Should able to check My Leave Entitlements and Usage Report ',  () => {
        report.myLeaveEntitlementsandUsageReport()        
    
    })


})