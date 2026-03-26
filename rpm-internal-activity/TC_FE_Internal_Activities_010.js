const { Builder, By, until, } = require('selenium-webdriver');
const data = require('../data/inputData');
const { login } = require('../util/login');
const { sideMenu } = require('../util/selector');
const { RPM_InterActiv } = require('../util/selector');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');
const { tableCheck } = require('../util/tablecCheck');

async function IT_010() {
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

        const BUDropdown = await driver.findElement(RPM_InterActiv.DRPDWN.BUDropdown);
        await BUDropdown.click();
        const BUClearBtn = await driver.findElement(RPM_InterActiv.BTN.BUclearDrp);
        await BUClearBtn.click();
        const selectBU1 = await driver.findElement(By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div/div[2]/div[1]/span`))
        await selectBU1.click();
        await driver.sleep(500);
        
        await tableCheck(driver,RPM_InterActiv.TBL.table,'BU','ACTION');

        const screenshotPath = await takeScreenshot(driver, 'test_010');
        await writeResult('RPM:InterActiv_test_IT_010', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_010');
            await writeResult('RPM:InterActiv_test_IT_010', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_010,
    };
