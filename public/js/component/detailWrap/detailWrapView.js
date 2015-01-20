
define(["detailWrap/detailWrapController","jquery-autocomplete"], function(controller,jquery){

	var detailWrapView = function(){
		this.oController = controller;
		this.addCardRef="";
	};
	detailWrapView.prototype.createContent = function(obj) {
	var dashBoardChartDiv='<div class="row detailwrap" >'+
						'<div class="col-lg-8">'+
							'<div class="panel panel-default">'+
					                 '<div class="panel-heading">'+
					                     '<i class="fa fa-bar-chart-o fa-fw"></i>Employee Analysis'+
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
					                                 '<li><a href="#">Something else here</a>'+
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
							        '<div class="panel panel-default">'+
								        '<div class="panel-heading">'+
								            '<i class="fa fa-bell fa-fw"></i> Notifications Panel'+
								        '</div>';
			
		var NotificationDiv='<div class="panel-body">';
		var notifyDiv="";
							for(var i=0;i<alertObj.length;i++){
								
						    var tempDiv='<div class="'+alertObj[i]['class']+'">'+
						            '<i class="fa fa-comment fa-fw"></i>'+alertObj[i]['type']+
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
		$(".detailwrap").append(taskDetailDiv);
		/*if(obj[0]["kind"]=="Task"){
			this.buildTaskChart();
		}
		else if(obj[0]["kind"]=="Notification"){
			this.buildNotificationChart();
		}*/
	};
	detailWrapView.prototype.createTask = function(obj) {
		var createParentNavDiv = this.createTaskParentNav(obj);
		var createNavSearch = this.createSearchDiv();
		var TaskDiv='<div class="panel-body">';
		var taskTempDiv="";
					for(var i=0;i<obj.length;i++){
							var tempDiv="";
							var JsonString = JSON.stringify(obj[i]);
								if(i==0){
									   tempDiv="<div class='firstSelect "+obj[i]["class"]+"' onclick='window.app.component.handleItemListClick("+JsonString+");'>";	
									   
								}
								else{
									tempDiv="<div class='"+obj[i]["class"]+"' onclick='window.app.component.handleItemListClick("+JsonString+");'>";
								}
						    var temp2Div=obj[i]['type']+
						            		'<span class="pull-right text-muted small"><em>'+obj[i]['status']+'</em>'+
						            	'</div>';
						    taskTempDiv = taskTempDiv+tempDiv+temp2Div;
								}
			var taskDiv1='</div>';	
			var taskendDiv='</div>'+
			'</div>';
								
			return createParentNavDiv+createNavSearch+TaskDiv+taskTempDiv+taskDiv1+taskendDiv;
	};
	detailWrapView.prototype.createTaskParentNav = function(obj) {
		var div1='<div class="col-lg-3">'+
			        '<div class="panel panel-default detailLeftList">'+
				        '<div class="panel-heading">'+obj[0]['kind']+
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
	
	detailWrapView.prototype.createTaskDetailParentNav = function(obj) {
		var taskName="";
		if(obj["details"]!=undefined){
			taskName=obj["details"]["task"];
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
	
	detailWrapView.prototype.detailTaskDiv = function(obj) {
		var readOnly="readonly="+true;
		var taskName= "";
		var taskType= "";
		var projectName="";
		var WorkerName="";
		var workerId="";
		var reason="";
		if(obj["details"]!=undefined){
			taskName= obj["details"]["task"];
			taskType= obj["type"];
			projectName=obj["project"];
			WorkerName=obj["details"]["worker_name"];
			workerId=obj["details"]["worker_id"];
			reason=obj["details"]["reason"];
		}
		else{
			taskName= "";
			taskType= "";
			projectName="";
			WorkerName="";
			workerId="";
			reason="";
			readOnly="";
		}
		var taskDetailDiv1 ='<div class="panel-body">'+
								'<div class="col-lg-5">'+
									'<dl class="dl-horizontal">'+
							        '<dt>Task</dt>'+
							        '<dd> <input class="form-control taskField" placeholder="Task" '+readOnly+' value="'+taskName+'"></dd>'+
							        '<dt>Type</dt>'+
							        '<dd><input class="form-control taskField" placeholder="Task Type" '+readOnly +' value="'+taskType+'"></dd>'+
							        '<dt>Project Name</dt>'+
							        '<dd><input class="form-control taskField" placeholder="Project Name" '+readOnly +' value="'+projectName+'"></dd>'+
							        '</dl>'+
							        '<form role="form">'+
		                                '<div class="form-group" style="margin-left:75px;">'+
		                                    '<label>Reason</label>'+
		                                    '<input class="form-control reason" placeholder="Brief Description" '+readOnly +' value="'+reason+'">'+
		                             '</div>'+
		                             '<div class="form-group parentButton" style="margin-right: 70px;margin-top: 33px;">'+
		                             	'<button class="btn btn-success buttonAction" type="button" style="float:right;" data-toggle="modal" data-target="#myModal">Take Action</button>'+
		                             '</div>'+
		                             '</form>'+
							     '</div>';
		var taskDetailDiv2 ='<div class="col-lg-5">'+
								'<dl class="dl-horizontal">'+
							        '<dt>Worker Name</dt>'+
							        '<dd id="workerDetail"><input id="WorkerName" style="display:inline;" class="form-control taskField" placeholder="Worker Name" '+readOnly +' value="'+WorkerName+'"></dd>'+
							        '<dt>Worker Id</dt>'+
							        '<dd><input class="form-control taskField" placeholder="Worker Id" '+readOnly +' value="'+workerId+'"></dd>'+
						        '</dl>'+
							'</div>';
		var taskdetailDiv3 = 			
								
								'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
								  '<div class="modal-dialog">'+
								    '<div class="modal-content">'+
								      '<div class="modal-header">'+
								        '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
								        '<h4 class="modal-title" id="myModalLabel">'+obj["kind"]+'</h4>'+
								      '</div>'+
								      '<div class="modal-body">'+
								      '<div class="form-group">'+
	                                      '<label>Project</label>'+
	                         
	                                      '<input class="form-control" value="'+obj["project"]+'">'+
	                                  '</div>'+
	                                  '<div class="form-group">'+
	                                      '<label>Reason</label>'+
	                                      '<input class="form-control taskField" value="'+reason+'">'+
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
								        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
								        '<button type="button" class="btn btn-primary">Save changes</button>'+
								      '</div>'+
								    '</div>'+
								  '</div>'+
								'</div>'+
								'</div>';
			return taskDetailDiv1+taskDetailDiv2+taskdetailDiv3;
	};
	/*detailWrapView.prototype.buildTaskChart = function() {
		Morris.Bar({
	        element: 'morris-bar-chart',
	        data: [{
	            y: '2006',
	            a: 100,
	            b: 90
	        }, {
	            y: '2007',
	            a: 75,
	            b: 65
	        }, {
	            y: '2008',
	            a: 50,
	            b: 40
	        }, {
	            y: '2009',
	            a: 75,
	            b: 65
	        }, {
	            y: '2010',
	            a: 50,
	            b: 40
	        }, {
	            y: '2011',
	            a: 75,
	            b: 65
	        }, {
	            y: '2012',
	            a: 100,
	            b: 90
	        }],
	        xkey: 'y',
	        ykeys: ['a', 'b'],
	        labels: ['Series A', 'Series B'],
	        hideHover: 'auto',
	        resize: true
	    });
	};*/
	detailWrapView.prototype.buildTaskItemDetailUI = function(obj) {
		$(".detailList").remove();
		var div = this.createTaskDetailDiv(obj);
		$(".detailwrap").append(div);
		/*if(obj["kind"]=="Task"){
			this.buildTaskChart();
		}
		else if(obj["kind"]=="Notification"){
			this.buildNotificationChart();
		}*/
	};
	
	detailWrapView.prototype.buildNewTaskUI = function() {
		var obj={};
		this.buildTaskItemDetailUI(obj);
		$(".parentButton").empty();
		var newtaskbutton='<button class="btn btn-danger" type="button" style="float:right;">Cancel</button>'+
		  '<button class="btn btn-success" type="button" style="float:right;">Create</button>';
		$(".parentButton").append(newtaskbutton);
		var workerNameArray=["Abdul rashid","Mohamed kaif","Zaheer Ahmed","Imran khan","Moin khan","Rameez raja","Mohammad Sami","Naziruddin shah"];
		$("input#WorkerName").autocomplete({source: workerNameArray});
		$("#workerDetail").append('<img style="display:inline;" data-toggle="modal" data-target="#myModaldialog" src="img/Add-icon.png">');
	};
	
	detailWrapView.prototype.buildEditTaskUI = function(obj) {
		
		var editTaskFieldArray=$(".taskField");
		
		for(var i=0;i<editTaskFieldArray.length;i++){
			editTaskFieldArray[i].readOnly=false;
		};
		
		$(".buttonAction")[0].innerHTML="Save Changes";
		var workerNameArray=["Abdul rashid","Mohamed kaif","Zaheer Ahmed","Imran khan","Moin khan","Rameez raja","Mohammad Sami","Naziruddin shah"];
		$("input#WorkerName").autocomplete({source: workerNameArray});
		$("#workerDetail").append('<img style="display:inline;" data-toggle="modal" data-target="#myModaldialog" src="img/Add-icon.png">');
		
		//$("#WorkerName")[0].autocomplete="on";
	};
	
/*	detailWrapView.prototype.buildNotificationChart = function() {
		 Morris.Donut({
		        element: 'morris-bar-chart',
		        data: [{
		            label: "Download Sales",
		            value: 12
		        }, {
		            label: "In-Store Sales",
		            value: 30
		        }, {
		            label: "Mail-Order Sales",
		            value: 20
		        }],
		        resize: true
		    });
	};*/
	return (new detailWrapView());
});
