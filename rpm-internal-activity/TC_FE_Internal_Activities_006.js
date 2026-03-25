const { Builder, By, until, } = require('selenium-webdriver');
const data = require('../data/inputData');
const { login } = require('../util/login');
const assert = require('assert');
const { sideMenu } = require('../util/selector');
const { RPM_InterActiv } = require('../util/selector');
const { scrollTopBot } = require('../util/scroll');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');

async function IT_006() {
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
        await driver.sleep(500);

        const dropdownPanel = await driver.findElement(RPM_InterActiv.DRPDWN.BUOptions);
        const BUOptions = await driver.findElements(RPM_InterActiv.DRPDWN.BUOptions);

        await scrollTopBot(driver,dropdownPanel);
        
        const expectedBUOptions = data.dropdown.buOptions;
        const actualBUOptions = [];
        for (const option of BUOptions) {

            let text = (await option.getText()).trim();

            if (text.endsWith('+')) {
                text = text.slice(0, -1).trim();
            }

            const items = text.split('\n').map(t => t.trim()).filter(t => t !== 'N/A' && t.length > 0);
            actualBUOptions.push(...items); // push each item separately
            
        }
        

        assert.deepStrictEqual(actualBUOptions, expectedBUOptions);
        console.log('Dropdown options match expected values!');

        const screenshotPath = await takeScreenshot(driver, 'test_006');
        await writeResult('RPM:InterActiv_test_IT_006', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_006');
            await writeResult('RPM:InterActiv_test_IT_006', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_006,
    };
