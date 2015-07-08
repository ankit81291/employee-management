define(["navBar/navBarView"], function(view){
	
	var navBar = function(){
		this.oView = view;
		this.oController = this.oView.getController();

	};
	navBar.prototype.getUI = function(obj) {
		return this.oView.createContent(obj);
	};
	
	return (new navBar());
});

