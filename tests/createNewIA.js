const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');

async function dataCreationIA() {
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

        const createNewBTN = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[1]/div/div/div/div/div/div[2]/button'));
        await createNewBTN.click();

        // --- Wait for Resource & Project Management/Internal Activity/Create Internal Activity
        await driver.wait(until.urlContains('create-internal-activities'), 10000); //wait for screen to load

        const ia_name = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div[1]/div[1]/div/div/input'));
        const date = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[1]/div/div/div/div/div/input'));
        
       // const expectedCategoryOptions = ['Select Category','Internal Project', 'Operations','Study/Training'];
        /*const actualCategoryOptions = [];
            for (const option of categoryOptions) {
             actualCategoryOptions.push(await option.getText());
            }
            assert.deepStrictEqual(actualCategoryOptions, expectedCategoryOptions); //check category dropdown option list
        */
        /*const expectedBUOptions = ['Select Business Unit','ACTION', 'ACTIONCEB','ACTIONMNL','ADMIN','BUSINESSDEVELOPMENT','BUSINESSOPERATIONS','C4I','CEBUOPERATIONS',
            'CLIENT','CORPORATEPLANNING','D2','Department Department 12','DEV2','DEV3','DEV5','DEV6','DEVA','DEVB','DEVC','DEVD','DEVE','DEVF','DEVG',
            'DEVH','DEVI','DEVJ','DEVK','DEVL','DEVM','DEVN','DEVO','DEVP','DEVQ','DX','EMBSOL','ESD','ESDMGMT','FINANCE','HAKEN',
            'HRD','MIS','QANDS','RESOURCEMANAGEMENT','SOLUTIONDEVELOPMENT'];
        */
        /*const actualBUOptions = [];
            for (const option of BUOptions) {
             actualBUOptions.push(await option.getText());
            }
            assert.deepStrictEqual(actualBUOptions, expectedBUOptions); //check BU dropdown option list
        */
        const remark = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[2]/div/div/textarea[1]'));
        const saveBTN = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[2]/div/div/div[2]/div[2]/button[2]'))
        
        //create internal activity form
        await ia_name.sendKeys('Sample2');
        await date.sendKeys('2026/01/21 - 2026/02/28');
        const categoryDropdown = await driver.findElement(
        By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div[1]/div[2]/div/div/div'),10000
        );

        // Category dropdown
        await categoryDropdown.click(); // open dropdown
        await driver.findElement(
        By.xpath("/html/body/div[2]/div[3]/ul/li[2]") // select "Internal Project"
        ).click();

        //BU dropdown
        const buDropdown = await driver.findElement(
        By.xpath('/html/body/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div[1]/div[3]/div/div/div'),10000
        );
        await buDropdown.click(); // open dropdown
        await driver.findElement(
        By.xpath("/html/body/div[2]/div[3]/ul/li[2]") // select "ACTION"
        ).click();

        await remark.sendKeys('testing only');

        // --- Assertions
        const iaNameValue = await ia_name.getAttribute('value');
        assert.strictEqual(iaNameValue,'Sample2','IA Name input value is incorrect');

        const dateValue = await date.getAttribute('value');
        assert.strictEqual(dateValue,'2026/01/21 - 2026/02/28','Date input value is incorrect');

        const selectedCategoryText = await categoryDropdown.getText();
        assert.strictEqual(selectedCategoryText.trim(),'Internal Project','Category dropdown selection failed');

        const selectedBUText = await buDropdown.getText();
        assert.strictEqual(selectedBUText.trim(),'ACTION','BU dropdown selection failed');

        const remarkValue = await remark.getAttribute('value');
        assert.strictEqual(remarkValue,'testing only','Remark textarea value is incorrect');
        await saveBTN.click();
        console.log(` Creating data Test successful!`);

        // --- Wait for Resource & Project Management/Internal Activity
        await driver.wait(until.urlContains('internal-activities'), 10000); //wait for screen to load

        // --- Take screenshot and embed into Excel
        const screenshotPath = await takeScreenshot(driver, 'test_001');
        await writeResult('test_002', 'PASS', screenshotPath); // <-- Pass screenshot path

     } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_001');
            await writeResult('test_002', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }

    } finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}
module.exports = { dataCreationIA };