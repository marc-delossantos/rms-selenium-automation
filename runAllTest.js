// const { loginTest } = require('./tests/loginTest');
// const { dataCreationIA } = require('./tests/createNewIA');
// const { updateDataIA } = require('./tests/updateIA');
// const { filterData } = require('./tests/IAFilteringData');
const {
     IT_001,
     IT_002,
     IT_004,
     IT_005,
     IT_006,
     IT_007,
     IT_008,
     IT_009,
     IT_010,
     IT_011,
     IT_013,
     IT_014,
     IT_015,
     IT_016,
     IT_017,
     IT_018,
     IT_019,
     IT_020,
     IT_021,
     IT_022,
     IT_023,
     IT_024,
     IT_029,
     IT_031,
     IT_036,
     IT_038,
     IT_039,
     IT_040,
     IT_041,
     IT_054,
     IT_055,
     IT_056,
     IT_057,
     IT_058,
     IT_062,
     IT_063,
     IT_064,
     IT_066,
     IT_068} = require('./tests/RPM_ResAlloc');

//(async (times=10) => {
    // for (let i = 0; i < times; i++) {
    //     console.log(`\n=== Running login test iteration ${i + 1} ===`);
    // await loginTest();
    // console.log('----you may check report logs @excelLog folder-----'); 
    // }
        
    // await dataCreationIA();
    // console.log('----you may check report logs @excelLog folder-----');

    // await updateDataIA();
    // console.log('----you may check report logs @excelLog folder-----');

    // await filterData();
    // console.log('----you may check report logs @excelLog folder-----');
(async () => {
    await IT_001();
    await IT_002();
    await IT_004();
    await IT_005();
    await IT_006();
    await IT_007();
    await IT_008();
    await IT_009();
    await IT_010();
    await IT_011();
    await IT_013();
    await IT_014();
    await IT_015();
    await IT_016();
    await IT_017();
    await IT_018();
    await IT_019();
    await IT_020();
    await IT_021();
    await IT_022();
    await IT_023();
    await IT_024();
    await IT_029();
    await IT_031();
    await IT_036();
    await IT_038();
    await IT_039();
    await IT_040();
    await IT_041();
    await IT_054();
    await IT_055();
    await IT_056();
    await IT_057();
    await IT_058();
    await IT_062();
    await IT_063();
    await IT_064();
    await IT_066();
    await IT_068();
    
})();
    

