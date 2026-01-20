const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const reportDir = './excelLog';
const reportPath = path.join(reportDir, 'TestResults.xlsx');

async function writeResult(testName, status, screenshotPath = '', message = '') {
    const workbook = new ExcelJS.Workbook();

    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir);
    }

    // Load existing file if present
    if (fs.existsSync(reportPath)) {
        await workbook.xlsx.readFile(reportPath);
    }

    let worksheet = workbook.getWorksheet('Results');
    if (!worksheet) {
        worksheet = workbook.addWorksheet('Results');
    }

    // IMPORTANT: Always define columns (keys are lost after readFile)
    worksheet.columns = [
        { header: 'Date', key: 'date', width: 25 },
        { header: 'Test Name', key: 'testName', width: 30 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Message', key: 'message', width: 50 },
        { header: 'Screenshot', key: 'screenshot', width: 30 }
    ];

    // Append new row
    const newRow = worksheet.addRow({
        date: new Date().toLocaleString(),
        testName,
        status,
        message,
        screenshot: screenshotPath
    });

    // Embed screenshot if exists
    if (screenshotPath && fs.existsSync(screenshotPath)) {
        const imageId = workbook.addImage({
            filename: screenshotPath,
            extension: 'png'
        });

        worksheet.addImage(imageId, {
            tl: { col: 4, row: newRow.number - 1 }, // Screenshot column
            ext: { width: 200, height: 120 }
        });

        newRow.height = 100;
    }

    await workbook.xlsx.writeFile(reportPath);
    console.log(` Test result for "${testName}" appended to Excel.`);
}

module.exports = { writeResult };
