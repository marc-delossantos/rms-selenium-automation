const { By } = require('selenium-webdriver');

async function tableCheck(driver, tableXPath, headerName, valueMatch) {
    const tableElement = await driver.findElement(tableXPath);

    // Find header by text
    const header = await tableElement.findElement(
        By.xpath(`.//div[@role="columnheader"]//div[text()="${headerName}"]/ancestor::div[@role="columnheader"]`)
    );

    const field = await header.getAttribute('data-field');

    // Scroll container
    const scrollContainer = await tableElement.findElement(
        By.css('.MuiDataGrid-virtualScroller')
    );

    let lastScrollTop = -1;
    let reachedBottom = false;
    const checkedRows = new Set();

    while (!reachedBottom) {
        const rows = await scrollContainer.findElements(
            By.css('div[role="row"][aria-rowindex]')
        );

        for (let row of rows) {
            const rowIndex = parseInt(await row.getAttribute('aria-rowindex'));

            //Skip header / invalid rows
            if (!rowIndex || rowIndex <= 1) continue;

            if (checkedRows.has(rowIndex)) continue;
            checkedRows.add(rowIndex);

            // Use data-field
            const cell = await row.findElement(By.css(`div[data-field="${field}"]`));

            let rawText = await driver.executeScript(
                "return arguments[0].textContent;",
                cell
            );

            let cellText = (rawText || '').trim();

            if (!cellText) {
                const titleText = await cell.getAttribute('title');
                if (titleText) {
                    cellText = titleText.trim();
                }
            }

            // Assertion
            if (cellText !== valueMatch) {
                throw new Error(
                    `Row ${rowIndex}: Expected "${valueMatch}", found "${cellText}"`
                );
            }
        }

        // Scroll down
        const scrollTop = await driver.executeScript(
            "let el = arguments[0]; let old = el.scrollTop; el.scrollTop += el.clientHeight; return el.scrollTop;",
            scrollContainer
        );

        if (scrollTop === lastScrollTop) reachedBottom = true;
        else lastScrollTop = scrollTop;

        await driver.sleep(200);
    }

    console.log(` All rows under column "${headerName}" match "${valueMatch}"`);
}

module.exports = { tableCheck };
