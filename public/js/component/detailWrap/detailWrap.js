define(["detailWrap/detailWrapView"], function(view){
	
	var detailWrap = function(){
		this.oView = view;
		this.oController = this.oView.getController();

	};
	detailWrap.prototype.getUI = function(obj) {
		return this.oView.createContent(obj);
	};
	detailWrap.prototype.getTaskUI = function(obj) {
		return this.oView.buildTaskDetail(obj);
	};
	detailWrap.prototype.getTaskItemDetailUI = function(obj) {
		return this.oView.buildTaskItemDetailUI(obj);
	};
	detailWrap.prototype.getNewTaskUI = function() {
		return this.oView.buildNewTaskUI();
	};

	detailWrap.prototype.getEditTaskUI = function(obj) {
		return this.oView.buildEditTaskUI(obj);
	};
	

	return (new detailWrap());
});

