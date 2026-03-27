const { Builder, Key,until, } = require('selenium-webdriver');
const { login } = require('../util/login');
const { sideMenu, RPM_InterActiv } = require('../util/selector');
const { textContentCheck } = require('../util/textCheck');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');


async function IT_024() {
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

        let category = await driver.wait(until.elementLocated(RPM_InterActiv.SUBMENU.NEW.DRPDWN.Category),10000);
        await category.click();
        await category.sendKeys('Internal Activity');
        await driver.actions().sendKeys(Key.ENTER).perform();
        await textContentCheck(driver,RPM_InterActiv.SUBMENU.NEW.TXTBX.InternalActivity,'Internal Activity');

        let screenshotPath = await takeScreenshot(driver, 'test_024');
        await writeResult('RPM:InterActiv_test_IT_024', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_024');
            await writeResult('RPM:InterActiv_test_IT_024', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_024,
    };
