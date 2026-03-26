const { Builder, By, until, } = require('selenium-webdriver');
const data = require('../data/inputData');
const { login } = require('../util/login');
const { sideMenu } = require('../util/selector');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');


async function IT_017() {
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

        for (let i = 3; i <= 12; i++) {
        const resize = `/html/body/div/div/div/div[2]/div/div/div[2]/div[2]/div/div[1]/div[2]/div[1]/div/div/div[${i}]/div[1]/div/div[1]`;
        const selectResize = await driver.wait(until.elementLocated(By.xpath(resize)),10000);
        const columnResizeHandle = await selectResize.findElement(By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div[2]/div/div[1]/div[2]/div[1]/div/div/div[${i}]/div[2]`));

        let randomWidth = Math.floor(Math.random() * (-10 - 300 + 1)) + 50;

        await driver.actions({ bridge: true })
            .dragAndDrop(columnResizeHandle, { x: randomWidth, y: 0 })
            .perform();


        console.log(`Column ${i} resized by ${randomWidth} pixels`);
        await driver.sleep(500);
    }

        const screenshotPath = await takeScreenshot(driver, 'test_017');
        await writeResult('RPM:InterActiv_test_IT_017', 'PASS', screenshotPath);
        
    } catch (error) {
        console.error('test failed:', error.message);
        let screenshotPath;
        if (driver) {
            screenshotPath = await takeScreenshot(driver, 'test_017');
            await writeResult('RPM:InterActiv_test_IT_017', 'FAILED', screenshotPath, error.message); // <-- Include screenshot for FAIL
        }
    }finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { 
     IT_017,
    };
