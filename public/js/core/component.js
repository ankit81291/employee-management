define(["detailWrap/detailWrap","navBar/navBar","items/items", "timesheet/timesheet"], function(detailWrap,navBar,items, timesheet){
	
	var Component = function(){
	this.detailWrap=detailWrap;
	this.navBar=navBar;
	this.items=items;
	this.timesheet = timesheet;
	};
	
	Component.prototype.buildItemContent = function(obj){
		return this.items.getUI(obj);
	};
	
	Component.prototype.buildNavContent = function(obj){
		return this.navBar.getUI(obj);
	};
	
	Component.prototype.buildDetailWrapContent = function(obj){
		return this.detailWrap.getUI(obj);
	};

	Component.prototype.buildTimesheetContent = function() {
		return this.timesheet.renderUI();
	};

	Component.prototype.handleItemClick = function(obj){
		if(obj.title === "Task" || obj.kind === "Task" ){
			this.detailWrap.getTaskUI(taskObj);	
		}
		else if(obj.title === "Alert" || obj.kind === "Notification"){
			this.detailWrap.renderTimesheet();
		}
		else if(obj.title === "Resources"){
			this.detailWrap.getResourceUI();
		}
		else if(obj.title === "Place"){
			this.detailWrap.getPlaceUI();
		}
	};
	Component.prototype.handleResorceListClick = function(obj){
		this.detailWrap.getResourceDetailUI(obj);
	};
	Component.prototype.handleResorceWorkerListClick = function(obj){
		this.detailWrap.getResorceWorkerDetailUI(obj);
	};
	Component.prototype.handleNotificationListClick = function(obj){
		this.detailWrap.getNotificationDetailUI(obj);
	};
	
	Component.prototype.handleItemListClick = function(obj){
		this.detailWrap.getTaskItemDetailUI(obj);
	};
	Component.prototype.addNew = function(obj){
			this.detailWrap.getNewTaskUI();
	};
	
	Component.prototype.editResource = function(obj){
		this.detailWrap.getEditResourceUI(obj);
	};
	
	Component.prototype.addNewResource = function(obj){
		this.detailWrap.getNewResourceUI();
	};

	Component.prototype.editResourceWorker = function(obj){
		this.detailWrap.getEditResourceWorkerUI(obj);
	};
	
	Component.prototype.addNewResourceWorker = function(obj){
		this.detailWrap.getNewResourceWorkerUI();
	};
	
	Component.prototype.editTask = function(obj){
		this.detailWrap.getEditTaskUI(obj);
	};
	
	Component.prototype.cancelAction = function(obj){
		this.detailWrap.cancelAction();
	};
	
	Component.prototype.saveChanges = function(obj){
		this.detailWrap.saveChanges();
	};
	
	Component.prototype.sendEmail = function(obj){
		this.detailWrap.sendEmail(obj);
	};
	Component.prototype.showEquipment = function(){
		this.detailWrap.showEquipment();
	};
	Component.prototype.showTask = function(){
		this.detailWrap.showTask();
	};
	Component.prototype.buildDonutChart = function(){
		$("#morris-area-chart").empty();
			Morris.Donut({
				element: 'morris-area-chart',
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
		Component.prototype.buildBarChart = function(){
			$("#morris-area-chart").empty();
			Morris.Bar({
				element: 'morris-area-chart',
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
	return new Component();
});