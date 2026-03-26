const { Builder, By, until, } = require('selenium-webdriver');
const { login } = require('../util/login');
const data = require('../data/inputData');
const { sideMenu, RPM_InterActiv } = require('../util/selector');
const { headerCheck } = require('../util/tableHeaderColumnCheck');
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

        let FilterLabel = await driver.findElement(By.xpath(RPM_InterActiv.SUBMENU.NEW.Label.internalActivity));
                assert.strictEqual(await FilterLabel.isDisplayed(), true);
                assert.strictEqual(
                    (await FilterLabel.getText()).trim(),"Internal Activity Name *");
                console.log(" Internal Activity Name * filter label is correct");

        FilterLabel = await driver.findElement(By.xpath(RPM_InterActiv.SUBMENU.NEW.Label.Date));
                assert.strictEqual(await FilterLabel.isDisplayed(), true);
                assert.strictEqual(
                    (await FilterLabel.getText()).trim(),"Dates *");
                console.log(" Dates * filter label is correct");

        FilterLabel = await driver.findElement(By.xpath(RPM_InterActiv.SUBMENU.NEW.Label.Category));
                assert.strictEqual(await FilterLabel.isDisplayed(), true);
                assert.strictEqual(
                    (await FilterLabel.getText()).trim(),"Category *");
                console.log(" Category * filter label is correct");

        FilterLabel = await driver.findElement(By.xpath(RPM_InterActiv.SUBMENU.NEW.Label.BU));
                assert.strictEqual(await FilterLabel.isDisplayed(), true);
                assert.strictEqual(
                    (await FilterLabel.getText()).trim(),"Business Unit *");
                console.log(" Business Unit * filter label is correct");

        FilterLabel = await driver.findElement(By.xpath(RPM_InterActiv.SUBMENU.NEW.Label.Remarks));
                assert.strictEqual(await FilterLabel.isDisplayed(), true);
                assert.strictEqual(
                    (await FilterLabel.getText()).trim(),"Remarks");
                console.log(" Remarks filter label is correct");

        const cancelBtn = await driver.wait(
            until.elementLocated(RPM_InterActiv.SUBMENU.NEW.BTN.Cancel),
            5000);
        assert.strictEqual(await cancelBtn.isDisplayed(), true);
        assert.strictEqual(await cancelBtn.isEnabled(), true);
        console.log(" cancelBtn is present ");

        const saveBtn = await driver.wait(
            until.elementLocated(RPM_InterActiv.SUBMENU.NEW.BTN.saveBtn),
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
