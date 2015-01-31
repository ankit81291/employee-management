
define(["detailWrap/detailWrapController","jquery-autocomplete"], function(controller,jquery){

	var detailWrapView = function(){
		this.oController = controller;
		this.addCardRef="";
	};
	detailWrapView.prototype.createContent = function(obj) {
	var dashBoardChartDiv='<div class="row detailwrap" >'+
						'<div class="col-lg-8">'+
							'<div class="panel panel-default" style="height: 422px;overflow-y: scroll;">'+
					                 '<div class="panel-heading">'+
					                     '<i class="fa fa-bar-chart-o fa-fw"></i>Task Performance'+
					                     '<div class="pull-right">'+
					                         '<div class="btn-group">'+
					                             '<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">Actions'+
					                                 '<span class="caret"></span>'+
					                             '</button>'+
					                             '<ul class="dropdown-menu pull-right" role="menu">'+
					                             	'<li>'+
					                             	'<a href="#">Chart Type <span class="fa arrow"></span></a>'+
							                                '<ul class="nav nav-third-level collapse in" aria-expanded="true">'+
							                                '<li>'+
							                                    "<a href='#' onclick='window.app.component.buildDonutChart();'>Donut</a>"+
							                                '</li>'+
							                                '<li>'+
							                                "<a href='#' onclick='window.app.component.buildBarChart();'>Bar</a>"+
							                                '</li>'+
							                                '<li>'+
							                                "<a href='#' onclick='window.app.buildChart();'>Area</a>"+
							                                '</li>'+
							                            '</ul>'+
					                                 '</li>'+
					                                 '<li>'+
					                                 "<a href='#' onclick='window.app.buildTable();'>Tabular data</a>"+
					                                 '</li>'+
					                             '</ul>'+
					                         '</div>'+
					                     '</div>'+
					                 '</div>'+
					                 '<div class="panel-body">'+
					                     '<div id="morris-area-chart"></div>'+
					                 '</div>'+
					         '</div>'+
					     '</div>';
					 
		var notificationDashboardDiv=this.getNotification();
		var dashBoardDiv = dashBoardChartDiv+notificationDashboardDiv+'</div>';
	return dashBoardDiv;
	};
	
	detailWrapView.prototype.getController = function() {
		return this.oController;
	};
	detailWrapView.prototype.getNotification = function() {
		var notificationstartDiv='<div class="col-lg-4">'+
							        '<div class="panel panel-default" style="height: 422px;overflow-y: scroll;">'+
								        '<div class="panel-heading">'+
								            '<i class="fa fa-bell fa-fw"></i> Notifications Panel'+
								        '</div>';
			
		var NotificationDiv='<div class="panel-body">';
		var notifyDiv="";
							for(var i=0;i<alertObj.length;i++){
								cssClass=this.getStatusClass(alertObj[i]['status']);
								
						    var tempDiv='<div class="'+cssClass+'">'+
						            '<i class="fa fa-comment fa-fw"></i>'+alertObj[i]['alert_type']+
						            '<span class="pull-right text-muted small"><em>'+alertObj[i]['status']+'</em>'+
						            '</span>'+
						        '</div>';
						        notifyDiv = notifyDiv+tempDiv;
								}
			var notifyDiv1='</div>'+
						    '<a href="#" class="btn btn-default btn-block">View All Alerts</a>'+
				'</div>';
			var notificationendDiv='</div>'+
									'</div>';
			return notificationstartDiv+NotificationDiv+notifyDiv+notifyDiv1+notificationendDiv;
						    
	};	
	
	detailWrapView.prototype.buildTaskDetail = function(obj) {
		$(".detailwrap").empty();
		var taskNavDiv=this.createTask(obj);
		$(".detailwrap").append(taskNavDiv);
		var taskDetailDiv = this.createTaskDetailDiv(obj[0]);
		this.currentTaskObj=obj[0];
		this.newTask=true;
		$(".detailwrap").append(taskDetailDiv);
	};
	
	detailWrapView.prototype.buildNotificationDetail = function(obj) {
		$(".detailwrap").empty();
		var notificationNavDiv=this.createNotification(obj);
		$(".detailwrap").append(notificationNavDiv);
		var notificationDetailDiv = this.createNotificationDetailDiv(obj[0]);
		$(".detailwrap").append(notificationDetailDiv);
	};
	
	detailWrapView.prototype.createTask = function(obj) {
		var createParentNavDiv = this.createTaskParentNav(obj);
		var createNavSearch = this.createSearchDiv();
		var TaskDiv='<div class="panel-body">';
		var taskTempDiv="";
					for(var i=0;i<obj.length;i++){
							var tempDiv="";
							var JsonString = JSON.stringify(obj[i]);
							cssClass=this.getStatusClass(obj[i]['status']);
								if(i==0){
									   tempDiv="<div id='"+obj[i]["task_id"]+"' class='firstSelect listItem "+cssClass+"' onclick='window.app.component.handleItemListClick("+JsonString+");'>";	
									   
								}
								else{
									tempDiv="<div id='"+obj[i]["task_id"]+"' class='listItem "+cssClass+"' onclick='window.app.component.handleItemListClick("+JsonString+");'>";
								}
						    var temp2Div=obj[i]['task_name']+
						            		'<span class="pull-right text-muted small"><em>'+obj[i]['status']+'</em>'+
						            	'</div>';
						    taskTempDiv = taskTempDiv+tempDiv+temp2Div;
								}
			var taskDiv1='</div>';	
			var taskendDiv='</div>'+
			'</div>';
								
			return createParentNavDiv+createNavSearch+TaskDiv+taskTempDiv+taskDiv1+taskendDiv;
	};
	
	detailWrapView.prototype.createNotification = function(obj) {
		var createParentNavDiv = this.createNotificationParentNav(obj);
		var createNavSearch = this.createSearchDiv();
		var NotificationDiv='<div class="panel-body">';
		var NotificationTempDiv="";
					for(var i=0;i<obj.length;i++){
							var tempDiv="";
							var JsonString = JSON.stringify(obj[i]);
							cssClass=this.getStatusClass(obj[i]['status']);
								if(i==0){
									   tempDiv="<div class='firstSelect "+cssClass+"' onclick='window.app.component.handleNotificationListClick("+JsonString+");'>";	
									   
								}
								else{
									tempDiv="<div class='"+cssClass+"' onclick='window.app.component.handleNotificationListClick("+JsonString+");'>";
								}
						    var temp2Div=obj[i]['alert_type']+
						            		'<span class="pull-right text-muted small"><em>'+obj[i]['status']+'</em>'+
						            	'</div>';
						    NotificationTempDiv = NotificationTempDiv+tempDiv+temp2Div;
								}
			var NotificationDiv1='</div>';	
			var NotificationendDiv='</div>'+
			'</div>';
								
			return createParentNavDiv+createNavSearch+NotificationDiv+NotificationTempDiv+NotificationDiv1+NotificationendDiv;
	};
	detailWrapView.prototype.createTaskParentNav = function(obj) {
		var div1='<div class="col-lg-3">'+
			        '<div class="panel panel-default detailLeftList">'+
				        '<div class="panel-heading"> Task'+
				        '</div>';
		return div1;
	};
	
	detailWrapView.prototype.createNotificationParentNav = function(obj) {
		var div1='<div class="col-lg-3">'+
			        '<div class="panel panel-default detailLeftList">'+
				        '<div class="panel-heading"> Notification'+
				        '</div>';
		return div1;
	};
	
	detailWrapView.prototype.createSearchDiv = function(obj) {
		var div1='<div>'+
					'<ul class="nav">'+
						'<li class="sidebar-search">'+
							        '<div class="input-group custom-search-form">'+
							        '<input type="text" class="form-control" placeholder="Search...">'+
							        '<span class="input-group-btn">'+
							        '<button class="btn btn-default" type="button">'+
							            '<i class="fa fa-search"></i>'+
							        '</button>'+
							    '</span>'+
							    '</div>'+
							 '</li>'+
					  '</ul>'+
					'</div>';
				
		return div1;
	};
	
	detailWrapView.prototype.createTaskDetailDiv = function(obj) {
		var div1 =this.createTaskDetailParentNav(obj);
		var div2 = this.detailTaskDiv(obj);
		var div3 = '</div>'+
					'</div>';
		return div1+ div2 + div3;
	};
	detailWrapView.prototype.createNotificationDetailDiv = function(obj) {
		var div1 =this.createNotificationDetailParentNav(obj);
		var div2 = this.detailNotificationDiv(obj);
		var div3 = '</div>'+
					'</div>';
		return div1+ div2 + div3;
	};
	
	detailWrapView.prototype.createTaskDetailParentNav = function(obj) {
		var taskName="";
		if(obj["task_name"]!=undefined){
			taskName=obj["task_name"];
		}
		else{
			taskName="New Task";
		}
		
		var div1='<div class="col-lg-9 detailList">'+
			        '<div class="panel panel-default detailRight">'+
				        '<div class="panel-heading">'+
				        taskName+  
				        "<i style='float:right;padding-left: 5px;' class='fa fa-edit' onclick='window.app.component.editTask("+JSON.stringify(obj)+");'></i>"+
				        "<i style='float:right;' class='fa fa-plus' onclick='window.app.component.addNew("+JSON.stringify(obj)+");'></i>"+
				        '</div>';
		return div1;
	};
	
	detailWrapView.prototype.createNotificationDetailParentNav = function(obj) {
		var notificationName=obj["alert_type"];
		var div1='<div class="col-lg-9 detailList">'+
			        '<div class="panel panel-default detailRight">'+
				        '<div class="panel-heading">'+
				        notificationName+    
				        '</div>';
		return div1;
	};
	
	detailWrapView.prototype.detailTaskDiv = function(obj) {
		var readOnly="readonly="+true;
		var taskName= "";
		var taskId= "";
		var projectName="";
		var supervisor_email="";
		var workerId="";
		var organization="";
		var address="";
		var name="";
		var plannedTime="";
		var workforce=[];
		if(obj["task_name"]!=undefined){
			taskName= obj["task_name"];
			taskId= obj["task_id"];
			projectName=obj["project_name"];
			supervisor_email=obj["supervisor_email"];
			workerId=obj["supervisor_id"];
			organization=obj["place"]["organization"];
			address=obj["place"]["address"];
			name=obj["place"]["name"];
			plannedTime=obj["planned_start_time"];
			workforce=obj["workforce"];
		}
		else{
			taskName= "";
			taskId= "";
			projectName="";
			supervisor_email="";
			workerId="";
			organization="";
			address="";
			name="";
			plannedTime="";
			readOnly="";
			workforce=[{
				        "first_name": "",
				        "second_name": "",
				        "tag_id": "",
				        "email": "",
				        "phone": "",
				        "sex": "",
				        "status": "",
				      }]
		}
		
		var array = typeof workforce != 'object' ? JSON.parse(workforce) : workforce;
		 
	    var str = '<table id="" class="dynamicTable">';
	     var headerCount=0;
	     var cellCount=0;
	    // table head
	        str += '<thead><tr>';
	        for (var index in array[0]) {
	        	str += '<th scope="col">' + index + ' </th>';
	        	headerCount=headerCount+1;
	        	if(headerCount>2){
	        		break;
	        	}
	        }
	        str += '</tr></thead>';	     
	    // table body
	    str += '<tbody>';
	    for (var i = 0; i < array.length; i++) {
	        str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
	        for (var index in array[i]) {
	            str += '<td>' + array[i][index] + '</td>';
	            cellCount=cellCount+1;
	            if(cellCount>2){
	            	break;
	            }
	        }
	        str += '</tr>';
	        }
	    str += '</tbody>'
	    str += '</table>';

		var taskDetailDiv1 ='<div class="panel-body">'+
								'<div class="col-lg-5">'+
									'<dl class="dl-horizontal">'+
							        '<dt>Task</dt>'+
							        '<dd> <input id="taskName" class="form-control taskField" placeholder="Task" '+readOnly+' value="'+taskName+'"></dd>'+
							        '<dt>Task Id</dt>'+
							        '<dd><input id="taskId" class="form-control taskField" placeholder="Task Id" '+readOnly +' value="'+taskId+'"></dd>'+
							        '<dt>Project Name</dt>'+
							        '<dd><input id="projName" class="form-control taskField" placeholder="Project Name" '+readOnly +' value="'+projectName+'"></dd>'+
							        '<dt>Supervisor Email</dt>'+
							        '<dd><input id="WorkerName" style="display:inline;" class="form-control taskField" placeholder="Supervisor Email" '+readOnly +' value="'+supervisor_email+'"></dd>'+
							        '<dt>Supervisor Id</dt>'+
							        '<dd><input id="superId" class="form-control taskField" placeholder="Project Name" '+readOnly +' value="'+workerId+'"></dd>'+
							        '<dt>Planned Start Time</dt>'+
							        '<dd><input type="datetime-local" id="plannedStart" class="form-control taskField"'+readOnly +' value="'+plannedTime+'"></dd>'+
							        '</dl>'+
							     '</div>';
		var taskDetailDiv2 ='<div class="col-lg-5">'+
								'<dl class="dl-horizontal">'+
							        '<dt>Organization</dt>'+
							        '<dd><input id="Organization" style="display:inline;" class="form-control taskField" placeholder="Organization" '+readOnly +' value="'+organization+'"></dd>'+
							        '<dt>Location</dt>'+
							        '<dd><input id="orgName" class="form-control taskField" placeholder="Organization Name" '+readOnly +' value="'+name+'"></dd>'+
							        '<dt>Organization Address</dt>'+
							        '<dd><input  id="orgAddress" style="width:100%;" class="form-control taskField" placeholder="Address" '+readOnly +' value="'+address+'"></dd>'+
							        '<dt>WorkForce</dt>'+
							        '<dd id="workerDetail">'+str+'</dd>'+
						        '</dl>'+
						        '<div class="parentButton">'+
						        '</div>'+
							'</div>';
		var taskdetailDiv3 = '</div>';
			return taskDetailDiv1+taskDetailDiv2+taskdetailDiv3;
	};
	
	detailWrapView.prototype.detailNotificationDiv = function(obj) {
		var notificationObj=obj["details"];
		var keyArray = Object.keys(notificationObj);
		
		var taskTempDiv1 ='<div class="panel-body">'+
								'<div class="col-lg-5">'+
									'<dl class="dl-horizontal">';
									var tempDiv="";
									for(var i=0;i<3;i++){
										var tempDiv1="";
										tempDiv1='<dt>'+keyArray[i]+'</dt>'+
							        '<dd> <input class="form-control taskField" value="'+notificationObj[keyArray[i]]+'"></dd>';
										tempDiv=tempDiv+tempDiv1;
									}
									
							 var taskTempDiv2='</dl>'+
							     '</div>';
        var taskDetailDiv1=taskTempDiv1+tempDiv+taskTempDiv2;
		var taskTempDiv3 ='<div class="col-lg-5">'+
								'<dl class="dl-horizontal">';
        							var tempDiv2="";
        							for(var j=3;j<keyArray.length;j++){
        								var tempDiv3='<dt>'+keyArray[j]+'</dt>'+
							        '<dd><input id="Organization" style="display:inline;" class="form-control taskField" value="'+notificationObj[keyArray[j]]+'"></dd>';
        								tempDiv2=tempDiv2+tempDiv3;
        							}
        				
        			var taskTempDiv4='<dt></dt>'+
			        						'<dd><img src="img/regionEnter.jpg"></dd>'+
        								'</dl>'+
	        								'<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">'+
	        								'Take Action'+
	        								'</button>'+
							'</div>';
		
        var taskDetailDiv2=taskTempDiv3+tempDiv2+taskTempDiv4;
        var taskdetailDiv3 = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
								  '<div class="modal-dialog">'+
								    '<div class="modal-content">'+
								      '<div class="modal-header">'+
								        '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
								        '<h4 class="modal-title" id="myModalLabel">Notification</h4>'+
								      '</div>'+
								      '<div class="modal-body">'+
								      '<div class="form-group">'+
	                                      '<label>Project</label>'+
	                         
	                                      '<input class="form-control" value="'+obj["alert_type"]+'">'+
	                                  '</div>'+
	                                  '<div class="form-group">'+
	                                      '<label>Reason</label>'+
	                                      '<input class="form-control taskField" value="'+obj["reason"]+'">'+
	                                  '</div>'+
									   '<div class="form-group">'+
	                                      '<label>Notification Status</label>'+
	                                      '<select class="form-control">'+
	                                          '<option>Open</option>'+
	                                          '<option>In-Progress</option>'+
	                                          '<option>Delayed</option>'+
	                                          '<option>Completed</option>'+
	                                          '<option>Closed</option>'+
	                                      '</select>'+
	                                  '</div>'+
	                                  '<div class="form-group">'+
	                                      '<label>Notify User</label>'+
	                                      '<div class="radio">'+
	                                          '<label>'+
	                                              '<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>SMS'+
	                                          '</label>'+
	                                      '</div>'+
	                                      '<div class="radio">'+
	                                          '<label>'+
	                                              '<input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">Email'+
	                                          '</label>'+
	                                      '</div>'+
	                                      '<div class="radio">'+
	                                          '<label>'+
	                                              '<input type="radio" name="optionsRadios" id="optionsRadios3" value="option3">Escalate'+
	                                          '</label>'+
	                                      '</div>'+
                                      '</div>'+
								      '</div>'+
								      '<div class="modal-footer">'+
								        "<button type='button' class='btn btn-default'  data-dismiss='modal'>Cancel</button>"+
								        "<button type='button' class='btn btn-primary' data-dismiss='modal' onclick='window.app.component.sendEmail("+JSON.stringify(obj)+")'>Submit</button>"+
								      '</div>'+
								    '</div>'+
								  '</div>'+
								'</div>'+
								'</div>';
			return taskDetailDiv1+taskDetailDiv2+taskdetailDiv3;
	};
	detailWrapView.prototype.buildTaskItemDetailUI = function(obj) {
		$(".listItem").removeClass("firstSelect");
		$("#"+obj["task_id"]).addClass("firstSelect");
		$(".detailList").remove();
		this.currentTaskObj=obj;
		var div = this.createTaskDetailDiv(obj);
		$(".detailwrap").append(div);
	};
	
	detailWrapView.prototype.buildNotificationItemDetailUI = function(obj) {
		$(".detailList").remove();
		var div = this.createNotificationDetailDiv(obj);
		$(".detailwrap").append(div);
	};
	
	detailWrapView.prototype.buildNewTaskUI = function() {
		this.newTask=true;
		var obj={};
		this.buildTaskItemDetailUI(obj);
		$(".parentButton").empty();
		var newtaskbutton="<button class='btn btn-danger' type='button' style='float:right;' onclick='window.app.component.cancelAction();'>Cancel</button>"+
		  "<button class='btn btn-success' type='button' style='float:right;' onclick='window.app.component.saveChanges();'>Save</button>";
		$(".parentButton").append(newtaskbutton);
		var workerNameArray=["Abdul rashid","Mohamed kaif","Zaheer Ahmed","Imran khan","Moin khan","Rameez raja","Mohammad Sami","Naziruddin shah"];
		$("input#WorkerName").autocomplete({source: workerNameArray});
		$("#workerDetail").append('<img style="display:inline;" data-toggle="modal" data-target="#myModaldialog" src="img/Add-icon.png">');
	};
	
	detailWrapView.prototype.buildEditTaskUI = function(obj) {
		this.newTask=false;
		var editTaskFieldArray=$(".taskField");
		
		for(var i=0;i<editTaskFieldArray.length;i++){
			editTaskFieldArray[i].readOnly=false;
		};
		var newtaskbutton="<button class='btn btn-danger' type='button' style='float:right;' onclick='window.app.component.cancelAction();'>Cancel</button>"+
		  "<button class='btn btn-success' type='button' style='float:right;' onclick='window.app.component.saveChanges();'>Save</button>";
		$(".parentButton").append(newtaskbutton);
		var workerNameArray=["Abdul rashid","Mohamed kaif","Zaheer Ahmed","Imran khan","Moin khan","Rameez raja","Mohammad Sami","Naziruddin shah"];
		$("input#WorkerName").autocomplete({source: workerNameArray});
		$("#workerDetail").append('<img style="display:inline;" data-toggle="modal" data-target="#myModaldialog" src="img/Add-icon.png">');
		
	};
	
	detailWrapView.prototype.buildNewResourceWorkerUI = function() {
		var obj={};
		this.buildResourcesWorkerDetailView(obj);
		var newtaskbutton="<button class='btn btn-danger' type='button' style='float:right;' onclick='window.app.component.cancelAction();'>Cancel</button>"+
		  "<button class='btn btn-success' type='button' style='float:right;' onclick='window.app.component.saveChanges();'>Save</button>";
		$(".parentButton").append(newtaskbutton);
		var workerNameArray=["Abdul rashid","Mohamed kaif","Zaheer Ahmed","Imran khan","Moin khan","Rameez raja","Mohammad Sami","Naziruddin shah"];
		$("input#WorkerName").autocomplete({source: workerNameArray});
		$("#workerDetail").append('<img style="display:inline;" data-toggle="modal" data-target="#myModaldialog" src="img/Add-icon.png">');
	};
	
	detailWrapView.prototype.buildEditResourceWorkerUI = function(obj) {
		
		var editTaskFieldArray=$(".taskField");
		
		for(var i=0;i<editTaskFieldArray.length;i++){
			editTaskFieldArray[i].readOnly=false;
		};
		
		var workerNameArray=["Abdul rashid","Mohamed kaif","Zaheer Ahmed","Imran khan","Moin khan","Rameez raja","Mohammad Sami","Naziruddin shah"];
		$("input#WorkerName").autocomplete({source: workerNameArray});
		$("#workerDetail").append('<img style="display:inline;" data-toggle="modal" data-target="#myModaldialog" src="img/Add-icon.png">');
		
	};
	
	detailWrapView.prototype.buildNewResourceUI = function() {
		var obj={};
		this.buildResourcesDetailView(obj);
		var newtaskbutton='<button class="btn btn-danger" type="button" style="float:right;">Cancel</button>'+
		  '<button class="btn btn-success" type="button" style="float:right;">Create</button>';
		$(".parentButton").append(newtaskbutton);
	};
	
	detailWrapView.prototype.buildEditResourceUI = function(obj) {
		
		var editTaskFieldArray=$(".taskField");
		
		for(var i=0;i<editTaskFieldArray.length;i++){
			editTaskFieldArray[i].readOnly=false;
		};		
	};
	detailWrapView.prototype.buildResourcesView = function() {
		$(".detailwrap").remove();
		var headDiv='<div class="row detailwrap detailResourcewrap" >'+
		'<div class="col-lg-12">';
		
		var content='<ul id="myTab" class="nav nav-tabs">'+
				        '<li class="active"><a href="#Equipment" data-toggle="tab">Equipment</a></li>'+
				        '<li><a href="#Material" data-toggle="tab">Material</a></li>'+
				        '<li><a href="#Worker" data-toggle="tab">Worker</a></li>'+
				     '</ul>'+
				     '<div id="myTabContent" class="tab-content">';
		var resourceContent=this.buildEquipmentResourceDetail();
		var resourceWorkerContent = this.buildWorkerResourceDetail();
		var footer='</div>'+
			'</div>'+
		'</div>';
		var completeDiv=headDiv+content+resourceContent+resourceWorkerContent+footer;
		$("#page-wrapper").append(completeDiv);
	};
	detailWrapView.prototype.buildEquipmentResourceDetail = function() {
		var equipmentheadDiv= '<div class="tab-pane fade in active resourceMain" id="Equipment">';
		var equipmentDivList=this.createResource(deviceObj);
		var equipmentDivDetail = this.createResourceDetailDiv(deviceObj[0]);
		var equipmentFootDiv='</div>';
		var equipmentDiv=equipmentheadDiv+equipmentDivList+equipmentDivDetail+equipmentFootDiv;
		return equipmentDiv;
	};
	
	detailWrapView.prototype.buildWorkerResourceDetail = function() {
		var workerheadDiv= '<div class="tab-pane fade in active resourceMain" id="Worker">';
		var workerDivList=this.createResourceWorker(workerObj);
		var workerDivDetail = this.createResourceWorkerDetailDiv(workerObj[0]);
		var workerFootDiv='</div>';
		var workerDiv=workerheadDiv+workerDivList+workerDivDetail+workerFootDiv;
		return workerDiv;
	};
	
	detailWrapView.prototype.createResource = function(obj) {
		var createParentNavDiv = this.createResourceParentNav(obj);
		var createNavSearch = this.createSearchDiv();
		var ResourceDiv='<div class="panel-body">';
		var ResourceTempDiv="";
					for(var i=0;i<obj.length;i++){
							var tempDiv="";
							var JsonString = JSON.stringify(obj[i]);
								if(i==0){
									   tempDiv="<div class='firstSelect alert alert-info' onclick='window.app.component.handleResorceListClick("+JsonString+");'>";	
									   
								}
								else{
									tempDiv="<div class='alert alert-info' onclick='window.app.component.handleResorceListClick("+JsonString+");'>";
								}
						    var temp2Div=obj[i]['device_name']+
						            		'<span class="pull-right text-muted small"><em>'+obj[i]['status']+'</em>'+
						            	'</div>';
						    ResourceTempDiv = ResourceTempDiv+tempDiv+temp2Div;
								}
			var ResourceDiv1='</div>';	
			var ResourceEndDiv='</div>'+
			'</div>';
								
			return createParentNavDiv+createNavSearch+ResourceDiv+ResourceTempDiv+ResourceDiv1+ResourceEndDiv;
	};
	
	detailWrapView.prototype.createResourceWorker = function(obj) {
		var createParentNavDiv = this.createResourceWorkerParentNav(obj);
		var createNavSearch = this.createSearchDiv();
		var ResourceDiv='<div class="panel-body">';
		var ResourceTempDiv="";
					for(var i=0;i<obj.length;i++){
							var tempDiv="";
							var JsonString = JSON.stringify(obj[i]);
								if(i==0){
									   tempDiv="<div id='"+obj[i]["worker_id"]+"' class='firstSelect listItem alert alert-info' onclick='window.app.component.handleResorceWorkerListClick("+JsonString+");'>";	
									   
								}
								else{
									tempDiv="<div id='"+obj[i]["worker_id"]+"' class='alert alert-info listItem' onclick='window.app.component.handleResorceWorkerListClick("+JsonString+");'>";
								}
						    var temp2Div=obj[i]['first_name']+" "+obj[i]['second_name']+
						            		'<span class="pull-right text-muted small"><em>'+obj[i]['sex']+'</em>'+
						            	'</div>';
						    ResourceTempDiv = ResourceTempDiv+tempDiv+temp2Div;
								}
			var ResourceDiv1='</div>';	
			var ResourceEndDiv='</div>'+
			'</div>';
								
			return createParentNavDiv+createNavSearch+ResourceDiv+ResourceTempDiv+ResourceDiv1+ResourceEndDiv;
	};
	detailWrapView.prototype.createResourceParentNav = function(obj) {
		var div1='<div class="col-lg-3">'+
			        '<div class="panel panel-default detailResourceLeftList">'+
				        '<div class="panel-heading">'+obj[0]['device_type']+
				        '</div>';
		return div1;
	};
	
	detailWrapView.prototype.createResourceWorkerParentNav = function(obj) {
		var div1='<div class="col-lg-3">'+
			        '<div class="panel panel-default detailResourceLeftList">'+
				        '<div class="panel-heading">'+obj[0]['worker_name']+
				        '</div>';
		return div1;
	};
	detailWrapView.prototype.createSearchDiv = function(obj) {
		var div1='<div>'+
					'<ul class="nav">'+
						'<li class="sidebar-search">'+
							        '<div class="input-group custom-search-form">'+
							        '<input type="text" class="form-control" placeholder="Search...">'+
							        '<span class="input-group-btn">'+
							        '<button class="btn btn-default" type="button">'+
							            '<i class="fa fa-search"></i>'+
							        '</button>'+
							    '</span>'+
							    '</div>'+
							 '</li>'+
					  '</ul>'+
					'</div>';
				
		return div1;
	};
	
	detailWrapView.prototype.createResourceDetailDiv = function(obj) {
		var div1 =this.createResourceDetailParentNav(obj);
		var div2 = this.detailResourceDiv(obj);
		var div3 = '</div>'+
					'</div>';
		return div1+ div2 + div3;
	};
	
	detailWrapView.prototype.createResourceWorkerDetailDiv = function(obj) {
		var div1 =this.createResourceWorkerDetailParentNav(obj);
		var div2 = this.detailResourceWorkerDiv(obj);
		var div3 = '</div>'+
					'</div>';
		return div1+ div2 + div3;
	};
	
	detailWrapView.prototype.createResourceDetailParentNav = function(obj) {
		var ResourceName="";
		if(obj["device_name"]!=undefined){
			ResourceName=obj["device_name"];
		}
		else{
			ResourceName="New Equipment";
		}
		
		var div1='<div class="col-lg-9 detailListResource">'+
			        '<div class="panel panel-default detailResourceRight">'+
				        '<div class="panel-heading">'+
				        ResourceName+    
				        "<i style='float:right;padding-left: 5px;' class='fa fa-edit' onclick='window.app.component.editResource("+JSON.stringify(obj)+");'></i>"+
				        "<i style='float:right;' class='fa fa-plus' onclick='window.app.component.addNewResource("+JSON.stringify(obj)+");'></i>"+
				        '</div>';
		return div1;
	};
	
	detailWrapView.prototype.createResourceWorkerDetailParentNav = function(obj) {
		var ResourceName="";
		if(obj["worker_id"]!=undefined){
			ResourceName=obj["worker_id"];
		}
		else{
			ResourceName="New Worker";
		}
		
		var div1='<div class="col-lg-9 detailListResource">'+
			        '<div class="panel panel-default detailResourceRight">'+
				        '<div class="panel-heading">'+
				        ResourceName+    
				        "<i style='float:right;padding-left: 5px;' class='fa fa-edit' onclick='window.app.component.editResourceWorker("+JSON.stringify(obj)+");'></i>"+
				        "<i style='float:right;' class='fa fa-plus' onclick='window.app.component.addNewResourceWorker("+JSON.stringify(obj)+");'></i>"+
				        '</div>';
		return div1;
	};
	detailWrapView.prototype.detailResourceDiv = function(obj) {
		var readOnly="readonly="+true;
		var deviceName= "";
		var deviceType= "";
		var vendor="";
		var PlaceName="";
		var deviceId="";
		var reason="";
		if(obj["device_name"]!=undefined){
			deviceName= obj["device_name"];
			deviceType= obj["device_type"];
			vendor=obj["vendor"];
			PlaceName=obj["place_name"];
			deviceId=obj["device_id"];
			reason="";
		}
		else{
			deviceName= "";
			deviceType= "";
			vendor="";
			PlaceName="";
			deviceId="";
			reason="";
			readOnly="";
		}
		var taskDetailDiv1 ='<div class="panel-body">'+
								'<div class="col-lg-5">'+
									'<dl class="dl-horizontal">'+
							        '<dt>Device</dt>'+
							        '<dd> <input class="form-control taskField" placeholder="Device" '+readOnly+' value="'+deviceName+'"></dd>'+
							        '<dt>Type</dt>'+
							        '<dd><input class="form-control taskField" placeholder="Device Type" '+readOnly +' value="'+deviceType+'"></dd>'+
							        '<dt>Vendor Name</dt>'+
							        '<dd><input class="form-control taskField" placeholder="vendor Name" '+readOnly +' value="'+vendor+'"></dd>'+
							        '</dl>'+
							        '<form role="form">'+
		                                '<div class="form-group" style="margin-left:75px;">'+
		                                    '<label>Reason</label>'+
		                                    '<input class="form-control reason" placeholder="Brief Description" '+readOnly +' value="'+reason+'">'+
		                             '</div>'+
		                             '</form>'+
							     '</div>';
		var taskDetailDiv2 ='<div class="col-lg-5">'+
								'<dl class="dl-horizontal">'+
							        '<dt>Place Name</dt>'+
							        '<dd id="PlaceNameDetail"><input id="PlaceName" style="display:inline;" class="form-control taskField" placeholder="Place Name" '+readOnly +' value="'+PlaceName+'"></dd>'+
							        '<dt>Device Id</dt>'+
							        '<dd><input class="form-control taskField" placeholder="Device Id" '+readOnly +' value="'+deviceId+'"></dd>'+
						        '</dl>'+
						        '<div class="parentButton">'+
						        '</div>'+						        
							'</div>';
		var taskdetailDiv3 = '</div>';
			return taskDetailDiv1+taskDetailDiv2+taskdetailDiv3;
	};
	
	detailWrapView.prototype.detailResourceWorkerDiv = function(obj) {
		var readOnly="readonly="+true;
		var workerName="";
		var workerId="";
		var tagId="";
		var email="";
		var phone="";
		var sex="";
		if(obj["worker_id"]!=undefined){
			 workerName=obj["first_name"]+" "+obj["second_name"];
			 workerId=obj["worker_id"];
			 tagId=obj["tag_id"];
			 email=obj["email"];
			 phone=obj["phone"];
			 sex=obj["sex"];
		}
		else{
			workerName="";
			workerId="";
			tagId="";
			email="";
			phone="";
			sex="";
			readOnly="";
		}
		var taskDetailDiv1 ='<div class="panel-body">'+
								'<div class="col-lg-5">'+
									'<dl class="dl-horizontal">'+
							        '<dt>Worker Name</dt>'+
							        '<dd id="workerDetail"> <input id="WorkerName" class="form-control taskField" placeholder="Worker Name" '+readOnly+' value="'+workerName+'"></dd>'+
							        '<dt>Worker Id</dt>'+
							        '<dd><input class="form-control taskField" id="workerId" placeholder="Id" '+readOnly +' value="'+workerId+'"></dd>'+
							        '<dt>Tag Id</dt>'+
							        '<dd><input class="form-control taskField" id="tagId" placeholder="TagId" '+readOnly +' value="'+tagId+'"></dd>'+
							        '</dl>'+
							     '</div>';
		var taskDetailDiv2 ='<div class="col-lg-5">'+
								'<dl class="dl-horizontal">'+
							        '<dt>Email</dt>'+
							        '<dd><input id="PlaceName" style="display:inline;" class="form-control taskField" placeholder="emailId" '+readOnly +' value="'+email+'"></dd>'+
							        '<dt>Phone</dt>'+
							        '<dd><input id="Phone" class="form-control taskField" placeholder="phone number" '+readOnly +' value="'+phone+'"></dd>'+
							        '<dt>Sex</dt>'+
							        '<dd><input id="Sex" class="form-control taskField" placeholder="Gender" '+readOnly +' value="'+sex+'"></dd>'+
						        '</dl>'+
						        '<div class="parentButton">'+
						        '</div>'+						        
							'</div>';
		var taskdetailDiv3 = '</div>';
			return taskDetailDiv1+taskDetailDiv2+taskdetailDiv3;
	};
	
	detailWrapView.prototype.buildResourcesDetailView = function(obj) {
		$(".detailListResource").remove();
		var div = this.createResourceDetailDiv(obj);
		$(".resourceMain").append(div);
	};
	
	detailWrapView.prototype.buildResourcesWorkerDetailView = function(obj) {
		$(".listItem").removeClass("firstSelect");
		$("#"+obj["worker_id"]).addClass("firstSelect");
		$(".detailListResource").remove();
		var div = this.createResourceWorkerDetailDiv(obj);
		$(".resourceMain").append(div);
	};
	detailWrapView.prototype.getPlaceFrameUI = function() {
		$(".detailwrap").remove();
		var headDiv='<div class="row detailwrap detailPlacewrap" >'+
		'<div class="col-lg-12" style="height:440px;">';
		var content='<input id="pac-input" class="controls" type="text" placeholder="Search Box">'+
	    			'<div id="map-canvas"></div>';
		var footer='</div>'+
					'</div>';
		var completeDiv=headDiv+content+footer;
		$("#page-wrapper").append(completeDiv);
		var defaultCoords= taskObj[0]["place"]["coords"];
		initialize(defaultCoords[0],defaultCoords[1]);
		
		var anim = google.maps.Animation.DROP;
		var infowindow = new google.maps.InfoWindow();
		for(var i=0;i<taskObj.length;i++){
			var latitude=taskObj[i]["place"]["coords"];
			var marker=new google.maps.Marker({
			  position:new google.maps.LatLng(latitude[0],latitude[1]),
			  map:window.app.googleMap,
			  animation:anim
			  });
			marker.setMap(window.app.googleMap);
				marker.html='<div id="content">'+
								'<h3>'+taskObj[i].task_name+'</h3>'+
								'<hr>'+
								'<h6>Organization  :'+taskObj[i]["place"].organization +'</h6>'+
								'<h6>Name :'+taskObj[i]["place"].name +'</h6>'+    
							'</div>';
			google.maps.event.addListener(marker, 'click', function() {
			  infowindow.setContent(this.html);
			  infowindow.open(window.app.googleMap,this);
			  });
	};
};

detailWrapView.prototype.cancelAction = function() {
	if(this.newTask){
		this.buildTaskItemDetailUI(this.currentTaskObj);
	}
	else{
		var editTaskFieldArray=$(".taskField");
		
		for(var i=0;i<editTaskFieldArray.length;i++){
			editTaskFieldArray[i].readOnly=true;
		};
		$(".parentButton").empty();
	}
};

detailWrapView.prototype.saveChanges = function() {
	var taskObj={};
	
	taskObj["task_name"]= $("#taskName").val();
	taskObj["task_id"]= $("#taskId").val();
	taskObj["project_name"]=$("#projName").val();
	taskObj["supervisor_email"]=$("#WorkerName").val();
	taskObj["supervisor_id"]=$("#superId").val();
	taskObj["place"]={};
	taskObj["place"]["organization"]=$("#Organization").val();
	taskObj["place"]["name"]=$("#orgName").val();
	taskObj["place"]["address"]=$("#orgAddress").val();
	taskObj["planned_start_time"]=$("#plannedStart").val();
	var that =this;
	if(this.newTask){
		taskObj["status"]="open";
		$.ajax({url:"http://localhost:3000/api/tasks/create",data : taskObj,type : "POST",success:function(taskCreation){
			var result=taskCreation;
			$.ajax({url:"http://localhost:3000/api/tasks",success:function(resultTasks){
				that.buildTaskDetail(resultTasks);
			}});
		},failure:function(error){
			var errorobj=error;
		}});
	}
	else{
		$.ajax({url:"http://localhost:3000/api/tasks/updateTask/",data: taskObj,type : "POST",success:function(taskUpdate){
			var result=taskUpdate;
			$.ajax({url:"http://localhost:3000/api/tasks",success:function(resultTasks){
				that.buildTaskDetail(resultTasks);
			}});
		},failure:function(error){
			var errorobj=error;
		}});
	}
};

detailWrapView.prototype.sendEmail = function(obj) {
	var action="";
	if($("#optionsRadios1")[0].checked){
		action="SMS";
	}
	else if($("#optionsRadios2")[0].checked){
		action="email";
	}
	obj["action"]=action;
	$.ajax({url:"http://localhost:3000/api/alert/:"+obj["alertid"],data: JSON.stringify(obj),type : "PUT",contentType: 'application/json',success:function(successEmail){
		var result=successEmail;
	}});
};

detailWrapView.prototype.getStatusClass = function(type) {
	var cssClass="";
	switch(type){
		case "started":
			cssClass="alert alert-info";
			break;
		case "open":
			cssClass="alert alert-info";
			break;
		case "delay":
			cssClass="alert alert-danger";
			break;
		case "finished":
			cssClass="alert alert-success";
			break;
		case "planned":
			cssClass="alert alert-info";
			break;
		default:
			cssClass=""	;
	}
	return cssClass;
};
	return (new detailWrapView());
});
