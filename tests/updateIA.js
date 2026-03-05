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

        await driver.sleep(3000);
        const optionBTN = await driver.wait(until.elementLocated(internalActivity.optBTN),10000);
        await optionBTN.click();
        await driver.sleep(3000);
        const viewBTN = await driver.wait(until.elementLocated(internalActivity.viewBTN),5000);
        await viewBTN.click();

        // Wait for Resource & Project Management/Internal Activity/Update Internal Activity
        await driver.wait(until.urlContains('update-internal-activities'), 10000); //wait for screen to load
        
        //Update Internal Activity form
        await driver.sleep(1000);
        const ia_name = await driver.wait(until.elementLocated(internalActivity.up_name), 10000);
        await ia_name.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
        await ia_name.sendKeys(data.updateData.name);

        await driver.sleep(1000);
        const date = await driver.wait(until.elementLocated(internalActivity.up_date), 10000);
        await date.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
        await date.sendKeys(data.updateData.date);
        await driver.actions().sendKeys(Key.ENTER).perform();
        let value = await date.getAttribute("value");
        // Split and trim date
        const [startDate, endDate] = value.split('-').map(date => date.trim());

        // Category dropdown
        await driver.sleep(3000);
        const categoryDropdown = await driver.findElement(internalActivity.category);
        await categoryDropdown.click(); // open dropdown
        const categoryValue = await categoryDropdown.getText();
        await driver.findElement(internalActivity.selCategoryOpt2).click();// select "Operation"

        //BU dropdown
        await driver.sleep(3000);
        const buDropdown = await driver.findElement(internalActivity.b_unit);
        await buDropdown.click(); // open dropdown
        const buValue = await buDropdown.getText();
        await driver.findElement(internalActivity.selB_unitOpt2).click();

        const remark = await driver.findElement(internalActivity.remarks);
        await remark.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
        await remark.sendKeys(data.updateData.remarks);

        const upBTN = await driver.findElement(internalActivity.upBTN)
        //await upBTN.click();
        
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