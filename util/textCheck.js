const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function labelCheck(driver,labelPath,expectedValue){
    let FilterLabel = await driver.findElement(labelPath);
                assert.ok(await FilterLabel.isDisplayed());
                let text = (await FilterLabel.getText()).trim();
                assert.strictEqual(text, expectedValue);
                console.log(`${expectedValue} filter label is correct`);
}

async function textContentCheck(driver, elemtPath, expectedValue) {
    let element = await driver.findElement(elemtPath);
    let text = (await element.getAttribute("value")).trim(); 
    assert.strictEqual(text, expectedValue);

    console.log(`${expectedValue} in target element : text value retained`);
}

module.exports ={labelCheck,textContentCheck};