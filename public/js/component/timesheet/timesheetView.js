
define(["timesheet/timesheetController"], function(controller){

	var timesheetView = function(){
		this.oController = controller;
	};
	timesheetView.prototype.createContent = function() {
		// var dp = "<div id='dp'></div>";
		this.createTimeSheetView('dp');
		//return dp;
		
	};
	
	timesheetView.prototype.getController = function() {
		return this.oController;
	};
	
	timesheetView.prototype.createTimeSheetView = function(divId) {

		// behavior and appearance
		// dp.cssClassPrefix = "bubble_default";

		// view
		// dp.startDate = "2013-03-25";  // or just dp.startDate = "2013-03-25";
		// dp.days = 1;
		this.dp = new DayPilot.Calendar(divId);
		// var dateTimeFormat = Intl.DateTimeFormat();
		this.dp.viewType = "Week";
		var now = new Date();
		this.dp.startDate = now.toJSON2();
		this.dp.init();


		// var itemModel = obj;
		// var ItemDiv="";
		// for(var i=0;i<itemModel.length;i++){
		//	var JsonString = JSON.stringify(itemModel[i]);
		// }
		// return ItemDiv;
	};

	timesheetView.prototype.addEvent = function(_event) {
		var e = new DayPilot.Event({
			start: new DayPilot.Date(_event.startDate),
			end: new DayPilot.Date(_event.endDate),
			id: _event.eventId,
			text: _event.eventInfo
		});

		this.dp.events.add(e);
	};

	timesheetView.prototype.populateEvents = function(events) {
		// var events = this.oController.fetchEvents();
		events.forEach(function(_event) {
			var formatedEvent = {};
			formatedEvent.startDate = new Date(_event.start_time).toJSON2();
			formatedEvent.endDate = new Date(_event.end_time).toJSON2();
			formatedEvent.eventId = _event.eventid;
			formatedEvent.eventInfo = _event.task_name + " - " + _event.worker_name;
			this.addEvent(formatedEvent);
		}.bind(this));
	};
	
	return (new timesheetView());
});
