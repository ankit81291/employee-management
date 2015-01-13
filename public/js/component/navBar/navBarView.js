
define(["navBar/navBarController"], function(controller){

	var navBarView = function(){
		this.oController = controller;
	};
	navBarView.prototype.createContent = function(obj) {
		var headerStartDiv='<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">';
		var buildHeader = this.buildNavHeader();
		var buildtasklistDiv1='<ul class="nav navbar-top-links navbar-right">';
		var taskListDiv= this.createTaskList();
        var alertTaskDiv= this.createAlertDiv();
        var buildUserDiv = this.buildUserProfileDiv();   
        var navDivFinish='</ul>'+
        				'</nav>';	
        var div = headerStartDiv+buildHeader+buildtasklistDiv1+taskListDiv+alertTaskDiv+buildUserDiv+navDivFinish;
		return div;
	};
	
	navBarView.prototype.getController = function() {
		return this.oController;
	};
	navBarView.prototype.createTaskList = function() {
		
		var taskDiv1='<li class="dropdown">'+
				        '<a class="dropdown-toggle" data-toggle="dropdown" href="#">'+
				            '<i class="fa fa-tasks fa-fw dropIcon"></i>  <i class="fa fa-caret-down dropIcon"></i>'+
				        '</a>'+
				        '<ul class="dropdown-menu dropdown-tasks">';
		
		var taskDiv2="";
		
		for(var i=0;i<taskObj.length;i++){
			var tempDiv="<li ' onclick='window.app.component.handleItemClick("+JSON.stringify(taskObj[i])+");'>"+
				            '<a href="#">'+
				            	'<div>'+
				                	'<p>'+
				                		'<strong>'+taskObj[i]["details"]["task"]+'</strong>'+
				                		'<span class="pull-right text-muted">'+taskObj[i]["percentage"]+'</span>'+
				                	'</p>'+
				                	'<div class="progress progress-striped active">'+
				                    	'<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">'+
				                        	'<span class="sr-only">'+taskObj[i]["percentage"]+' '+taskObj[i]["status"]+'</span>'+
				                        '</div>'+
				                    '</div>'+
				                 '</div>'+
				              '</a>'+
				        '</li>'+
				        '<li class="divider"></li>';
			var taskDiv2=taskDiv2+tempDiv;
		};
				          
				            
				        var taskDiv3='<li>'+
				                '<a class="text-center" href="#">'+
				                    '<strong>See All Tasks</strong>'+
				                    '<i class="fa fa-angle-right"></i>'+
				                '</a>'+
				            '</li>'+
				        '</ul>'+
				    '</li>';
				        
        return taskDiv1+taskDiv2+taskDiv3;
	};
	navBarView.prototype.buildNavHeader = function() {
		var headerDiv = '<div class="navbar-header">'+
						        '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'+
						        '<span class="sr-only">Toggle navigation</span>'+
						        '<span class="icon-bar"></span>'+
						        '<span class="icon-bar"></span>'+
						        '<span class="icon-bar"></span>'+
						    '</button>'+
						    '<a class="navbar-brand" href="index.html">WorkApp</a>'+
						'</div>';
		return headerDiv;	
	};
	
	navBarView.prototype.buildUserProfileDiv = function() {
		var userDiv= '<li class="dropdown">'+
				        '<a class="dropdown-toggle" data-toggle="dropdown" href="#">'+
				            '<i class="fa fa-user fa-fw dropIcon"></i>  <i class="fa fa-caret-down dropIcon"></i>'+
				        '</a>'+
				        '<ul class="dropdown-menu dropdown-user">'+
				            '<li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>'+
				            '</li>'+
				            '<li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>'+
				            '</li>'+
				            '<li class="divider"></li>'+
				            '<li><a href="login.html"><i class="fa fa-sign-out fa-fw"></i> Logout</a>'+
				            '</li>'+
				        '</ul>'+
				    '</li>';
		return userDiv;
		};
	navBarView.prototype.createAlertDiv = function() {
		var alertModel = alertObj;
	var alertDiv='<li class="dropdown">'+
				        '<a class="dropdown-toggle" data-toggle="dropdown" href="#">'+
				            '<i class="fa fa-bell fa-fw dropIcon"></i>  <i class="fa fa-caret-down dropIcon"></i>'+
				        '</a>'+
				        '<ul class="dropdown-menu dropdown-alerts">'+
				            '<li>'+
				                '<a href="#">'+
				                    '<div>'+
				                        '<i class="fa fa-comment fa-fw dropIcon"></i> New Comment'+
				                        '<span class="pull-right text-muted small">4 minutes ago</span>'+
				                    '</div>'+
				                '</a>'+
				            '</li>'+
				            '<li class="divider"></li>'+
				            '<li>'+
				                '<a class="text-center" href="#">'+
				                    '<strong>See All Alerts</strong>'+
				                    '<i class="fa fa-angle-right"></i>'+
				                '</a>'+
				            '</li>'+
				        '</ul>'+
		        '</li>';
	return alertDiv;
};
	
	return (new navBarView());
});
