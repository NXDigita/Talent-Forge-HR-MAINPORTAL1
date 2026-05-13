export const COMPANIES = [
  {id:"c1",name:"AutoSense Labs",domain:"IoT/Embedded",hires:18,spend:324000,plan:"Employer Pro"},
  {id:"c2",name:"PowerGrid Dynamics",domain:"EEE/Power"},
  {id:"c3",name:"MechVenture India",domain:"Mechanical"},
  {id:"c4",name:"DataCore Analytics",domain:"Data Science"},
  {id:"c5",name:"GrowthHive",domain:"Business/SaaS"}
]

export const CANDIDATES = [
  {id:"arjun-k",name:"Arjun Kumar",city:"Coimbatore",college:"PSG Tech",domain:"ECE",specialization:"Embedded Systems",tier:"Expert",tfes:87,simulations:47,projects:23,badges:8,earned:124000,rating:4.9,available:true,aiMatch:94,
   skills:["STM32","FreeRTOS","ESP32","ARM Cortex","UART","SPI","I2C","C"],
   scores:{technical:92,domain:89,problem:84,comms:78,collab:82,consistency:76},
   progression:[62,65,69,71,74,76,79,81,83,84,85,87],
   badges:[
     {name:"IoT Systems Expert",score:98,hash:"0x9f3a...d21c"},
     {name:"Embedded C Pro",score:94,hash:"0x4b2e...f87a"},
     {name:"STM32 Specialist",score:91,hash:"0x7c1d...b93f"},
     {name:"FreeRTOS Practitioner",score:88,hash:"0x2a8f...c14e"},
     {name:"Circuit Design Pro",score:96,hash:"0x6e3b...a29d"},
     {name:"ESP32 Advanced",score:93,hash:"0x1f9c...d78b"},
     {name:"ARM Cortex Dev",score:89,hash:"0x8d4f...e32c"},
     {name:"Protocol Expert",score:87,hash:"0x3a7b...f91e"}
   ],
   simulations:[
     {id:"s47",project:"ESP32 IoT Dashboard",domain:"ECE",score:98,result:"Pass Rate 99%",date:"Jan 2025",status:"minted"},
     {id:"s46",project:"UART STM32 Comm",domain:"Embedded",score:94,result:"Timing ✓",date:"Jan 2025",status:"minted"},
     {id:"s44",project:"ARM Bare-Metal",domain:"Embedded",score:91,result:"GPIO 100%",date:"Dec 2024",status:"minted"},
     {id:"s41",project:"FreeRTOS Scheduler",domain:"RTOS",score:73,result:"Deadlock ⚠",date:"Dec 2024",status:"partial"},
     {id:"s39",project:"Circuit Rectifier",domain:"ECE",score:96,result:"Waveform 96%",date:"Nov 2024",status:"minted"}
   ],
   reviews:[
     {reviewer:"Dr. Karthik M.",company:"ISRO Chennai",rating:5,comment:"Exceptional embedded C skills. Delivered ahead of schedule.",date:"Jan 2025"},
     {reviewer:"Preethi S.",company:"Bosch India",rating:5,comment:"Clean FreeRTOS implementation. Protocol handling excellent.",date:"Dec 2024"},
     {reviewer:"Arjun V.",company:"AutoSense Labs",rating:4.8,comment:"Strong IoT architecture. Minor documentation gaps only.",date:"Nov 2024"}
   ]
  },
  {id:"priya-s",name:"Priya Sharma",city:"Pune",domain:"CS",specialization:"Data Science",tier:"Practitioner",tfes:82,simulations:31,projects:17,badges:6,earned:87500,rating:4.8,available:true,aiMatch:81,skills:["Python","TensorFlow","SQL","Pandas","XGBoost","Sklearn","BERT"],scores:{technical:85,__REMOVE_domain__:82,problem:79,comms:84,collab:81,consistency:78},progression:[58,62,66,68,71,74,76,78,79,80,81,82],__REMOVE_badges__:[],__REMOVE_simulations__:[],reviews:[]},
  {id:"vikram-r",name:"Vikram Reddy",city:"Hyderabad",domain:"Mechanical",specialization:"FEA/CAD",tier:"Practitioner",tfes:79,simulations:24,projects:11,badges:5,earned:63000,rating:4.7,available:true,aiMatch:72,skills:["SolidWorks","ANSYS","AutoCAD","CATIA","FEA","GD&T"],scores:{technical:80,__REMOVE_domain__:84,problem:75,comms:72,collab:78,consistency:74},progression:[55,59,62,64,67,70,72,74,75,77,78,79],__REMOVE_badges__:[],__REMOVE_simulations__:[],reviews:[]},
  {id:"deepa-k",name:"Deepa Kumar",city:"Chennai",domain:"EEE",specialization:"Power Systems",tier:"Expert",tfes:84,simulations:38,projects:19,badges:7,earned:91000,rating:4.9,available:true,aiMatch:88,skills:["Load Flow","ETAP","Relay Coordination","SCADA","PLC","MATLAB"],scores:{technical:87,__REMOVE_domain__:90,problem:82,comms:80,collab:85,consistency:82},progression:[60,63,67,70,73,75,77,79,80,82,83,84],__REMOVE_badges__:[],__REMOVE_simulations__:[],reviews:[]},
  {id:"ravi-t",name:"Ravi Teja",city:"Coimbatore",domain:"CS",specialization:"Full Stack",tier:"Practitioner",tfes:76,simulations:21,projects:9,badges:4,earned:54000,rating:4.6,available:true,aiMatch:78,skills:["React","Node.js","PostgreSQL","Docker","TypeScript","REST"],scores:{technical:78,__REMOVE_domain__:76,problem:74,comms:79,collab:77,consistency:73},progression:[52,56,59,62,65,67,69,71,73,74,75,76],__REMOVE_badges__:[],__REMOVE_simulations__:[],reviews:[]},
  {id:"kavya-m",name:"Kavya Menon",city:"Bangalore",domain:"DS",specialization:"ML/AI",tier:"Expert",tfes:88,simulations:29,projects:16,badges:6,earned:138000,rating:4.9,available:true,aiMatch:91,skills:["XGBoost","BERT","MLflow","PyTorch","SQL","Spark"],scores:{technical:90,__REMOVE_domain__:92,problem:88,comms:82,collab:86,consistency:85},progression:[63,67,70,73,76,78,80,82,84,86,87,88],__REMOVE_badges__:[],__REMOVE_simulations__:[],reviews:[]},
  {id:"suresh-p",name:"Suresh Pillai",city:"Madurai",domain:"ECE",specialization:"IoT",tier:"Practitioner",tfes:74,simulations:18,projects:8,badges:3,earned:48000,rating:4.5,available:false,aiMatch:68,skills:["LoRaWAN","Zigbee","MQTT","Node-RED","Raspberry Pi","Python"],scores:{technical:75,__REMOVE_domain__:77,problem:72,comms:70,collab:74,consistency:71},progression:[50,53,56,59,61,64,66,68,70,71,73,74],__REMOVE_badges__:[],__REMOVE_simulations__:[],reviews:[]},
  {id:"anitha-r",name:"Anitha Rajan",city:"Trichy",domain:"EEE",specialization:"Automation",tier:"Expert",tfes:81,simulations:26,projects:13,badges:5,earned:72000,rating:4.7,available:true,aiMatch:75,skills:["PLC","SCADA","DCS","HMI","Siemens S7","Allen Bradley"],scores:{technical:83,__REMOVE_domain__:85,problem:79,comms:77,collab:81,consistency:79},progression:[56,60,63,66,68,71,73,75,77,78,80,81],__REMOVE_badges__:[],__REMOVE_simulations__:[],reviews:[]},
  {id:"karthik-s",name:"Karthik Suresh",city:"Chennai",domain:"Robotics",specialization:"ROS/Control",tier:"Expert",tfes:86,simulations:33,projects:18,badges:7,earned:110000,rating:4.8,available:false,aiMatch:85,skills:["ROS2","Python","OpenCV","SLAM","Gazebo","C++"],scores:{technical:88,__REMOVE_domain__:87,problem:85,comms:80,collab:83,consistency:82},progression:[61,65,68,71,74,77,79,81,82,84,85,86],__REMOVE_badges__:[],__REMOVE_simulations__:[],reviews:[]},
  {id:"meera-v",name:"Meera Varma",city:"Pune",domain:"AI/ML",specialization:"Deep Learning",tier:"Master",tfes:91,simulations:42,projects:22,badges:9,earned:162000,rating:4.9,available:true,aiMatch:96,skills:["PyTorch","TensorFlow","CUDA","LLM","RAG","Diffusion Models"],scores:{technical:94,__REMOVE_domain__:93,problem:91,comms:87,collab:90,consistency:89},progression:[67,71,74,77,80,82,84,86,88,89,90,91],__REMOVE_badges__:[],__REMOVE_simulations__:[],reviews:[]},
  {id:"dinesh-b",name:"Dinesh Bhat",city:"Ahmedabad",domain:"Civil",specialization:"Structural",tier:"Practitioner",tfes:72,simulations:16,projects:7,badges:3,earned:41000,rating:4.4,available:true,aiMatch:62,skills:["AutoCAD","STAAD Pro","ETABS","SAP2000","MS Project"],scores:{technical:73,__REMOVE_domain__:76,problem:70,comms:71,collab:72,consistency:69},progression:[48,51,54,57,60,62,64,66,68,69,71,72],__REMOVE_badges__:[],__REMOVE_simulations__:[],reviews:[]},
  {id:"pooja-n",name:"Pooja Nair",city:"Bangalore",domain:"Cloud",specialization:"DevOps",tier:"Expert",tfes:83,simulations:27,projects:14,badges:6,earned:96000,rating:4.8,available:true,aiMatch:82,skills:["AWS","Kubernetes","Terraform","CI/CD","Docker","Prometheus"],scores:{technical:85,__REMOVE_domain__:84,problem:82,comms:84,collab:83,consistency:80},progression:[59,62,65,68,71,73,75,77,79,80,82,83],__REMOVE_badges__:[],__REMOVE_simulations__:[],reviews:[]}
]

