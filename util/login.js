const { Builder, By, until } = require('selenium-webdriver');
const data = require('../data/inputData');
const { loginSelectors } = require('../util/selector');

async function login(browser) {
        const driver = browser;
        await driver.get('https://test.rms2.awsys-i.com/login');

        const emailInput = await driver.findElement(loginSelectors.emailInput);
        const passwordInput = await driver.findElement(loginSelectors.passwordInput);
        const loginButton = await driver.findElement(loginSelectors.loginButton);
        
        await emailInput.clear();
        await passwordInput.clear();
        await emailInput.sendKeys(data.login.email);
        await passwordInput.sendKeys(data.login.password);
        await loginButton.click();

        await driver.wait(until.urlContains('resource-utilization'), 10000); //wait for screen to load
        await driver.sleep(1000);
}
module.exports = { login };