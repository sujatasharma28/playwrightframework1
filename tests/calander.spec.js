const{test, expect} = require('@playwright/test')

test('calander', async ({page})=>{
    
    const month = '6';
    const date = '11';
    const year ='2027';

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.getByText(year).click()
    await page.locator('.react-calendar__tile').nth(Number(month-1)).click()
    await page.locator("//abbr[text()=" + date + "]").click();

})