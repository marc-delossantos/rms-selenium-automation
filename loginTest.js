const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

async function takeScreenshot(driver, fileName = 'login_screenshot') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(`./screenshot`, `${fileName}_${timestamp}.png`);
    const image = await driver.takeScreenshot();
    fs.writeFileSync(screenshotPath, image, 'base64');
    console.log(`Screenshot saved at: ${screenshotPath}`);
}

async function loginTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        await driver.get('https://test.rms2.awsys-i.com/login');
        
        const emailInput = await driver.findElement(By.id('floatingInput'));
        const passwordInput = await driver.findElement(By.id('floatingPassword'));
        const loginButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[3]/button[2]'));

        assert.strictEqual(await emailInput.isDisplayed(), true);
        assert.strictEqual(await passwordInput.isDisplayed(), true);
        assert.strictEqual(await loginButton.isDisplayed(), true);

        await emailInput.clear();
        await passwordInput.clear();
        await emailInput.sendKeys('marc.delossantos@awsys-i.com');
        await passwordInput.sendKeys('jeffPassword123..');

        assert.strictEqual(await emailInput.getAttribute('value'), 'marc.delossantos@awsys-i.com');

        await loginButton.click();

        const profile = await driver.wait(
            until.elementLocated(By.id('dropdown-profile')),
            5000
        );
        await driver.wait(
            until.elementIsVisible(profile),
            10000
        );
        assert.strictEqual(await profile.isDisplayed(), true);
        console.log('Login test passed');

        await takeScreenshot(driver, 'login_success');
        await driver.sleep(5000);
         

    } catch (error) {
        console.error('Login test failed:', error.message);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}
loginTest();
module.exports = { loginTest };
