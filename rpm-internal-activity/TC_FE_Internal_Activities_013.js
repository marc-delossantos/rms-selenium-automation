const { Builder, By, until, } = require('selenium-webdriver');
const data = require('../data/inputData');
const { login } = require('../util/login');
const { sideMenu } = require('../util/selector');
const { RPM_InterActiv } = require('../util/selector');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');
const { tableCheck } = require('../util/tablecCheck');

async function IT_013() {
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

        const STATDropdown = await driver.findElement(RPM_InterActiv.DRPDWN.STATDropdown);
        await STATDropdown.click();
        const STATClearBtn = await driver.findElement(RPM_InterActiv.BTN.STATclearDrp);
        await STATClearBtn.click();
        const selectSTAT2 = await driver.findElement(By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div[1]/div[1]/div/div[4]/div/div/div[2]/div[2]/span`))
        await selectSTAT2.click();
        await driver.sleep(500);

        const search = await driver.findElement(RPM_InterActiv.TXTBX.searchBox);
        await search.clear();
        await search.sendKeys('prepare');

        await tableCheck(driver,RPM_InterActiv.TBL.table,'SD','SD2');
        await tableCheck(driver,RPM_InterActiv.TBL.table,'BU','DEVA');
        await tableCheck(driver,RPM_InterActiv.TBL.table,'Category','Study/Training');
        await tableCheck(driver,RPM_InterActiv.TBL.table,'Status','Inactive');

        const screenshotPath = await takeScreenshot(driver, 'test_013');
        await writeResult('RPM:InterActiv_test_IT_013', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_013');
            await writeResult('RPM:InterActiv_test_IT_013', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_013,
    };
