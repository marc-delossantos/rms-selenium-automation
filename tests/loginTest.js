const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');


async function loginTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        await driver.get('https://test.rms2.awsys-i.com/login');

        // --- Locate elements
        const emailInput = await driver.findElement(By.id('floatingInput'));
        const passwordInput = await driver.findElement(By.id('floatingPassword'));
        const loginButton = await driver.findElement(
            By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[3]/button[2]')
        );

        // --- Assertions
        assert.strictEqual(await emailInput.isDisplayed(), true);
        assert.strictEqual(await passwordInput.isDisplayed(), true);
        assert.strictEqual(await loginButton.isDisplayed(), true);

        // --- Input credentials
        await emailInput.clear();
        await passwordInput.clear();
        await emailInput.sendKeys('marc.delossantos@awsys-i.com');
        await passwordInput.sendKeys('jeffPassword123..');

        assert.strictEqual(
            await emailInput.getAttribute('value'),
            'marc.delossantos@awsys-i.com'
        );

        // --- Click login
        await loginButton.click();

        // --- Wait for dashboard/profile
        /*const profile = await driver.wait(
            until.elementLocated(By.id('dropdown-profile')),
            5000
        );
        await driver.wait(until.elementIsVisible(profile), 10000);
        assert.strictEqual(await profile.isDisplayed(), true);
        */
        await driver.wait(until.urlContains('resource-utilization'), 10000); //wait for screen to load

        console.log(' Login test passed');

        // --- Take screenshot and embed into Excel
        const screenshotPath = await takeScreenshot(driver, 'test_001');
        await writeResult('test_001', 'PASS', screenshotPath); // <-- Pass screenshot path

    } catch (error) {
        console.error(' Login test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_001');
            await writeResult('test_001', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }


    } finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { loginTest };