export const PROJECTS = [
  {id:"p1",title:"ESP32 IoT Dashboard for Factory Floor",domain:"ECE",budget:22000,tier:"Practitioner",stage:"working",daysLeft:5,applicants:8,assignedTo:"arjun-k",escrow:{total:22000,released:14667,held:7333,milestone:2,of:3}},
  {id:"p2",title:"STM32 Firmware Sensor Array",domain:"Embedded",budget:35000,tier:"Expert",stage:"reviewing",daysLeft:3,applicants:5,assignedTo:"priya-s",escrow:{total:35000,released:0,held:35000,milestone:1,of:3}},
  {id:"p3",title:"Python ETL Data Pipeline",domain:"CS/DS",budget:28000,tier:"Practitioner",stage:"hiring",daysLeft:7,applicants:12},
  {id:"p4",title:"SolidWorks Gear Assembly CAD",domain:"Mechanical",budget:18000,tier:"Apprentice",stage:"posted",daysLeft:12,applicants:0},
  {id:"p5",title:"React Admin Dashboard HR Analytics",domain:"CS",budget:32000,tier:"Practitioner",stage:"complete",daysLeft:0,applicants:9,assignedTo:"ravi-t",rating:4.9},
  {id:"p6",title:"Load Flow Analysis EEE Grid",domain:"EEE",budget:24000,tier:"Expert",stage:"working",daysLeft:4,applicants:6,assignedTo:"deepa-k",escrow:{total:24000,released:8000,held:16000,milestone:1,of:3}}
]

