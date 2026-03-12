const { By } = require('selenium-webdriver');
const data = require('../data/inputData');

const sideMenu = {
    internalActivity: By.xpath("//a[.//span[normalize-space()='Internal Activity']]"),
    resourceAlloc: By.xpath(`//a[.//span[normalize-space()='Resource Allocation']]`),
    burgerIcon: By.xpath(`//button[contains(@class, 'Hamburger') and contains(@class, 'btn-outline-secondary')]`)
};

const loginSelectors = {
    emailInput: By.xpath("//input[@name='email']"),
    passwordInput: By.xpath("//input[@name='password']"),
    loginButton: By.xpath("//button[contains(@class,'login-btn')]")
};
const RPM_ResAlloc = {
    SUBMENU:{

    },
    BTN:{
        clearFilterBtn: By.xpath("//button[normalize-space()='Clear All Filters']"),
        exportBtn: By.xpath("//button[contains(@class,'btn-export-excel')]"),
        clearFilter: By.xpath(`//button[contains(@class,'action-button') and normalize-space()='Clear Filter']`),
        actionBtn:"",
        pageFwd:"",
        pageBck:"",
        sort:"",
    },
    TXTBX:{
        searchBox: By.xpath("//input[@placeholder='Search all columns']"),
    },
    DRPDWN:{
        buUnitsDropDown:By.xpath(`//*[@id="root"]/div/div/div[2]/div/div/div[2]/div/div[1]/div/div/div/button`),
        allocTypeDropDown: By.xpath(`//*[@id="root"]/div/div/div[2]/div/div/div[2]/div/div[2]/div/div/div/button/div`),
        showHide:"",
        rowPerPage:""
    },
    TBL:{
        tableColumns: By.xpath("//div[@role='columnheader']"),
        tableName:By.xpath("./div[@aria-colindex='3']"),
    },  
};

const internalActivity = {
   // == main internal activity screen == 
   createBTN: By.xpath("//button[normalize-space()='Create New']"),
   searchBox: By.xpath("//input[@placeholder='Search all columns']"),
   row: By.xpath('(//div[@role="row"])[2]'),
   cell: By.xpath('.//*[@role="gridcell"]'),
   optBTN: By.xpath("//div[@role='row' and .//div[@data-field='name' and normalize-space()='"+ data.createData.name +"']]//button[contains(@class,'action-btn')]"),
   viewBTN: By.xpath('//html/body/div[2]/button'),

   // == create/update screen == 
   name: By.xpath("//input[@name='name']"),
   date: By.xpath("//div[contains(@class,'MuiInputBase-root')]//input[@type='text' and @value='']"),
   category: By.xpath("//div[@role='combobox' and contains(@id,'internalOperationsCategoryId')]"),
   selCategoryOpt: By.xpath(`//li[normalize-space(text())='${data.dropdownValue.categoryOpt}']`),//select category option
   b_unit: By.xpath("//div[@role='combobox' and contains(@id,'departmentGroupMappingId')]"),
   selB_unitOpt: By.xpath(`//li[normalize-space(text())='${data.dropdownValue.buOpt}']`),//select bu unit option
   remarks: By.xpath("//textarea[@name='remarks']"),
   cancelBTN: By.xpath("//button[text()='Cancel']"),
   saveBTN: By.xpath("//button[text()='Save']"),
   upBTN: By.xpath("//button[text()='Update']"),

      // == create/update screen == 
   up_name: By.xpath("//input[@name='name' and contains(@class,'MuiInputBase-input') and contains(@value,'" + data.createData.name + "')]"),
   up_date: By.xpath("//input[@type='text' and contains(@class,'MuiInputBase-input') and contains(@value,'" + data.createData.date + "')]"),
   selCategoryOpt2: By.xpath(`//li[normalize-space(text())='${data.dropdownValue.categoryOpt_up}']`),//select category opt
   selB_unitOpt2: By.xpath(`//li[normalize-space(text())='${data.dropdownValue.buOpt_up}']`),//select bu option
   up_remarks: By.xpath("//textarea[@name='remarks']"),
   up_cancelBTN: By.xpath("//button[text()='Cancel']"),
   up_saveBTN: By.xpath("//button[text()='Save']"),

   //dropdown filters
   sdGrp: By.xpath("//button[.//span[text()='SD Group']]"),
   bu: By.xpath("//div[@role='combobox' and contains(@id,'departmentGroupMappingId')]"),
   category:By.xpath("//div[@role='combobox' and contains(@id,'internalOperationsCategoryId')]"),
   status: By.xpath("//button[.//span[text()='Status']]")
};

module.exports = {
    sideMenu,
    loginSelectors,
    internalActivity,
    RPM_ResAlloc
};