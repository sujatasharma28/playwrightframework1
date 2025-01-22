const{test, expect} = require('@playwright/test')   
class CheckoutPage{

    constructor(page, productName){
            this.page =page;
            this.cartProduct = page.locator('div li').first()
            this.productText = page.locator('.card-body b')
           // this.productnameLocator = page.locator("h3:has-text('"+ productName +"')")
            this.checkout = page.locator("text='Checkout'")
            this.country = page.locator("//input[@placeholder='Select Country']")
            this.emailText = page.locator('label[type="text"]')
            this.submit = page.locator("//a[normalize-space()='Place Order']")
            this.dropdown = page.locator('.ta-results')
        
    }

    async VerifyProductIsDisplayed(productName){

        await this.cartProduct.waitFor();
        const bool = await this.getProductLocator(productName).isVisible()
        expect(bool).toBeTruthy();
    }

    async Checkout(){

        await this.checkout.click();
            
    }

    getProductLocator(productName){
        return this.page.locator("h3:has-text('"+ productName +"')");
    }

    async searchCountryandSelect(countryCode, countryName){

        await this.country.pressSequentially(countryCode, {delay: 100});
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator('button').count();
        console.log(optionsCount)
        for(let i =0; i<optionsCount; i++){
            const text = await this.dropdown.locator("button").nth(i).textContent();
                if(text.trim() === countryName){
                console.log(text)
                this.dropdown.locator("button").nth(i).click();
                break;
             }
        }
    }

    async VerifyEmailandSubmit(username){

        await expect(this.emailText).toHaveText(username)
        await this.submit.click();
    }


}

module.exports ={CheckoutPage}