export const PAYMENTS = [
  {date:"14 Jan",project:"ESP32 IoT Dashboard",candidate:"Arjun K.",amount:7333,type:"Milestone 2/3",status:"completed",hash:"pay_4f2a"},
  {date:"08 Jan",project:"ESP32 IoT Dashboard",candidate:"Arjun K.",amount:7334,type:"Milestone 1/3",status:"completed",hash:"pay_2a7b"},
  {date:"02 Jan",project:"React HR Dashboard",candidate:"Ravi T.",amount:32000,type:"Full Payment",status:"completed",hash:"pay_7c1d"},
  {date:"28 Dec",project:"Circuit FEA Analysis",candidate:"Arjun K.",amount:18500,type:"Full Payment",status:"completed",hash:"pay_9d3f"},
  {date:"20 Dec",project:"Python ML Pipeline",candidate:"Priya S.",amount:24000,type:"Full Payment",status:"completed",hash:"pay_1f8e"}
]

export const SPEND_DATA = [
  {month:"Jan",spend:18000,industry:65000},
  {month:"Feb",spend:22000,industry:68000},
  {month:"Mar",spend:28000,industry:72000},
  {month:"Apr",spend:35000,industry:75000},
  {month:"May",spend:42000,industry:80000},
  {month:"Jun",spend:38000,industry:78000},
  {month:"Jul",spend:48000,industry:82000},
  {month:"Aug",spend:52000,industry:85000},
  {month:"Sep",spend:44000,industry:80000},
  {month:"Oct",spend:58000,industry:88000},
  {month:"Nov",spend:62000,industry:90000},
  {month:"Dec",spend:55000,industry:85000}
]