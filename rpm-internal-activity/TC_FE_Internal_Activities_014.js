const { Builder, By, until, } = require('selenium-webdriver');
const data = require('../data/inputData');
const { login } = require('../util/login');
const { sideMenu } = require('../util/selector');
const { RPM_InterActiv } = require('../util/selector');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');


async function IT_014() {
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
        const SDClearBtn = await driver.findElement(RPM_InterActiv.BTN.SDclearDrp);
        await SDClearBtn.click();
        const selectSD2 = await driver.findElement(By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div[1]/div[1]/div/div[1]/div/div/div[2]/div[3]/span`))
        await selectSD2.click();
        await driver.sleep(500);

        const BUDropdown = await driver.findElement(RPM_InterActiv.DRPDWN.BUDropdown);
        await BUDropdown.click();
        const BUClearBtn = await driver.findElement(RPM_InterActiv.BTN.BUclearDrp);
        await BUClearBtn.click();
        const selectDEVA = await driver.findElement(By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div[1]/div[1]/div/div[2]/div/div/div[2]/div[14]/span`))
        await selectDEVA.click();
        await driver.sleep(500);

        const CATDropdown = await driver.findElement(RPM_InterActiv.DRPDWN.CATDropdown);
        await CATDropdown.click();
        const CATClearBtn = await driver.findElement(RPM_InterActiv.BTN.CATclearDrp);
        await CATClearBtn.click();
        const selectCAT3 = await driver.findElement(By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div[1]/div[1]/div/div[3]/div/div/div[2]/div[3]/span`))
        await selectCAT3.click();
        await driver.sleep(500);

        let STATDropdown = await driver.findElement(RPM_InterActiv.DRPDWN.STATDropdown);
        await STATDropdown.click();
        const STATClearBtn = await driver.findElement(RPM_InterActiv.BTN.STATclearDrp);
        await STATClearBtn.click();
        const selectSTAT2 = await driver.findElement(By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div[1]/div[1]/div/div[4]/div/div/div[2]/div[2]/span`))
        await selectSTAT2.click();
        STATDropdown = await driver.findElement(RPM_InterActiv.DRPDWN.STATDropdown);
        await STATDropdown.click();
        await driver.sleep(500);

        const search = await driver.findElement(RPM_InterActiv.TXTBX.searchBox);
        await search.clear();
        await search.sendKeys('prepare');

        await driver.sleep(3000);
        const clearFilterBtn = await driver.findElement(RPM_InterActiv.BTN.clearAllFilter);
        await clearFilterBtn.click();

        const screenshotPath = await takeScreenshot(driver, 'test_014');
        await writeResult('RPM:InterActiv_test_IT_014', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_014');
            await writeResult('RPM:InterActiv_test_IT_014', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_014,
    };
