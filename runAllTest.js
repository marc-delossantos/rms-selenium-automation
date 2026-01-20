const { loginTest } = require('./tests/loginTest');
const { loginTest2 } = require('./tests/createNewIA');

(async () => {
    await loginTest();
    console.log('test_001 finished----you may check report logs @excelLog folder-----'); 

    await loginTest2();
    console.log('test_002 finished----you may check report logs @excelLog folder-----');
})();
    

