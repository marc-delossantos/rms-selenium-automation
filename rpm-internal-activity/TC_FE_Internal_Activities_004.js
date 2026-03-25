const { Builder, By, until, } = require('selenium-webdriver');
const data = require('../data/inputData');
const { login } = require('../util/login');
const assert = require('assert');
const { sideMenu } = require('../util/selector');
const { RPM_InterActiv } = require('../util/selector');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');

async function IT_004() {
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

        const search = await driver.findElement(RPM_InterActiv.TXTBX.searchBox);
        await search.clear();
        await search.sendKeys(data.searchSampData.searchKeyword2);

        //assert
        await driver.wait(until.elementsLocated(RPM_InterActiv.TBL.tableColumns), 10000);
        let rows = await driver.findElements(RPM_InterActiv.TBL.tableColumns);
        let matchFound = false;

        for (let row of rows) {
            let nameCell = await row.findElement(RPM_InterActiv.TBL.tableName);
            let cellText = await nameCell.getText();

            if (cellText.includes(data.searchSampData.searchKeyword2)) {
                matchFound = true;
                break;
            }
        }
        assert.ok(matchFound, `No table row contains the keyword: ${data.searchSampData.searchKeyword2}`);
        console.log("Keyword found in table!");

        const screenshotPath = await takeScreenshot(driver, 'test_004');
        await writeResult('RPM:InterActiv_test_IT_004', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_004');
            await writeResult('RPM:InterActiv_test_IT_004', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_004,
    };
