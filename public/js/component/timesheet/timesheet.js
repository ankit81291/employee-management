define(["timesheet/timesheetView"], function(view){
	
	var timesheet = function(){
		this.oView = view;
		this.oController = this.oView.getController();

	};
	timesheet.prototype.renderUI = function() {
		this.oView.createContent();
		$.ajax(
			{
				url: "http://localhost:3000/api/calendarEvents",
				success: function(response) {
					this.oView.populateEvents(response);
				}.bind(this)
			}
		);
	};
	
	return (new timesheet());
});

