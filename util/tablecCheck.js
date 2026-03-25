const { By } = require('selenium-webdriver');

async function tableCheck(driver, tableXPath, headerName, valueMatch) {
    const tableElement = await driver.findElement(tableXPath);

    // Get headers
    const headers = await tableElement.findElements(By.css('div[role="columnheader"]'));
    let columnIndex = -1;
    for (let i = 0; i < headers.length; i++) {
        const text = ((await headers[i].getText()) || '').trim();
        if (text === headerName) {
            columnIndex = i;
            break;
        }
    }
    if (columnIndex === -1) throw new Error(`Column "${headerName}" not found`);

    // Find scrollable container
    const scrollContainer = await tableElement.findElement(By.css('.MuiDataGrid-virtualScroller'));

    let lastScrollTop = -1;
    let reachedBottom = false;
    const checkedRows = new Set();

    while (!reachedBottom) {
        const rows = await scrollContainer.findElements(By.css('div[role="row"][aria-rowindex]'));

        for (let row of rows) {
            const rowIndex = await row.getAttribute('aria-rowindex');
            if (checkedRows.has(rowIndex)) continue; // skip already checked rows
            checkedRows.add(rowIndex);

            const cells = await row.findElements(By.css('div[role="cell"]'));
            if (!cells[columnIndex]) throw new Error(`Row ${rowIndex}: Column "${headerName}" cell not found`);
            const cellText = ((await cells[columnIndex].getText()) || '').trim();
            if (cellText !== valueMatch) throw new Error(`Row ${rowIndex}: Expected "${valueMatch}", found "${cellText}"`);
        }

        // Scroll down
        const scrollTop = await driver.executeScript(
            "let el = arguments[0]; let old = el.scrollTop; el.scrollTop += el.clientHeight; return el.scrollTop;",
            scrollContainer
        );

        if (scrollTop === lastScrollTop) reachedBottom = true; // reached bottom
        else lastScrollTop = scrollTop;

        await driver.sleep(200); // wait for rows to render
    }

    console.log(` All rows under column "${headerName}" match "${valueMatch}"`);
}

module.exports = { tableCheck };
