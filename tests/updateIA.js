const { Builder, By, until, Key } = require('selenium-webdriver');
const data = require('../data/inputData');
const { login } = require('../util/login');
const {assertTable} = require('../util/tableCheck');
const { sideMenu } = require('../util/selector');
const { internalActivity } = require('../util/selector');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');

async function updateDataIA() {
      let driver;
    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        
        await login(driver); //go login

        const sideMenuIA = await driver.findElement(sideMenu.internalActivity);
        await sideMenuIA.click();

        // --- Wait for Resource & Project Management/Internal Activity
        await driver.wait(until.urlContains('internal-activities'), 10000); //wait for screen to load

        // --- search data from table list ---
        const searchData = await driver.findElement(internalActivity.searchBox);
        await searchData.clear();
        await searchData.sendKeys(data.createData.name);
        // -- navigate to data ---
        const optionBTN = await driver.findElement(internalActivity.optBTN);
        await optionBTN.click();
        const viewBTN = await driver.findElement(internalActivity.viewBTN)
        await viewBTN.click();

        // Wait for Resource & Project Management/Internal Activity/Update Internal Activity
        await driver.wait(until.urlContains('update-internal-activities'), 10000); //wait for screen to load
        
        //Update Internal Activity form
        await driver.sleep(1000);
        const ia_name = await driver.findElement(internalActivity.name);
        await ia_name.clear();
        await ia_name.sendKeys(data.updateData.name);

        await driver.sleep(1000);
        const date = await driver.findElement(internalActivity.date);
        await date.clear();
        await date.sendKeys(data.updateData.date);
        await driver.actions().sendKeys(Key.ENTER).perform();
        let value = await date.getAttribute("value");
        // Split and trim date
        const [startDate, endDate] = value.split('-').map(date => date.trim());

        // Category dropdown
        const categoryDropdown = await driver.findElement(internalActivity.category);
        await driver.sleep(3000);
        await categoryDropdown.click(); // open dropdown
        const categoryValue = await categoryDropdown.getText();
        await driver.findElement(internalActivity.selCategoryOpt2).click();// select "Operation"

        //BU dropdown
        const buDropdown = await driver.findElement(internalActivity.b_unit);
        await driver.sleep(3000);
        await buDropdown.click(); // open dropdown
        const buValue = await buDropdown.getText();
        await driver.findElement(internalActivity.selB_unitOpt2).click();// select "DEV A"

        const remark = await driver.findElement(internalActivity.remarks);
        await remark.clear();
        await remark.sendKeys(data.updateData.remarks);

        const saveBTN = await driver.findElement(internalActivity.saveBTN)
        await saveBTN.click();
        
        //=== SYSTEM ALERT POP-UP CLICK OK ===
        await driver.wait(until.alertIsPresent(), 5000);
        let alert = await driver.switchTo().alert();
        await alert.accept(); 

        //Wait for Resource & Project Management/Internal Activity
        await driver.wait(until.urlContains('internal-activities'), 10000); //wait for screen to load

        // assert table
        await assertTable(driver,data.updateData.name,categoryValue,buValue,startDate,endDate);

     } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_001');
            await writeResult('test_003', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }

    } finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}
module.exports = { updateDataIA };