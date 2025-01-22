const{test, expect} = require('@playwright/test')

class OrderReviewPage{

constructor(page){

    this.textMessage = page.locator('h1.hero-primary')
    this.orderId = page.locator('.em-spacer-1 .ng-star-inserted')
}

async getOrderId(){ 
    await expect(this.textMessage).toHaveText(' Thankyou for the order. ')
    const orderidOnDetails = await this.orderId.textContent();
    const productOrderidOnDetails = orderidOnDetails.split(' ')
    console.log('orderidOnDetails: '+productOrderidOnDetails[2])
    return productOrderidOnDetails[2];
}

}

module.exports = {OrderReviewPage}
