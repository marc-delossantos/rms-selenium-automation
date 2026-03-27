const { Builder, By, until, } = require('selenium-webdriver');
const { login } = require('../util/login');
const data = require('../data/inputData');
const assert = require('assert');
const { sideMenu, RPM_InterActiv } = require('../util/selector');
const { headerCheck } = require('../util/tableHeaderColumnCheck');
const { labelCheck } = require('../util/textCheck');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');


async function IT_022() {
      let driver;
    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        await login(driver); //go login

        const sideMenuIA = await driver.findElement(sideMenu.internalActivity);
        await sideMenuIA.click();

        // --- Wait for Resource & Project Management / Internal Activity
        await driver.wait(until.urlContains('internal-activities'), 10000); //wait for screen to load
        await driver.sleep(5000);

        const createNewBTN = await driver.findElement(RPM_InterActiv.BTN.createNewBtn);
        await createNewBTN.click();

        await labelCheck(driver,RPM_InterActiv.SUBMENU.NEW.Label.IAName,'Internal Activity Name *');
        await labelCheck(driver,RPM_InterActiv.SUBMENU.NEW.Label.Date,'Dates *');
        await labelCheck(driver,RPM_InterActiv.SUBMENU.NEW.Label.Category,'Category *');
        await labelCheck(driver,RPM_InterActiv.SUBMENU.NEW.Label.BU,'Business Unit *');
        await labelCheck(driver,RPM_InterActiv.SUBMENU.NEW.Label.Remarks,'Remarks');

        const cancelBtn = await driver.wait(
            until.elementLocated(RPM_InterActiv.SUBMENU.NEW.BTN.Cancel),
            5000);
        assert.strictEqual(await cancelBtn.isDisplayed(), true);
        assert.strictEqual(await cancelBtn.isEnabled(), true);
        console.log(" cancelBtn is present ");

        const saveBtn = await driver.wait(
            until.elementLocated(RPM_InterActiv.SUBMENU.NEW.BTN.Save),
            5000);
        assert.strictEqual(await saveBtn.isDisplayed(), true);
        assert.strictEqual(await saveBtn.isEnabled(), true);
        console.log(" saveBtn is present ");

        const assignBtn = await driver.wait(
            until.elementLocated(RPM_InterActiv.SUBMENU.NEW.BTN.Assign),
            5000);
        assert.strictEqual(await assignBtn.isDisplayed(), true);
        console.log(" assignBtn is present ");

        const searchBox = await driver.wait(
            until.elementLocated(RPM_InterActiv.SUBMENU.NEW.TXTBX.techSearch),
            5000);
        assert.strictEqual(await searchBox.isDisplayed(), true);
        assert.strictEqual(await saveBtn.isEnabled(), true);
        console.log(" searchBox is present ");

        const pageFwdBtn = await driver.wait(
            until.elementLocated(RPM_InterActiv.SUBMENU.NEW.BTN.pageFwd),
            5000);
        assert.strictEqual(await pageFwdBtn.isDisplayed(), true);
        console.log(" pageFwdBtn is present ");

        const pageBckBtn = await driver.wait(
            until.elementLocated(RPM_InterActiv.SUBMENU.NEW.BTN.pageBck),
            5000);
        assert.strictEqual(await pageBckBtn.isDisplayed(), true);
        console.log(" pageBckBtn is present ");

        const burgerIcon = await driver.wait(
        until.elementLocated(sideMenu.burgerIcon),5000);
        const isDisplayed = await burgerIcon.isDisplayed();
        console.log("Burger button present:", isDisplayed);

        //table header check
        const tableHeader = RPM_InterActiv.SUBMENU.NEW.TBL.headerColumn;
        const headerColumn = data.IAtable.HeaderNew;
        await headerCheck(driver,tableHeader,headerColumn);

        const screenshotPath = await takeScreenshot(driver, 'test_022');
        await writeResult('RPM:InterActiv_test_IT_022', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_022');
            await writeResult('RPM:InterActiv_test_IT_022', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_022,
    };
