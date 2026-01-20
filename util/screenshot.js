const fs = require('fs');
const path = require('path');

async function takeScreenshot(driver, fileName) {
    if (!fs.existsSync('./screenshot')) {
        fs.mkdirSync('./screenshot');
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join('./screenshot', `${fileName}_${timestamp}.png`);
    const image = await driver.takeScreenshot();
    fs.writeFileSync(screenshotPath, image, 'base64');
    console.log(` Screenshot saved at: ${screenshotPath}`);
    return screenshotPath; // Return path for embedding in Excel
}
module.exports = { takeScreenshot };