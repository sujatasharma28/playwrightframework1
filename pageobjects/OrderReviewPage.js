class OrderReviewPage{

constructor(page){

    this.textMessage = page.locator('.hero-primary')
    this.orderId = page.locator('.em-spacer-1 .ng-star-inserted')


}

async getOrderId(){
    await expect(this.textMessage).toHaveText(' Thankyou for the order. ')
    await this.orderId.textContent();
}



}

module.exports = {OrderReviewPage}