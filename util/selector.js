const { By } = require('selenium-webdriver');

const sideMenu = {
    internalActivity: By.xpath("//a[.//span[normalize-space()='Internal Activity']]")
};

const loginSelectors = {
    emailInput: By.xpath("//input[@name='email']"),
    passwordInput: By.xpath("//input[@name='password']"),
    loginButton: By.xpath("//button[contains(@class,'login-btn')]")
};

const internalActivity = {
   // == main internal activity screen == 
   createBTN: By.xpath("//button[normalize-space()='Create New']"),
   searchBox: By.xpath("//input[@placeholder='Search all columns']"),
   row: By.xpath('(//div[@role="row"])[2]'),
   cell: By.xpath('.//*[@role="gridcell"]'),
   optBTN: By.xpath("//button[@type='button' and contains(@class,'action-btn') and contains(@class,'btn-primary')]"),
   viewBTN: By.xpath('//html/body/div[2]/button'),

   // == create/update screen == 
   name: By.xpath("//input[@name='name']"),
   date: By.xpath("//div[contains(@class,'MuiInputBase-root')]//input[@type='text' and @value='']"),
   category: By.xpath("//div[@role='combobox' and contains(@id,'internalOperationsCategoryId')]"),
   selCategoryOpt: By.xpath("//li[@data-value='e09859c5-594f-494d-8cbd-7dc51f7faa97']"),//select Internal Project
   selCategoryOpt2: By.xpath("//li[@data-value='e09859c5-594f-494d-8cbd-7dc51f7faa97']"),//select Operation
   b_unit: By.xpath("//div[@role='combobox' and contains(@id,'departmentGroupMappingId')]"),
   selB_unitOpt: By.xpath("//li[@data-value='dde11f87-483b-474b-b91b-be814872ebbf']"),//select ACTION
   selB_unitOpt2: By.xpath("//li[@data-value='dde11f87-483b-474b-b91b-be814872ebbf']"),//select DEV A
   remarks: By.xpath("//textarea[@name='remarks']"),
   cancelBTN: By.xpath("//button[text()='Cancel']"),
   saveBTN: By.xpath("//button[text()='Save']")
};

module.exports = {
    sideMenu,
    loginSelectors,
    internalActivity
};