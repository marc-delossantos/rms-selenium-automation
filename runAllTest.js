const { loginTest } = require('./tests/loginTest');
const { dataCreationIA } = require('./tests/createNewIA');

(async () => {
   // await loginTest();
    console.log('test_001 finished----you may check report logs @excelLog folder-----'); 

    await dataCreationIA();
    console.log('test_002 finished----you may check report logs @excelLog folder-----');
})();
    

