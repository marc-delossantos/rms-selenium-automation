const { Builder, By, until, } = require('selenium-webdriver');
const data = require('../data/inputData');
const { login } = require('../util/login');
const assert = require('assert');
const { sideMenu } = require('../util/selector');
const { RPM_InterActiv } = require('../util/selector');
const { headerCheck } = require('../util/tableHeaderColumnCheck');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');


async function IT_003() {
      let driver;
    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        await login(driver); //go login

        const sideMenuIA = await driver.findElement(sideMenu.internalActivity);
        await sideMenuIA.click();

        // --- Wait for Resource & Project Management / Internal Activity
        await driver.wait(until.urlContains('internal-activities'), 10000); //wait for screen to load
        await driver.sleep(1000);

        let FilterLabel = await driver.findElement(By.xpath("//span[normalize-space()='SD Group']"));
        assert.strictEqual(await FilterLabel.isDisplayed(), true);
        assert.strictEqual(
            (await FilterLabel.getText()).trim(),"SD Group");
        console.log(" SD Group filter label is correct");

        FilterLabel = await driver.findElement(By.xpath("//span[normalize-space()='Business Unit']"));
        assert.strictEqual(await FilterLabel.isDisplayed(), true);
        assert.strictEqual(
            (await FilterLabel.getText()).trim(),"Business Unit");
        console.log(" Business Unit filter label is correct");

        FilterLabel = await driver.findElement(By.xpath("//span[normalize-space()='Category']"));
        assert.strictEqual(await FilterLabel.isDisplayed(), true);
        assert.strictEqual(
            (await FilterLabel.getText()).trim(),"Category");
        console.log(" Category filter label is correct");

        FilterLabel = await driver.findElement(By.xpath("//span[normalize-space()='Status']"));
        assert.strictEqual(await FilterLabel.isDisplayed(), true);
        assert.strictEqual(
            (await FilterLabel.getText()).trim(),"Status");
        console.log(" Status filter label is correct");

        const exportBtn = await driver.wait(until.elementLocated(RPM_InterActiv.BTN.exportBTN),10000);
        await driver.wait(until.elementIsVisible(exportBtn), 5000);
        await driver.wait(until.elementIsEnabled(exportBtn), 5000);
        assert.strictEqual(await exportBtn.isDisplayed(), true);
        assert.strictEqual(await exportBtn.isEnabled(), true);
        console.log(" Export Excel button is present");

        const createNewBtn = await driver.wait(until.elementLocated(RPM_InterActiv.BTN.exportBTN),10000);
        await driver.wait(until.elementIsVisible(createNewBtn), 5000);
        await driver.wait(until.elementIsEnabled(createNewBtn), 5000);
        assert.strictEqual(await createNewBtn.isDisplayed(), true);
        assert.strictEqual(await createNewBtn.isEnabled(), true);
        console.log(" Create New button is present");

        const searchBox = await driver.wait(
            until.elementLocated(RPM_InterActiv.TXTBX.searchBox),
            5000);
        assert.strictEqual(await searchBox.isDisplayed(), true);
        assert.strictEqual(await searchBox.isEnabled(), true);
        console.log(" Search box is present and ready for input");

        const clearFilterBtn = await driver.wait(until.elementLocated(RPM_InterActiv.BTN.clearAllFilter),10000);
        await driver.wait(until.elementIsVisible(clearFilterBtn), 5000);
        await driver.wait(until.elementIsEnabled(clearFilterBtn), 5000);
        assert.strictEqual(await clearFilterBtn.isDisplayed(), true);
        assert.strictEqual(await clearFilterBtn.isEnabled(), true);
        console.log(" Clear All Filters button is present");

        const burgerIcon = await driver.wait(
        until.elementLocated(sideMenu.burgerIcon),5000);
        const isDisplayed = await burgerIcon.isDisplayed();
        console.log("Burger button present:", isDisplayed );

        //table header check
        const tableHeader = RPM_InterActiv.TBL.header;
        const headerColumn = data.IAtable.Header;
        await headerCheck(driver,tableHeader,headerColumn);

        const screenshotPath = await takeScreenshot(driver, 'test_003');
        await writeResult('RPM:InterActiv_test_IT_003', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_003');
            await writeResult('RPM:InterActiv_test_IT_003', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_003,
    };
