var obj = [
			   { "id": "Bundle1", "title":"Task","class":"panel panel-green","count":"10","class-icon":"fa fa-tasks fa-5x"},
			   { "id": "Bundle2", "title":"Resources","class":"panel panel-yellow","count":"15","class-icon":"fa fa-briefcase fa-5x"},
			   { "id": "Bundle3", "title":"Place","class":"panel panel-red","count":"20","class-icon":"fa fa-globe fa-5x"},
			   { "id": "Bundle4", "title":"Alert","class":"panel panel-primary","count":"5","class-icon":"fa fa-exclamation-triangle fa-5x"}
		];
var equipmentobj=[];
var deviceObj=[{device_name: 'gate_reader12',class:'alert alert-info',device_id: 'device201501123B',device_type: 'Passive RFID Reader',vendor: 'Alien',place_name: 'work site 23',created_time: new Date(),status: 'open'},
               {device_name: 'region_reader23',class:'alert alert-info',device_id: 'device201501123C',device_type: 'Passive RFID Reader',vendor: 'Alien',place_name: 'work site 34',created_time: new Date(),status: 'open'},
               {device_name: 'region_reader24',class:'alert alert-info',device_id: 'device201501123D',device_type: 'Passive RFID Reader',vendor: 'Alien',place_name: 'work site 35',created_time: new Date(),status: 'open'}
               ];
var alertObj = [{
	type: 'riskregionenter',
	created_time: new Date(),
	status: 'open',
	project: 'home garden',
	kind: 'Notification',
	class:'alert alert-info',
	details: {
		place: 'region 1',
		reason: 'high risk task scheduled at 9:40am',
		worker_name: 'Adi',
		worker_id: '124343432343df3',
		enter_time: new Date(),
		task: 'Remodeling'
		}
	}, {
	type: 'workerlate',
	created_time: new Date(),
	status: 'open',
	project: 'home garden',
	kind: 'Notification',
	class:'alert alert-info',
	details: {
		place: 'region 1',
		reason: 'worker has not shown up after 20 minutes work start',
		worker_name: 'Ali',
		worker_id: '124343432343df3',
		enter_time: new Date(),
		task: 'Remodeling'
		}
	},{
	type: 'equipmentlate',
	created_time: new Date(),
	status: 'delayed',
	project: 'home garden',
	kind: 'Notification',
	class:'alert alert-danger',
	details: {
		place: 'region 1',
		reason: 'equipment is not ready 10 minutes before work starts',
		equipment_name: 'croal',
		equipment_id: 'dfdafdafdafda',
		enter_time: new Date(),
		task: 'Remodeling'
		}
	},{
	type: 'equipmentmaintenance',
	created_time: new Date(),
	status: 'open',
	project: 'home garden',
	kind: 'Notification',
	class:'alert alert-info',
	details: {
		place: 'region 1',
		reason: 'equipment maintenance required',
		equipment_name: 'croal',
		equipment_id: 'dfdafdafdafda',
		repairer: 'cliff',
		repairer_id: '44f3eaeaf4',
		scheduled_time:"2014-12-03T00:39:52.808Z",
	    estimated_time: '2 hours',
		task: 'Remodeling'
		}
	}];

var taskObj = [{
	type: 'Manufature',
	created_time: new Date(),
	status: 'Completed',
	percentage: '100%',
	project: 'home garden',
	kind: 'Task',
	class:'alert alert-success',
	details: {
		place: 'region 1',
		reason: 'high risk task scheduled at 9:40am',
		worker_name: 'Adi',
		worker_id: '124343432343df3',
		enter_time: new Date(),
		task: 'Remodeling'
		}
},
{
	type: 'Equipment Maintainance',
	created_time: new Date(),
	status: 'open',
	percentage: '10%',
	project: 'home garden',
	kind: 'Task',
	class:'alert alert-info',
	details: {
		place: 'region 1',
		reason: 'high risk task scheduled at 9:40am',
		worker_name: 'ravi',
		worker_id: '124343432343df3',
		enter_time: new Date(),
		task: 'Binding'
		}
},
{
	type: 'Manufature',
	created_time: new Date(),
	status: 'delayed',
	project: 'home garden',
	kind: 'Task',
	percentage: '30%',
	class:'alert alert-danger',
	details: {
		place: 'region 1',
		reason: 'high risk task scheduled at 9:40am',
		worker_name: 'Adi',
		worker_id: '124343432343df3',
		enter_time: new Date(),
		task: 'Production'
		}
},
{
	type: 'Manufature',
	created_time: new Date(),
	status: 'open',
	project: 'home garden',
	kind: 'Task',
	percentage: '5%',
	class:'alert alert-info',
	details: {
		place: 'region 1',
		reason: 'high risk task scheduled at 9:40am',
		worker_name: 'Adi',
		worker_id: '124343432343df3',
		enter_time: new Date(),
		task: 'Production'
		}
},
{
	type: 'welding',
	created_time: new Date(),
	status: 'open',
	project: 'home garden',
	kind: 'Task',
	percentage: '15%',
	class:'alert alert-info',
	details: {
		place: 'region 1',
		reason: 'high risk task scheduled at 9:40am',
		worker_name: 'Adi',
		worker_id: '124343432343df3',
		enter_time: new Date(),
		task: 'Welding'
		}
}];

