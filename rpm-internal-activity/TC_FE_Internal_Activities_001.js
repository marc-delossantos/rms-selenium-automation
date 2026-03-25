const { Builder, until,  } = require('selenium-webdriver');
const data = require('../data/inputData');
const { login } = require('../util/login');
const { sideMenu } = require('../util/selector');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');

async function IT_001() {
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

        const screenshotPath = await takeScreenshot(driver, 'test_001');
        await writeResult('RPM:InterActiv_test_IT_001', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_001');
            await writeResult('RPM:InterActiv_test_IT_001', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_001,
    };