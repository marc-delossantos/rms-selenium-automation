const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');

async function updateDataIA() {
      let driver;
    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        
        await driver.get('https://test.rms2.awsys-i.com/login');
        
        const emailInput = await driver.findElement(By.id('floatingInput'));
        const passwordInput = await driver.findElement(By.id('floatingPassword'));
        const loginButton = await driver.findElement( By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[3]/button[2]'));
        
        await emailInput.clear();
        await passwordInput.clear();
        await emailInput.sendKeys('marc.delossantos@awsys-i.com');
        await passwordInput.sendKeys('jeffPassword123..');
        await loginButton.click();

        await driver.wait(until.urlContains('resource-utilization'), 10000); //wait for screen to load

        const sideMenuIA = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[1]/div/div/div[3]/ul/li[3]/a'));
        await sideMenuIA.click();

        // --- Wait for Resource & Project Management/Internal Activity
        await driver.wait(until.urlContains('internal-activities'), 10000); //wait for screen to load

        const optionBTN = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div[1]/div[2]/div[2]/div/div[1]/div[2]/div/button'));
        await optionBTN.click();
        const viewBTN = await driver.findElement(By.xpath('//html/body/div[2]/button'))
        await viewBTN.click();

        // Wait for Resource & Project Management/Internal Activity/Update Internal Activity
        await driver.wait(until.urlContains('update-internal-activities'), 10000); //wait for screen to load

        const ia_name = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div[1]/div[1]/div/div/input'));
        const date = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[1]/div/div/div/div/div/input'));
        
        const remark = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[2]/div/div/textarea[1]'));
        const saveBTN = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[2]/button[2]'))
        
        //Update Internal Activity form
        await driver.sleep(3000);
        await ia_name.clear();
        await ia_name.sendKeys('Sample3');
        await date.clear();
        await date.sendKeys('2026/01/21 - 2026/02/28');
        const categoryDropdown = await driver.findElement(
        By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div[1]/div[2]/div/div/div'),10000
        );

        // Category dropdown
        await categoryDropdown.click(); // open dropdown
        await driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[2]") // select "Internal Project"
        ).click();

        //BU dropdown
        const buDropdown = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div[1]/div[3]/div/div/div'),10000
        );
        await buDropdown.click(); // open dropdown
        await driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[5]") // select "ACTION"
        ).click();

        await remark.clear();
        await remark.sendKeys('testing only update');
        await saveBTN.click();
        await driver.actions().sendKeys(Key.ENTER).perform();

        //Wait for Resource & Project Management/Internal Activity
        await driver.wait(until.urlContains('internal-activities'), 10000); //wait for screen to load

        // assertion check table
        const searchData = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[2]/div/div/div[2]/div[1]/div/div[2]/div[1]/input'));
        await searchData.clear();
        await searchData.sendKeys('Sample3');

        const updatedRow = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div[1]/div[2]/div[2]/div]')),10000);
        const rowText = await updatedRow.getText();

        assert.ok(rowText.includes('Sample3'));
        assert.ok(rowText.includes('Internal Project'));
        assert.ok(rowText.includes('ACTION'));
        assert.ok(rowText.includes('2026/01/21'));

     } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_001');
            await writeResult('test_003', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }

    } finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}
module.exports = { updateDataIA };