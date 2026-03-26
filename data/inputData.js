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

  employeeSetting:{
    date: '2026/03/20 - 2026/04/18',
    remarks: 'Sample Only',
    remarks2: 'Update Remarks',
    lastDate:'2026/03/20',
    lastDate2:'2026/03/30',
  },

  searchData: {
    searchKeyword1: "Sample1"
  },
  dropdown:{
    sdOptions:['Corp Services',
              'SD1',
              'SD2',
              'SD3',
              'SD4',
              'SD5',
              'Tech Service',
    ],
    buOptions:['ACTION',
               'ACTIONCEB',
               'ACTIONMNL',
               'ADMIN',
               'Administration',
               'BUSINESSDEVELOPMENT',
               'BUSINESSOPERATIONS',
               'CEBUOPERATIONS',
               'CorpPlan',
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
               'SOLUTIONSDEVELOPMENT',
               'test',
              ],
    allocationoptions:[
                'AVAILABLE',
                'BUFFER',
                'MANAGEMENT',
                'PREP',
                'PROJECT', 
    ],
    nihongo:[
                'N1',
                'N1INTERNAL',
                'N2',
                'N2INTERNAL',
                'N3',
                'N3INTERNAL',
                'N4',
                'N4INTERNAL',
                'N5',
                'N5INTERNAL',
                'NONE',
    ],
    currentAssignment:[],
    coreSkills:[
                'AWS Cloud Practitioner Foundational',
                'Azure Administration Associate',
                'Azure Data Fundamental',
                'Azure Fundamentals',
                'C Programmer Associate Level (After clicking "Take Assessment", please wait for ACTION/RM to send you the exam link)',
                'C Programmer Entry Level (After clicking "Take Assessment", please wait for ACTION/RM to send you the exam link)',
                'C Programmer Intermediate Level (After clicking "Take Assessment", please wait for ACTION/RM to send you the exam link)',
                'C Programmer Professional level (After clicking "Take Assessment", please wait for ACTION/RM to send you the exam link)',
                'C++ Programmer Associate Level (After clicking "Take Assessment", please wait for ACTION/RM to send you the exam link)',
                'C++ Programmer Entry Level',
                'Java Programmer Associate Level',
                'Java Programmer Foundation Level',
                'Java Programmer Intermediate Level',
                'Javascript Programmer Associate Level (After clicking "Take Assessment", please wait for ACTION/RM to send you the exam link)',
                'Javascript Programmer Entry Level (After clicking "Take Assessment", please wait for ACTION/RM to send you the exam link)',
                'Javascript Programmer Intermediate Level (After clicking "Take Assessment", please wait for ACTION/RM to send you the exam link)',
                'N/A',
                'Python Programmer Associate Level',
                'Python Programmer Entry Level (After clicking "Take Assessment", please wait for ACTION/RM to send you the exam link)',
                'Python Programmer Intermediate Level',
    ],
    position:[
              'Admin Asst. Manager',
              'Admin Manager',
    ],
    ACTION:[
              '0',
              '1-MNL',
              '10-MNL',
              '11-MNL',
              '12-MNL',
    ],
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
    allocType:'AVAILABLE',
    nihongoLvl: 'N4',
    currAssignment:'4GCLINICAL-AUTOMATION OFFSHORE',
    coreSkills: 'AWS Cloud Practitioner Foundational',

  },

  searchSampData:{
    searchKeyword1:'Marc Jeffson',
    searchKeyword2: 'Sample Activity',
  },
  IAtable:{
    Header:['Action','Activity Name','Category','Description','Total Allocation','Tech Stack','Start','End','SD','BU','Status',],
    HeaderNew:['Action','Technology'],
  }


};

module.exports = inputData;
