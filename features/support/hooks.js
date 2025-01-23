const {POManager} = require('../../pageobjects/POManager');
const playwright = require('@playwright/test')
const { Before, After, Status, BeforeStep, AfterStep} = require('@cucumber/cucumber');

Before(async function () {
    
     const browser = await playwright.chromium.launch({
          headless: false
        })
        const context = await browser.newContext()
        this.page = await context.newPage()
        
        this.pomanager = new POManager(this.page)
  });

  After({tags: '@Regression'}, function () {
    // Assuming this.driver is a selenium webdriver
    console.log('All the automation is complated')
  });

  BeforeStep( function () {
    // This hook will be executed before all steps in a scenario with tag @foo
  });

  AfterStep(async function ({result}) {
    
    if(result.status === Status.FAILED){
        await this.page.screenshot({ path: 'screenshot1.png'})
    }


  });