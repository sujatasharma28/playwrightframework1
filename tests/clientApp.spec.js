const{test, expect} = require('@playwright/test')
//Convert json to string then convert to javascriptObject
const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")))

test('', async ({page})=>{

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

for(const data of dataset){
test(`login ${data.productName}`, async ({page})=>{
    //const productName = 'ZARA COAT 3'
    const products = page.locator('.card-body')
    await page.goto('https://rahulshettyacademy.com/client')
   // await page.locator('.text-reset').click()
    await page.locator('#userEmail').fill(data.username);
    await page.locator('#userPassword').fill(data.password);
    await page.locator('#login').click();
    //await page.waitForLoadState('networkidle');
   await page.locator('.card-body b').first().waitFor();
    const titles= await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count =await products.count();
    for(let i=0; i<count; ++i){
        if(await products.nth(i).locator('b').textContent() === data.productName){
            
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('" +data.productName +"')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text='Checkout'").click();
    await page.locator("//input[@placeholder='Select Country']").pressSequentially('ind');
    const dropdown = page.locator('.ta-results')
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for(let i =0; i<optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent();
         if(text ===' India'){
            dropdown.locator("button").nth(i).click();
            break;
         }
    }
    await expect(page.locator('label[type="text"]')).toHaveText('sujatasharma1690@gmail.com')
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')
    const orderId= await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);
    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.locator('tbody').waitFor();
    const rows = await page.locator('tbody tr')
    for(let i=0; i< await rows.count(); i++){
        const rowOrderId= await rows.nth(i).locator('th').textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const OrderIdDetailsPage = await page.locator('.col-text').textContent();
    expect(orderId.includes(OrderIdDetailsPage)).toBeTruthy();  
})
}