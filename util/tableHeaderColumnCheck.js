
async function headerCheck(driver,target,headerColumns) {

const TableHeaders = await driver.findElements(target);

        const expectedTableHeaders = headerColumns;
        const actualTableHeaders = [];
        for (const option of TableHeaders) {
            await driver.executeScript("arguments[0].scrollIntoView(true);", option);

            let text = (await option.getText()).trim();

            if (text.endsWith('+')) {
                text = text.slice(0, -1).trim();
            }

            const items = text.split('\n').map(t => t.trim()).filter(t => t !== 'N/A' && t.length > 0);
            actualTableHeaders.push(...items); // push each item separately
        }

        assert.deepStrictEqual(actualTableHeaders, expectedTableHeaders);
        console.log('Table Headers match expected values!');

}
module.exports = { headerCheck };