var workerObj=[{firstname: 'aron',
    secondname: 'William',
    worker_id: 'Worker20150118223A',
    tag_id: 'tag20150118A',
    email: 'aron.william@gmail.com',
    phone: '650-334-4523',
    sex: 'male',
    Latitude:"12.910457" ,
    Longitude:"77.6128023",
    skills:
        [
          {
               skill: 'plumbing',
               level: 7
          },
          {
               skill: 'floor construction',
               level: 5}
        ],
    tasks: [
         	{
         	    task_id:  '4324344321431',
         	    taskname:  'fix floor',
         	    start_time: new Date(),
         	    expected: '4 hours',
         	    location: '3341 Arron St. Sunnyvale'
         	},
         	{
         	    task_id:  '4324344321435',
         	    taskname:  'fix floor',
         	    start_time: new Date(),
         	    expected: '4 hours',
         	    location: '3341 Arron St. Sunnyvale'
         	}
         ],
    activities: [
            {
    	        location: '3341 Arron St. Sunnyvale',
    	        timestamp: new Date(),
    	        action: 'Checkin'
            },
            {
    	        location: '3341 Arron St. Sunnyvale',
    	        timestamp: new Date(),
    	        action: 'Checkout'
            }
        ]
},
{
    firstname: 'Miny',
    secondname: 'Kalan',
    worker_id: 'worker20150118225A',
    tag_id: 'tag20150120A',
    email: 'miny.kalan@gmail.com',
    phone: '998-432-2342',
    sex: 'male',
    Latitude:"12.906190219892428",
    Longitude:"77.61282920837402",
    skills:
        [
          {
               skill: 'plumbing',
               level: 7
          },
          {
               skill: 'floor construction',
               level: 5}
        ],
    tasks: [
         	{
         	    task_id:  '4324344321431',
         	    taskname:  'fix floor',
         	    start_time: new Date(),
         	    expected: '4 hours',
         	    location: '3341 Arron St. Sunnyvale'
         	},
         	{
         	    task_id:  '4324344321435',
         	    taskname:  'fix floor',
         	    start_time: new Date(),
         	    expected: '4 hours',
         	    location: '3341 Arron St. Sunnyvale'
         	}
         ],
    activities: [
            {
    	        location: '3341 Arron St. Sunnyvale',
    	        timestamp: new Date(),
    	        action: 'Checkin'
            },
            {
    	        location: '3341 Arron St. Sunnyvale',
    	        timestamp: new Date(),
    	        action: 'Checkout'
            }
        ]
}];
var columnDefinition=["Project Name","Task Name","Task Performace","Supervisor","Resource","Location"];
var tableRow=[
              {0:"Al- Jabr project",1:"task1.2",2:"1.10",3:"Mohamed kaif",4:"0.9",5:"Al ulaya"},
			  {0:"Al - Qasr project",1:"task1.3",2:"0.90",3:"Zaheer Ahmed",4:"1.1",5:"Al andalus"},
			  {0:"Gosi project",1:"task1.4",2:"0.90",3:"Imran khan",4:"1.0",5:"Ar rawabi"},
			  {0:"Jesco pipe plant project",1:"task2.1",2:"1.20",3:"Moin khan",4:"0.8",5:"Al Yarmouth"},
			  {0:"Karan suites and towers",1:"task2.2",2:"1.10",3:"Rameez raja",4:"0.9",5:"Al jawharah"},
			  {0:"Shuaibah IWPP desalination plant",1:"task2.3",2:"0.90",3:"Mohammad Sami",4:"1.1",5:"Al qusur"},
			  {0:"Al- Jabr project",1:"task2.4",2:"0.90",3:"Naziruddin shah",4:"1.0",5:"Al jamiah"},
			  {0:"Al - Qasr project",1:"task2.5",2:"1.10",3:"Irfan khan",4:"1.1",5:"Dana al janubiyah"},
			  {0:"Gosi project",1:"task3.1",2:"1.20",3:"Shoaib Malik",4:"0.8",5:"Al khobar"},
			  {0:"Jesco pipe plant project",1:"task3.2",2:"1.10",3:"Abdul razzaq",4:"0.9",5:"Al taawun"},
			  {0:"Karan suites and towers",1:"task3.3",2:"0.90",3:"Misbah ul haq",4:"1.1",5:"Ar rawabi"},
			  {0:"Shuaibah IWPP desalination plant",1:"task3.4",2:"0.90",3:"Wasim akram",4:"1.0",5:"Al Yarmouth"},
			  {0:"Ma'aden home project",1:"task3.5",2:"1.10",3:"Umar Gul",4:"1.1",5:"Al jawharah"}
];

