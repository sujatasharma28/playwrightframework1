const{test, expect, request} = require('@playwright/test');
const {apiUtils} = require('./utils/apiUtils.spec');

let response;
const url ='https://rahulshettyacademy.com/api/ecom/auth/login';
const payload = {userEmail:"sujatasharma1690@gmail.com",userPassword:"@Sujata28"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6581ca979fd99c85e8ee7faf"}]}
let token;
let orderId;

test.beforeAll('',async ()=>{

   const apiContext = await request.newContext();
   const t = new apiUtils();
 const apiUtils =  new apiUtils(apiContext, payload);
 response = await apiUtils.createOrder(orderPayload);
});

test('login', async ({page})=>{

   const apiUtils = new apiUtils(apiContext, payload, url);
    const orderId = createOrder(orderPayload)
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token );

    await page.goto('https://rahulshettyacademy.com/client')

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
    expect(response.orderId.includes(OrderIdDetailsPage)).toBeTruthy();

    
})