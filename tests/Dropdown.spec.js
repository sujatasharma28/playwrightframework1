const{test, expect}= require('@playwright/test')

test('login', async ({page})=>{

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
await page.locator('#username').fill('sujatasharma1690@gmail.com')
await page.locator('#password').fill('@Sujata28')
await page.locator('span.checkmark').last().click();
expect(page.locator('span.checkmark').last()).toBeChecked();
const dropdown =await page.locator('select.form-control');
dropdown.selectOption('Consultant');
await page.locator('#terms').click();
await page.locator('#signInBtn').click();

})