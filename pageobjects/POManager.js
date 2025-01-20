const {DashboardPage} = require('./DashboardPage')
const {LoginPage} = require('./LoginPage')
const {CheckoutPage} = require('./CheckoutPage')
const {OrderHistoryPage} = require('./OrderHistoryPage')
const {OrderReviewPage} = require('./OrderReviewPage')


class POManager{

    constructor(page){
        this.page =page;
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.orderHistoryPage = new OrderHistoryPage(this.page)
        this.orderReviewPage = new OrderReviewPage(this.page)
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }

    getOrderReviewPage(){
        return this.orderReviewPage;
    }

}

module.exports ={POManager}