const{test, expect} = require('@playwright/test')

let webContext;

test.beforeAll( '', async({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/client')
    // await page.locator('.text-reset').click()
     await page.locator('#userEmail').fill('sujatasharma1690@gmail.com');
     await page.locator('#userPassword').fill('@Sujata28');
     await page.locator('#login').click();
     await page.waitForLoadState('networkidle');
     await context.storageState({path : 'state.json'});

     webContext = await browser.newContext({storageState: 'state.json'})
})

test('login', async ({})=>{
    const productName = 'ZARA COAT 3'
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client')
    const products = page.locator('.card-body')
    await page.locator('.card-body b').first().waitFor();
    const titles= await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count =await products.count();
    for(let i=0; i<count; ++i){
        if(await products.nth(i).locator('b').textContent() === productName){
            
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
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
