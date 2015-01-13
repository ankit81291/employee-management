define(["JQuery","application"], function($, application) {
	
	if(!this.app){
		this.app = new application();
		window.app = this.app;
	}
	var that=this;
	require(["jquery", "Bootstrap"], function ($) {
		that.app.start();
	});
});