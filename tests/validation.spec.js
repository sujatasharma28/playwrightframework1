const {test, expect} = require('@playwright/test')

test('pop-up validation',  async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://google.com');
    await page.goBack();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

})

test('Alert', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    page.on('dialog',dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator('li a[href*="lifetime-access"]:visible').click()
    const text = await framePage.locator('.text h2').textContent();
    const number = text.split(" ")[1]
    console.log(number)
})

test.only('screenshot and visual comparision', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://google.com');
    await page.goBack();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'})
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator('#displayed-text')).toBeHidden();

})