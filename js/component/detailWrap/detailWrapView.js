
define(["detailWrap/detailWrapController"], function(controller){

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
		if(obj[0]["kind"]=="Task"){
			this.buildTaskChart();
		}
		else if(obj[0]["kind"]=="Notification"){
			this.buildNotificationChart();
		}
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
			        '<div class="panel panel-default">'+
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
		var div1='<div class="col-lg-9 detailList">'+
			        '<div class="panel panel-default">'+
				        '<div class="panel-heading">'+
				        obj['type']+
				        '</div>';
		return div1;
	};
	
	detailWrapView.prototype.detailTaskDiv = function(obj) {
		var taskDetailDiv1 ='<div class="panel-body">'+
								'<div class="col-lg-3">'+
									'<dl class="dl-horizontal">'+
							        '<dt>Task</dt>'+
							        '<dd>'+obj["details"]["task"]+'</dd>'+
							        '<dt>Created Time Id</dt>'+
							        '<dd>'+obj["details"]["enter_time"]+'</dd>'+
							        '</dl>'+
							        '<form role="form">'+
		                                '<div class="form-group">'+
		                                    '<label>comments</label>'+
		                                    '<input class="form-control comments" placeholder="Enter Comments">'+
		                             '</div>'+
		                             '</form>'+
							     '</div>';
		var taskDetailDiv2 ='<div class="col-lg-2">'+
								'<dl class="dl-horizontal">'+
							        '<dt>Worker Name</dt>'+
							        '<dd>'+obj["details"]["worker_name"]+'</dd>'+
							        '<dt>Worker Id</dt>'+
							        '<dd>'+obj["details"]["worker_id"]+'</dd>'+
						        '</dl>'+
							'</div>';
		var taskdetailDiv3 = '<div class="col-lg-4 test" id="morris-bar-chart">'+
								'<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">'+
								  'Take Action'+
								'</button>'+
						
								
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
	                                      '<input class="form-control" value="'+obj["details"]["reason"]+'">'+
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
	detailWrapView.prototype.buildTaskChart = function() {
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
	};
	detailWrapView.prototype.buildTaskItemDetailUI = function(obj) {
		$(".detailList").remove();
		var div = this.createTaskDetailDiv(obj);
		$(".detailwrap").append(div);
		if(obj["kind"]=="Task"){
			this.buildTaskChart();
		}
		else if(obj["kind"]=="Notification"){
			this.buildNotificationChart();
		}
	};
	detailWrapView.prototype.buildNotificationChart = function() {
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
	};
	return (new detailWrapView());
});
