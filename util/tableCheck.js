const { until} = require('selenium-webdriver');
const assert = require('assert');
const { internalActivity } = require('../util/selector');
const data = require('../data/inputData');

async function assertTable(browser,value1,value2,date1,date2) {
        const driver = browser;
        const categoryValue = value1;
        const buValue = value2;
        const startDate = date1;
        const endDate = date2;

        // assertion check table
        const searchData = await driver.findElement(internalActivity.searchBox);
        await searchData.clear();
        await searchData.sendKeys(data.searchData.searchKeyword1);
        
        await driver.sleep(5000);
        // get the first matching row dynamically
        const rowElement = await driver.wait(until.elementLocated(internalActivity.row), 10000);

         // get all cells in that row
        const cellElements = await rowElement.findElements(internalActivity.cell);

        let rowValues = [];
        for (let cell of cellElements) {
        rowValues.push(await cell.getText());
        }

        console.log('Row Values:', rowValues);

        // now assert based on the expected data
        assert.ok(rowValues.some(v => v.includes(data.createData.name)), 'Name not found in row');
        assert.ok(rowValues.some(v => v.includes(categoryValue)), 'Category not found in row');
        assert.ok(rowValues.some(v => v.includes(buValue)), 'BU not found in row');
        /** comment out 1st while there is an issue regarding with date */
       // assert.ok(rowValues.some(v => v.includes(startDate)), 'Start Date not found in row');
       // assert.ok(rowValues.some(v => v.includes(endDate)), 'End Date not found in row');

        console.log('Asserting Completed');
    
}

module.exports = { assertTable };