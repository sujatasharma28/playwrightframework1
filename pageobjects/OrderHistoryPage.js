class OrderHistoryPage{

    constructor(page){

        this.page = this.page;
        this.ordeTable = page.locator('tbody')
        this.rows = page.locator('tbody tr')
        this.OrderIdDetails = page.locator('.col-text')

    }


    async searchOrderAndSelect(orderId){

        await this.ordeTable.waitFor();
        
        for(let i=0; i< await this.rows.count(); i++){
            const rowOrderId= await this.rows.nth(i).locator('th').textContent();
            if(orderId.includes(rowOrderId)){
                await this.rows.nth(i).locator('button').first().click();
                break;
            }
        }
  
    
    }

    async getOrderId(){

        await this.OrderIdDetails.textContent();
       
    }



}

module.exports ={OrderHistoryPage}