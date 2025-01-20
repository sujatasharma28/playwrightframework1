class apiUtils{

constructor(apiContext){
    this.apiContext =apiContext;
    this.url = url;
    this.payload = payload;
}

    async getToken(){
        const loginResponse =  await this.apiContext.post(this.url, 
            { 
                data : this.payload
            })
            expect(loginResponse.ok()).toBeTruthy();
            const loginResponseJson = await loginResponse.json()
            const token = loginResponseJson.token;
            console.log(token)
            return token;
    }

    async createOrder(){

        let  response = {};
        response.token = await this.getToken();
        const orderresponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data : orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
    
            }
        })
       const orderResponseJson = await orderresponse.json()
       console.log(orderResponseJson)
       const orderId = orderResponseJson.orders[0];
       response.orderId =orderId;

       return response;

    }
}

module.exports = {apiUtils}