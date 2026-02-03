const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');
const { writeResult } = require('../util/excelReporter');
const { takeScreenshot } = require('../util/screenshot');

async function filterData() {
    let driver;

    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        await driver.get('https://test.rms2.awsys-i.com/login');

        const emailInput = await driver.findElement(By.id('floatingInput'));
        const passwordInput = await driver.findElement(By.id('floatingPassword'));
        const loginButton = await driver.findElement(
            By.xpath('//button[contains(text(),"Login")]')
        );

        await emailInput.sendKeys('marc.delossantos@awsys-i.com');
        await passwordInput.sendKeys('jeffPassword123..');
        await loginButton.click();

        await driver.wait(until.urlContains('resource-utilization'), 10000);

        const sideMenuIA = await driver.findElement(
            By.xpath('//a[contains(text(),"Internal Activity")]')
        );
        await sideMenuIA.click();

        await driver.wait(until.urlContains('internal-activities'), 10000);
        await driver.sleep(5000);
        /* ================= SD Group DROPDOWN ================= */

        const expectedSdGrpOptions = [
            '',
            '',
            ''
        ];

        const sdGrpOptions = await driver.findElements(
            By.xpath("//button[.//span[text()='SD Group']]")
        );

        const actualSdGrpOptions = [];
        for (const option of sdGrpOptions) {
            actualSdGrpOptions.push((await option.getText()).trim());
        }

        assert.deepStrictEqual(actualSdGrpOptions, expectedSdGrpOptions);

        /* ================= BU DROPDOWN ================= */

        const expectedBUOptions = [
            'ACTION',
            'ACTIONCEB',
            'ACTIONMNL',
            'ADMIN',
            'BUSINESSDEVELOPMENT',
            'BUSINESSOPERATIONS',
            'C4I',
            'CEBUOPERATIONS',
            'CLIENT',
            'CORPORATEPLANNING',
            'D2',
            'Department Department 12',
            'DEV2',
            'DEV3',
            'DEV5',
            'DEV6',
            'DEVA',
            'DEVB',
            'DEVC',
            'DEVD',
            'DEVE',
            'DEVF',
            'DEVG',
            'DEVH',
            'DEVI',
            'DEVJ',
            'DEVK',
            'DEVL',
            'DEVM',
            'DEVN',
            'DEVO',
            'DEVP',
            'DEVQ',
            'DX',
            'EMBSOL',
            'ESD',
            'ESDMGMT',
            'FINANCE',
            'HAKEN',
            'HRD',
            'MIS',
            'QANDS',
            'RESOURCEMANAGEMENT',
            'SOLUTIONDEVELOPMENT'
        ];

        const BUOptions = await driver.findElements(
            By.xpath("//button[.//span[text()='Business Unit']]")
        );

        const actualBUOptions = [];
        for (const option of BUOptions) {
            actualBUOptions.push((await option.getText()).trim());
        }

        assert.deepStrictEqual(actualBUOptions, expectedBUOptions);

        /* ================= CATEGORY DROPDOWN ================= */

        const expectedCategoryOptions = [
            'Internal Project',
            'Operations',
            'Study/Training'
        ];

        const categoryOptions = await driver.findElements(
            By.xpath("//button[.//span[text()='Category']]")
        );

        const actualCategoryOptions = [];
        for (const option of categoryOptions) {
            actualCategoryOptions.push((await option.getText()).trim());
        }

        assert.deepStrictEqual(actualCategoryOptions, expectedCategoryOptions);

         /* ================= STATUS DROPDOWN ================= */

        const expectedStatusOptions = [
            'Active',
            'Inactive'
        ];

        const statusOptions = await driver.findElements(
            By.xpath("//button[.//span[text()='Status']]")
        );

        const actualStatusOptions = [];
        for (const option of statusOptions) {
            actualSdGrpOptions.push((await option.getText()).trim());
        }

        assert.deepStrictEqual(actualStatusOptions, expectedStatusOptions);

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
