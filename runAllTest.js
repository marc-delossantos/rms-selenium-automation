const { loginTest } = require('./tests/loginTest');
const { dataCreationIA } = require('./tests/createNewIA');
const { updateDataIA } = require('./tests/updateIA');
const { filterData } = require('./tests/IAFilteringData');

(async (times=10) => {
    for (let i = 0; i < times; i++) {
        console.log(`\n=== Running login test iteration ${i + 1} ===`);
    await loginTest();
    console.log('----you may check report logs @excelLog folder-----'); 
    }
    // await dataCreationIA();
    // console.log('----you may check report logs @excelLog folder-----');

    // await updateDataIA();
    // console.log('----you may check report logs @excelLog folder-----');

    // await filterData();
    // console.log('----you may check report logs @excelLog folder-----');
    
})();
    

