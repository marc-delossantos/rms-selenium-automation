const { Builder, By, until } = require('selenium-webdriver');

async function clickUntil(driver,path){

    let button = await driver.findElement(path);
     await driver.executeScript("arguments[0].scrollIntoView(true);", button);

    while (true) {
        const isEnabled = await button.isEnabled();

        if (!isEnabled) {
            console.log('Button is now disabled');
            break;
        }

        await button.click();
        await driver.sleep(500);
        // wait for UI update (important)
    }
}
module.exports ={clickUntil};