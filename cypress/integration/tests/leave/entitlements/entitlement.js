///<reference types="Cypress"/>

import Entitlement from "../../../pageobjects/leave/Entitlements/entitlements";
const entitlementObj = new Entitlement()

describe('Admin login and entitlements', () => {
    
   
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

    it('Should able to add entitlement',  () => {
    entitlementObj.addEmployeeEntitlement()
    })

    it("should able to view Employee Entitlemenets", ()=>{
        entitlementObj.employeeEngtitlementsView()
    })

    it("Should able to delete My Entitlement", ()=>{
        entitlementObj.myEngtitlement()
    })

})

