var obj = [
			   { "id": "Bundle1", "title":"Task","class":"panel panel-green","count":"10","class-icon":"fa fa-tasks fa-5x"},
			   { "id": "Bundle2", "title":"Resources","class":"panel panel-yellow","count":"15","class-icon":"fa fa-shopping-cart fa-5x"},
			   { "id": "Bundle3", "title":"Place","class":"panel panel-red","count":"20","class-icon":"fa fa-support fa-5x"},
			   { "id": "Bundle4", "title":"Alert","class":"panel panel-primary","count":"5","class-icon":"fa fa-comments fa-5x"}
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
