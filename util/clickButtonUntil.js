
async function clickUntil(path){
const button = await driver.findElement(path);

while (true) {
    const isEnabled = await button.isEnabled();

    if (!isEnabled) {
        console.log('Button is now disabled');
        break;
    }

    await button.click();
     // wait for UI update (important)
}
}
module.exports ={clickUntil};