var tableDataRow=[{"Project Name":"Ma'aden home project","Task Name":"task1.1","Task Performace":1.20,"Supervisor":"Abdul Rashid","Resource":0.8,"Location":"Al hada"},
              {"Project Name":"Al- Jabr project","Task Name":"task1.2","Task Performace":1.10,"Supervisor":"Mohamed kaif","Resource":0.9,"Location":"Al ulaya"},
			  {"Project Name":"Al - Qasr project","Task Name":"task1.3","Task Performace":0.90,"Supervisor":"Zaheer Ahmed","Resource":1.1,"Location":"Al andalus"},
			  {"Project Name":"Gosi project","Task Name":"task1.4","Task Performace":0.90,"Supervisor":"Imran khan","Resource":1.0,"Location":"Ar rawabi"},
			  {"Project Name":"Jesco pipe plant project","Task Name":"task2.1","Task Performace":1.20,"Supervisor":"Moin khan","Resource":0.8,"Location":"Al Yarmouth"},
			  {"Project Name":"Karan suites and towers","Task Name":"task2.2","Task Performace":1.10,"Supervisor":"Rameez raja","Resource":0.9,"Location":"Al jawharah"},
			  {"Project Name":"Shuaibah IWPP desalination plant","Task Name":"task2.3","Task Performace":0.90,"Supervisor":"Mohammad Sami","Resource":1.1,"Location":"Al qusur"},
			  {"Project Name":"Al- Jabr project","Task Name":"task2.4","Task Performace":0.90,"Supervisor":"Naziruddin shah","Resource":1.0,"Location":"Al jamiah"},
			  {"Project Name":"Al - Qasr project","Task Name":"task2.5","Task Performace":1.10,"Supervisor":"Irfan khan","Resource":1.1,"Location":"Dana al janubiyah"},
			  {"Project Name":"Gosi project","Task Name":"task3.1","Task Performace":1.20,"Supervisor":"Shoaib Malik","Resource":0.8,"Location":"Al khobar"},
			  {"Project Name":"Jesco pipe plant project","Task Name":"task3.2","Task Performace":1.10,"Supervisor":"Abdul razzaq","Resource":0.9,"Location":"Al taawun"},
			  {"Project Name":"Karan suites and towers","Task Name":"task3.3","Task Performace":0.90,"Supervisor":"Misbah ul haq","Resource":1.1,"Location":"Ar rawabi"},
			  {"Project Name":"Shuaibah IWPP desalination plant","Task Name":"task3.4","Task Performace":0.90,"Supervisor":"Wasim akram","Resource":1.0,"Location":"Al Yarmouth"},
			  {"Project Name":"Ma'aden home project","Task Name":"task3.5","Task Performace":1.10,"Supervisor":"Umar Gul","Resource":1.1,"Location":"Al jawharah"}
];