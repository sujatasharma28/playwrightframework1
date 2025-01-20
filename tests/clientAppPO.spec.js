const{test, expect} = require('@playwright/test')
const {POManager} = require('./pageobjects/POManager');


test.skip('', async ({page})=>{

   await page.goto('https://rahulshettyacademy.com/client')
   await page.locator('.text-reset').click();
   await page.locator('#firstName').fill('sujata');
   await page.locator('#lastName').fill('sharma');
   await page.locator('#userEmail').fill('sujatasharma1690@gmail.com');
   await page.locator('#userMobile').fill('1234456789');
   await page.locator('.custom-select').selectText('Engineer');
   await page.locator("input[type=radio]").first().check();
   await page.locator('#userPassword').fill('@Sujata28')
   await page.locator('#confirmPassword').fill('@Sujata28')
   await page.locator('.ng-dirty').last().click();
   await page.locator('#login').click();

})

test.only('login', async ({page})=>{
    const username = 'sujatasharma1690@gmail.com';
    const password = '@Sujata28'
    const productName = 'ZARA COAT 3';
    const countryCode= 'ind';
    const countryName = ' India'
    //const products = page.locator('.card-body')
    const pomanager = new POManager(page)
    const loginPage = pomanager.getLoginPage();
    await loginPage.goTo()
    await loginPage.validLogin(username, password)
    const dashboardPage = pomanager.getDashboardPage();
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateTocart();
 
    
    //await page.locator('.card-body b').first().waitFor();
    const checkoutPage = pomanager.getCheckoutPage();
    await checkoutPage.VerifyProductIsDisplayed(productName);
    await checkoutPage.Checkout()
    const orderReviewPage = pomanager.getOrderReviewPage();
    await checkoutPage.searchCountryandSelect(countryCode, countryName)
    await checkoutPage.VerifyEmailandSubmit(username)
   const orderId = await orderReviewPage.getOrderId();
    console.log(orderId);
    await dashboardPage.navigateToDashboard();
    const orderHistoryPage =pomanager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
    await orderHistoryPage.getOrderId()
    
})