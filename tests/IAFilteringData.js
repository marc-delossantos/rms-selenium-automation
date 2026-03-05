const { Builder, By, until, Key } = require('selenium-webdriver');
const data = require('../data/inputData');
const assert = require('assert');
const { login } = require('../util/login');
const { sideMenu } = require('../util/selector');
const { internalActivity } = require('../util/selector');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');

async function filterData() {
    let driver;

    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        await login(driver); //go login

        const sideMenuIA = await driver.findElement(sideMenu.internalActivity);
        await sideMenuIA.click();

        // --- Wait for Resource & Project Management/Internal Activity
        await driver.wait(until.urlContains('internal-activities'), 10000); //wait for screen to load

        /* ================= SD Group DROPDOWN ================= */

        const expectedSdGrpOptions = data.dropdown.sdOptions;

        const sdGrpOptions = await driver.findElements(internalActivity.sdGrp);

        const actualSdGrpOptions = [];
        for (const option of sdGrpOptions) {
            actualSdGrpOptions.push((await option.getText()).trim());
        }

        assert.deepStrictEqual(actualSdGrpOptions, expectedSdGrpOptions);
        console.log('Dropdown options match expected values!');
        /* ================= BU DROPDOWN ================= */

        const expectedBUOptions = data.dropdown.buOptions;

        const BUOptions = await driver.findElements(internalActivity.bu);

        const actualBUOptions = [];
        for (const option of BUOptions) {
            actualBUOptions.push((await option.getText()).trim());
        }

        assert.deepStrictEqual(actualBUOptions, expectedBUOptions);
        console.log('Dropdown options match expected values!');
        /* ================= CATEGORY DROPDOWN ================= */

        const expectedCategoryOptions = data.dropdown.category;

        const categoryOptions = await driver.findElements(internalActivity.category);

        const actualCategoryOptions = [];
        for (const option of categoryOptions) {
            actualCategoryOptions.push((await option.getText()).trim());
        }

        assert.deepStrictEqual(actualCategoryOptions, expectedCategoryOptions);
        console.log('Dropdown options match expected values!');
         /* ================= STATUS DROPDOWN ================= */

        const expectedStatusOptions = data.dropdown.status;

        const statusOptions = await driver.findElements(internalActivity.status);

        const actualStatusOptions = [];
        for (const option of statusOptions) {
            actualSdGrpOptions.push((await option.getText()).trim());
        }

        assert.deepStrictEqual(actualStatusOptions, expectedStatusOptions);
        console.log('Dropdown options match expected values!');
        await writeResult('test_004', 'PASSED');

    } catch (error) {
        console.error('Filter test failed:', error.message);

        if (driver) {
            const screenshotPath = await takeScreenshot(driver, 'test_004');
            await writeResult('test_004', 'FAILED', screenshotPath, error.message);
        }

    } finally {
        if (driver) {
            await driver.sleep(3000);
            await driver.quit();
        }
    }
}

module.exports = { filterData };
