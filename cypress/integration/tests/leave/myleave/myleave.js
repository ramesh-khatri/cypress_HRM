///<reference types="Cypress"/>

import MyLeavePage from "../../../pageobjects/leave/myleave/myleavePage";
const myleaveObj = new MyLeavePage()

describe('Admin login and check leave', () => {
    
   
    beforeEach(function () {
        cy.visit(Cypress.env('devUrl'));
      
        cy.fixture('data/common/loginData.json').then(loginData => {
           let  credential = loginData;
           cy.doLogin(credential.valid.username, credential.valid.password);
        });
      
    })

    it('Should able to check applied leave',  () => {
      myleaveObj.checkAppliedLeave()
    

    })

})