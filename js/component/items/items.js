define(["items/itemsView"], function(view){
	
	var items = function(){
		this.oView = view;
		this.oController = this.oView.getController();

	};
	items.prototype.getUI = function(obj) {
		return this.oView.createContent(obj);
	};
	
	return (new items());
});

