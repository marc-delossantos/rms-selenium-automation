const { Builder, By, until } = require('selenium-webdriver');

async function scrollTopBot(driver, element) {
    let lastScrollTop = -1;
    let reachedBottom = false;

    while (!reachedBottom) {
        const scrollTop = await driver.executeScript(
            "let el = arguments[0]; let old = el.scrollTop; el.scrollTop += el.clientHeight; return el.scrollTop;",
            element
        );

        if (scrollTop === lastScrollTop) {
            reachedBottom = true;
        } else {
            lastScrollTop = scrollTop;
        }

        await driver.sleep(2000);
    }
}

async function scrollLeftRight(driver, element) {
    let lastScrollLeft = -1;
    let reachedRight = false;

    while (!reachedRight) {
        const scrollLeft = await driver.executeScript(
            "let el = arguments[0]; let old = el.scrollLeft; el.scrollLeft += el.clientWidth; return el.scrollLeft;",
            element
        );

        if (scrollLeft === lastScrollLeft) {
            reachedRight = true;
        } else {
            lastScrollLeft = scrollLeft;
        }

        await driver.sleep(2000); // small pause for smooth scrolling or lazy-loaded content
    }
}

module.exports = { scrollTopBot, scrollLeftRight };

