const{ expect } = require('@playwright/test')
const { When, Then, Given } = require('@cucumber/cucumber');
const {POManager} = require('../../pageobjects/POManager');
const playwright = require('@playwright/test')


Given('a login to Ecommerce application with {string} and {string}',{timeout : 100*1000},  async function (username, password) {
    const browser = await playwright.chromium.launch({
      headless: false
    })
    const context = await browser.newContext()
    const page = await context.newPage()
    
    this.pomanager = new POManager(page)
    const loginPage = this.pomanager.getLoginPage();
    await loginPage.goTo()
    await loginPage.validLogin(username, password)
    
  });

  When('Add {string} to cart', async function (productName) {
    this.dashboardPage = this.pomanager.getDashboardPage();
    await this.dashboardPage.searchProduct(productName);
    await this.dashboardPage.navigateTocart();
    
  });

  Then('Verify {string} is displayed in the cart', async function (productName) {
    const checkoutPage = this.pomanager.getCheckoutPage();
    await checkoutPage.VerifyProductIsDisplayed(productName);
    await checkoutPage.Checkout()
  });

  When('Enter valid details and place order', async function () {
    const orderReviewPage = this.pomanager.getOrderReviewPage();
    await checkoutPage.searchCountryandSelect("ind", "India")
    await checkoutPage.VerifyEmailandSubmit(username)
   const orderId = await orderReviewPage.getOrderId();
    console.log(orderId);
  });

  Then('Verify order is present on order history page', async function () {
    await this.dashboardPage.navigateToDashboard();
    const orderHistoryPage =this.pomanager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
    await orderHistoryPage.getOrderId()
  });
