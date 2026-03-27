const { Builder, Key,until, } = require('selenium-webdriver');
const { login } = require('../util/login');
const { sideMenu, RPM_InterActiv } = require('../util/selector');
const { textContentCheck } = require('../util/textCheck');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');


async function IT_023() {
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

        let IAName = await driver.wait(until.elementLocated(RPM_InterActiv.SUBMENU.NEW.TXTBX.InternalActivity),10000);
        await IAName.clear();
        await IAName.sendKeys('Sample text only');

        let date = await driver.wait(until.elementLocated(RPM_InterActiv.SUBMENU.NEW.TXTBX.Date),10000);
        await date.clear();
        await date.sendKeys('2026/03/19 - 2026/04/16');
        await driver.actions().sendKeys(Key.ENTER).perform();
        

        let remark = await driver.wait(until.elementLocated(RPM_InterActiv.SUBMENU.NEW.TXTBX.Remarks),10000);
        await remark.clear();
        await remark.sendKeys('testing automation test remarks');
        
        await textContentCheck(driver,RPM_InterActiv.SUBMENU.NEW.TXTBX.InternalActivity,'Sample text only');
        await textContentCheck(driver,RPM_InterActiv.SUBMENU.NEW.TXTBX.Date,'2026/03/19 - 2026/04/16');
        await textContentCheck(driver,RPM_InterActiv.SUBMENU.NEW.TXTBX.Remarks,'testing automation test remarks');

        let screenshotPath = await takeScreenshot(driver, 'test_023');
        await writeResult('RPM:InterActiv_test_IT_023', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_023');
            await writeResult('RPM:InterActiv_test_IT_023', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_023,
    };
