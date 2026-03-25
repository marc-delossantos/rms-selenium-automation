const { Builder, By, until, } = require('selenium-webdriver');
const data = require('../data/inputData');
const { login } = require('../util/login');
const assert = require('assert');
const { sideMenu } = require('../util/selector');
const { RPM_InterActiv } = require('../util/selector');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');

async function IT_005() {
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

        const SDDropdown = await driver.findElement(RPM_InterActiv.DRPDWN.SDDropdown);
        await SDDropdown.click();

        const SDOptions = await driver.findElements(RPM_InterActiv.DRPDWN.SDOptions);

        const expectedSDOptions = data.dropdown.sdOptions;
        const actualSDOptions = [];
        for (const option of SDOptions) {
            await driver.executeScript("arguments[0].scrollIntoView(true);", option);

            let text = (await option.getText()).trim();

            if (text.endsWith('+')) {
                text = text.slice(0, -1).trim();
            }

            const items = text.split('\n').map(t => t.trim()).filter(t => t !== 'N/A' && t.length > 0);
            actualSDOptions.push(...items); // push each item separately
        }

        assert.deepStrictEqual(actualSDOptions, expectedSDOptions);
        console.log('Dropdown options match expected values!');

        const screenshotPath = await takeScreenshot(driver, 'test_005');
        await writeResult('RPM:InterActiv_test_IT_005', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_005');
            await writeResult('RPM:InterActiv_test_IT_005', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_005,
    };
