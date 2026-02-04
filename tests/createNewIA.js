const { Builder, By, until, Key } = require('selenium-webdriver');
const data = require('../data/inputData');
const { login } = require('../util/login');
const {assertTable} = require('../util/tableCheck');
const { sideMenu } = require('../util/selector');
const { internalActivity } = require('../util/selector');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');

async function dataCreationIA() {
      let driver;
    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        await login(driver); //go login

        const sideMenuIA = await driver.findElement(sideMenu.internalActivity);
        await sideMenuIA.click();

        // --- Wait for Resource & Project Management/Internal Activity
        await driver.wait(until.urlContains('internal-activities'), 10000); //wait for screen to load
        await driver.sleep(1000);

        const createNewBTN = await driver.findElement(internalActivity.createBTN);
        await createNewBTN.click();

        // --- Wait for Resource & Project Management/Internal Activity/Create Internal Activity
        await driver.wait(until.urlContains('create-internal-activities'), 10000); //wait for screen to load
        await driver.sleep(1000);
        
        //create internal activity form
        await driver.sleep(1000);
        const ia_name = await driver.findElement(internalActivity.name);
        await ia_name.clear();
        await ia_name.sendKeys(data.createData.name);

        await driver.sleep(1000);
        const date = await driver.findElement(internalActivity.date);
        await date.clear();
        await date.sendKeys(data.createData.date);
        await driver.actions().sendKeys(Key.ENTER).perform();
        let value = await date.getAttribute("value");
        // Split and trim date
        const [startDate, endDate] = value.split('-').map(date => date.trim());

        // Category dropdown
        const categoryDropdown = await driver.findElement(internalActivity.category);
        await driver.sleep(3000);
        await categoryDropdown.click(); // open dropdown
        const categoryValue = await categoryDropdown.getText();
        await driver.findElement(internalActivity.selCategoryOpt).click();// select "Internal Project"

        //BU dropdown
        const buDropdown = await driver.findElement(internalActivity.b_unit);
        await driver.sleep(3000);
        await buDropdown.click(); // open dropdown
        const buValue = await buDropdown.getText();
        await driver.findElement(internalActivity.selB_unitOpt).click();// select "ACTION"

        const remark = await driver.findElement(internalActivity.remarks);
        await remark.clear();
        await remark.sendKeys(data.createData.remarks);

        const saveBTN = await driver.findElement(internalActivity.saveBTN)
        await saveBTN.click();
        
        //=== SYSTEM ALERT POP-UP CLICK OK ===
        await driver.wait(until.alertIsPresent(), 5000);
        let alert = await driver.switchTo().alert();
        await alert.accept(); 

        console.log(`Creating data Test successful!`);
        
        // === TEMPORARY NAVIGATION FOR SAVE BUTTON BUG TRANSITION ===
        await driver.get('https://test.rms2.awsys-i.com/30665/management/internal-activities'); 

        //Wait for Resource & Project Management/Internal Activity
        await driver.wait(until.urlContains('internal-activities'), 10000); //wait for screen to load

        // assert table
        await assertTable(driver,categoryValue,buValue,startDate,endDate);

        //Take screenshot and embed into Excel
        const screenshotPath = await takeScreenshot(driver, 'test_002');
        await writeResult('test_002', 'PASS', screenshotPath); // <-- Pass screenshot path

     } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_002');
            await writeResult('test_002', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }

    } finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}
module.exports = { dataCreationIA };



