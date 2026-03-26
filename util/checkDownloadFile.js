const fs = require('fs');
const path = require('path');

async function checkDownloadFile(driver, filename, User) {
    const downloadPath = `C:/Users/${User}/Downloads`; // Update to your path
    const fileName = `${filename}.xlsx`; // The expected name
    const filePath = path.join(downloadPath, fileName);

    let isDownloaded = false;
    for (let i = 0; i < 10; i++) { // Retry for 10 seconds
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            if (stats.size > 0) {
                isDownloaded = true;
                break;
            }
        }
        await driver.sleep(1000);
    }

    if (!isDownloaded) throw new Error("File corrupted or not downloaded.");

}
module.exports ={checkDownloadFile};