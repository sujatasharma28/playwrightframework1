const { test, expect } = require('@playwright/test')
const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test')



Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

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
  this.checkoutPage = this.pomanager.getCheckoutPage();
  await this.checkoutPage.VerifyProductIsDisplayed(productName);
  await this.checkoutPage.Checkout()
});

When('Enter valid details with {string} and place order', { timeout: 100 * 1000 }, async function (emailID) {
  this.orderReviewPage = this.pomanager.getOrderReviewPage();
  await this.checkoutPage.searchCountryandSelect("ind", "India")
  await this.checkoutPage.VerifyEmailandSubmit(emailID)
  this.orderId = await this.orderReviewPage.getOrderId();
  //console.log('orderid2:'+ this.orderId);
});

Then('Verify order is present on order history page', async function () {
  await this.dashboardPage.navigateToDashboard();
  this.orderHistoryPage = this.pomanager.getOrderHistoryPage();
  await this.orderHistoryPage.searchOrderAndSelect(this.orderId);
  await expect(this.orderId.includes(await this.orderHistoryPage.getOrderId())).toBeTruthy();
  //await this.orderHistoryPage.getOrderId()
});

Given('a login to Ecommerce2 application with {string} and {string}',{ timeout: 100 * 1000 }, async function (username, password) {

  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  console.log(this.page.title())
  await this.page.locator("(//input[@id='username'])[1]").fill(username)
  await this.page.locator("(//input[@id='password'])[1]").fill(password)
  await this.page.locator("(//span[@class='checkmark'])[2]").click()
  await this.page.locator("//button[@id='okayBtn']").click()
  await this.page.selectOption("(//select[@class='form-control'])[1]", "stud")
  await this.page.locator("(//input[@id='terms'])[1]").click()
  await this.page.locator("(//input[@id='signInBtn'])[1]").click()
});

Then('Verify error message validation', async function () {

  console.log(await this.page.locator("[style*='block']").textContent())
  await expect(this.page.locator("[style*='block']")).toContainText("Incorrect username/password")

});