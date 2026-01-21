const { Builder, By, until } = require('selenium-webdriver');

async function login() {
    let driver;
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        await driver.get('https://test.rms2.awsys-i.com/login');

        const emailInput = await driver.findElement(By.id('floatingInput'));
        const passwordInput = await driver.findElement(By.id('floatingPassword'));
        const loginButton = await driver.findElement(
            By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[3]/button[2]')
        );

        await emailInput.clear();
        await passwordInput.clear();
        await emailInput.sendKeys('marc.delossantos@awsys-i.com');
        await passwordInput.sendKeys('jeffPassword123..');
        await loginButton.click();
}
module.exports = { login };