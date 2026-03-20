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
        AHistory:{
            BTN:{
                PASampleSaveBTN: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div/div[2]/table/tbody/tr[1]/td[1]/span[2]`),
                IASampleSaveBTN:'',
                PAAssign: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div/div[1]/button`),
                PADeleteData: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div/div[2]/table/tbody/tr[2]/td[1]/span`),
                PADeleteData2: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div/div[2]/table/tbody/tr[3]/td[1]/span`)
            },
            DRPDWN:{
                projectAssign: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div/div[2]/div/table/tbody/tr[1]/td[9]/select`),
                PASample1: By.xpath(`///*[@id="root"]/div/div/div[2]/div/div/div[4]/div/div/div/div[2]/div/table/tbody/tr[1]/td[9]/select`), // select 0.25
                internalActivity: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[5]/div/div/div/div[2]/div/table/tbody/tr[1]/td[9]/select`),
                IASample1: By.xpath(`///*[@id="root"]/div/div/div[2]/div/div/div[5]/div/div/div/div[2]/div/table/tbody/tr[1]/td[9]/select`), // select 0.50
                selectRole: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div/div[2]/table/tbody/tr[2]/td[4]/select`),
                selectType: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div/div[2]/table/tbody/tr[2]/td[3]/select`),
            },
            TXTBX:{
                PAsearch: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div/div[1]/div/input`)
            },
            TAB:{
                longLeave: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[3]/ul/li[1]/button`),
                lastEmpDate: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[3]/ul/li[2]/button`),
            },
        },
        ESettings:{
            TAB1:{
                TXTBX:{
                    date: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[3]/div/div[1]/div/div[2]/div[2]/div[2]/div/div/div/div/input`),
                    remarks: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[3]/div/div[1]/div/div[2]/div[3]/div[2]/div/textarea[1]`),
                },
                DRPDWN:{
                    leaveType: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[3]/div/div[1]/div/div[2]/div[1]/div[2]/div/div`),
                        selectIndef: By.xpath(`/html/body/div[2]/div[3]/ul/li[2]`),
                    rowCount: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[3]/div/div[1]/div/div[4]/div/div[2]/div[2]/div/div[2]/div`),
                },
                BTN:{
                    adLeaveBTN: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[3]/div/div[1]/div/div[3]/button`),
                    pageFrw: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[3]/div/div[1]/div/div[4]/div/div[2]/div[2]/div/div[3]/button[1]`),
                    pageBck: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[3]/div/div[1]/div/div[4]/div/div[2]/div[2]/div/div[3]/button[2]`),
                },
            },
            TAB2:{
                TXTBX:{

                },
                DRPDWN:{
                    
                },
                BTN:{

                },
            }
        },

    },
    BTN:{
        clearFilterBtn: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[3]/div[2]/button`),
        exportBtn: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[1]/div/div/div/div/div/button`),
        BUclearFilter: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[1]/div/div/div[1]/button`),
        ATclearFilter: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[2]/div/div/div[1]/button`),
        NLclearFilter: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[3]/div/div/div[1]/button`),
        CAclearFilter: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[4]/div/div/div[1]/button`),
        CSclearFilter: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[5]/div/div/div[1]/button`),
        POSclearFilter: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[6]/div/div/div[1]/button`),
        ABclearFilter: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[7]/div/div/div[1]/button`),
        SHclearFilter: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[7]/div/div/div[1]/button`),
        actionBtn:By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div[1]/div[2]/div[2]/div/div[1]/div[2]/div/button`),
        ATSSProfileOpt:By.xpath(`//*[@aria-label="ATSS Profile"]`),
        allocationHistoryOpt:By.xpath(`//*[@aria-label="Allocation History"]`),
        employeeSettingsOpt:By.xpath(`//*[@aria-label="Set Employee Settings"]`),
        pageFwd:By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div[2]/div[2]/div/div[3]/button[2]`),
        pageBck:By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div[2]/div[2]/div/div[3]/button[1]`),
        sort:By.xpath(),

    },
    TXTBX:{
        searchBox: By.xpath("//input[@placeholder='Search all columns']"),
    },
    DRPDWN:{
        buUnitsDropDown:By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[1]/div/button`),
        allocTypeDropDown: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[2]/div/button`),
        nihongoLevelDropDown: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[3]/div/button`),
        currentAssignmentDropDown: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[4]/div/button`),
        coreSkillsDropDown: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[5]/div/button`),
        positionDropDown: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[6]/div/button`),
        actionBatchDropDown: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[7]/div/button`),
        showHide: By.xpath(`/html/body/div/div/div/div[2]/div/div/div[2]/div/div[8]/div/button`),
        rowCount:By.xpath(`/html/body/div/div/div/div[2]/div/div/div[4]/div/div/div[2]/div[2]/div/div[2]/div`),

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