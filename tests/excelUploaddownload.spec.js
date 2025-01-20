const Exceljs= require('exceljs')
const {test, expect} = require('@playwright/test')

async function writeExcelTest(searchText, replaceText, filePath) {

   
    const workbook= new Exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1')

    const output = await readExcel(worksheet, searchText);
    const cell =  worksheet.getCell(output.row,output.coloum)
    cell.value = replaceText
    await workbook.xlsx.writeFile(filePath)

}

    async function readExcel(worksheet, searchText) {
        let output= {row:-1, coloum:-1};
        worksheet.eachRow((row, rowNumber)=>{
             row.eachCell((cell, coNumber)=>{
            // console.log(cell.value)
                 if(cell.value === searchText){
                     // console.log(rowNumber, coNumber)
                     output.row = rowNumber;
                     output.coloum = coNumber;
                }  
            }) 
        })

        return output;
    }

   // writeExcelTest("Banana", "Republic", "C:/Users/sujat/Downloads/download.xlsx>")
   
   test('upload download excel validation', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')
    const downloadPromise = await page.waitForEvent('download')
    await page.getByRole('button', {name: 'Download'}).click()
    await downloadPromise;
    writeExcelTest("Banana", 350,{rowChange:0,colChange:2} , "C:/Users/sujat/Downloads/download.xlsx")
    await page.locator('#fileinput').click()
    await page.locator('#fileinput').setInputFiles('C:/Users/sujat/Downloads/download.xlsx')


   })