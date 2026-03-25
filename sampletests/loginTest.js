const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { loginSelectors } = require('../util/selector');
const data = require('../data/inputData');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');


async function loginTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        await driver.get('https://test.rms2.awsys-i.com/login');

        // --- Locate elements
        const emailInput = await driver.findElement(loginSelectors.emailInput);
        const passwordInput = await driver.findElement(loginSelectors.passwordInput);
        const loginButton = await driver.findElement(loginSelectors.loginButton);

        // --- Assertions
        assert.strictEqual(await emailInput.isDisplayed(), true);
        assert.strictEqual(await passwordInput.isDisplayed(), true);
        assert.strictEqual(await loginButton.isDisplayed(), true);

        // --- Input credentials
        await emailInput.clear();
        await passwordInput.clear();
        await emailInput.sendKeys(data.login.email);
        await passwordInput.sendKeys(data.login.password);

        assert.strictEqual(
            await emailInput.getAttribute('value'),
            data.login.email
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
