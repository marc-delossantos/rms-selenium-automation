const inputData = {

  login: {
    email: "marc.delossantos@awsys-i.com",
    password: "jeffPassword123.."
  },

  createData: {
    name: "DX testing sample",
    date: "2026/01/21 - 2026/02/28",
    remarks: "testing only"
  },
    updateData: {
    name: "DX testing sample2",
    date: "2026/02/02 - 2026/03/29",
    remarks: "testing only update"
  },

  searchData: {
    searchKeyword1: "Sample1"
  },
  dropdown:{
    sdOptions:['ヘンタイ',
              'SD1',
              'SD2',
              'SD3TEST',
              'SD4',
              'SD5'
    ],
    buOptions:[
               'ACTION',
               'ACTIONCEB',
               'ACTIONMNL',
               'ADMIN',
               'BUSINESSDEVELOPMENT',
               'BUSINESSOPERATIONS',
               'C4I',
               'CEBUOPERATIONS',
               'CLIENT',
               'CORPORATEPLANNING',
               'D2',
               'Department Department 12',
               'DEV2',
               'DEV3',
               'DEV5',
               'DEV6',
               'DEVA',
               'DEVB',
               'DEVC',
               'DEVD',
               'DEVE',
               'DEVF',
               'DEVG',
               'DEVH',
               'DEVI',
               'DEVJ',
               'DEVK',
               'DEVL',
               'DEVM',
               'DEVN',
               'DEVO',
               'DEVP',
               'DEVQ',
               'DX',
               'EMBSOL',
               'ESD',
               'ESDMGMT',
               'FINANCE',
               'HAKEN',
               'HRD',
               'MIS',
               'QANDS',
               'RESOURCEMANAGEMENT',
               'SOLUTIONDEVELOPMENT'
              ],
    allocationoptions:[],
    nihongo:[],
    currentAssignment:[],
    coreSkills:[],
    position:[],
    ACTION:[],
    showHide_RPMResourceAlloc:[
      'Employee Number',
      'Name',
      'Nickname',
      'Action Batch',
      'Gender',
      'Position',
      'BU Official',
      'BU Assigned',
      'Project Assignments',
      'Current Assignment',
      'Internal Activities',
      'Assigned Until',
      'Efficiency',
      'YoE(IND)',
      'YoE(AWS)',
      'YoE(JPN)',
      'Onsite Pref',
      'Nihongo',
      'Certifications',
      'Core Skills',
      'Status',
      'Allocation',
    ],
    category:[
              'Internal Project',
              'Operations',
              'Study/Training'
            ],
    status:[
            'Active',
            'Inactive'
    ],
    rowCount:[
            '30',
            '50',
            '70',
            '100'
    ]
  },

  
  dropdownValue:{
    categoryOpt: 'Internal Project',
    buOpt: 'ACTION',
    categoryOpt_up: 'Operations',
    buOpt_up: 'DEVA',
    allocType:'AVAILABLE'

  },

  searchSampData:{
    searchKeyword1:'Marc Jeffson',
  }


};

module.exports = inputData;
