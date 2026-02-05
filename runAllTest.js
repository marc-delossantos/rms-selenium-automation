const { loginTest } = require('./tests/loginTest');
const { dataCreationIA } = require('./tests/createNewIA');
const { updateDataIA } = require('./tests/updateIA');
const { filterData } = require('./tests/IAFilteringData');

(async () => {
    await loginTest();
    console.log('test_001 finished----you may check report logs @excelLog folder-----'); 

    await dataCreationIA();
    console.log('test_002 finished----you may check report logs @excelLog folder-----');

    await updateDataIA();
    console.log('test_003 finished----you may check report logs @excelLog folder-----');

    await filterData();
    console.log('test_003 finished----you may check report logs @excelLog folder-----');
})();
    

