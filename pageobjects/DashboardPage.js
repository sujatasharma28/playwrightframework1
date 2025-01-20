class DashboardPage {

    constructor(page) {

        this.products = page.locator('.card-body')
        this.productsText = page.locator('.card-body b')
        this.cart = page.locator("[routerlink*='cart']")
        this.dashboard = page.locator('button[routerlink="/dashboard/myorders"]')
    }

    async searchProduct(productName) {

        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {

                await this.products.nth(i).locator("text=Add To Cart").click();
                break;
            }
        }

    }

    async navigateTocart() {
        await this.cart.click();
    }

    async navigateToDashboard(){
        await this.dashboard.click();
    }


}

module.exports = { DashboardPage };