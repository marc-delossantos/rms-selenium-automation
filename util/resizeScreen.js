const { Builder, By, until } = require('selenium-webdriver');

async function resizeScreen(driver){
    const resizeTimes = 10;

        for (let t = 0; t < resizeTimes; t++) {

            const randomWidth = Math.floor(Math.random() * (1920 - 300 + 1)) + 300;   
            const randomHeight = Math.floor(Math.random() * (1080 - 300 + 1)) + 300;  

            await driver.manage().window().setRect({ width: randomWidth, height: randomHeight });
            console.log(`Resized window to ${randomWidth}x${randomHeight}`);
            await driver.sleep(3000);
        }
        // Finally, maximize the window again
        await driver.manage().window().maximize();
}

module.exports ={resizeScreen};