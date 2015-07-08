define(["detailWrap/detailWrapView"], function(view){
	
	var detailWrap = function(){
		this.oView = view;
		this.oController = this.oView.getController();

	};
	detailWrap.prototype.getUI = function(obj) {
		return this.oView.createContent(obj);
	};

	detailWrap.prototype.renderTimesheet = function() {
		return this.oView.renderTimesheet();
	};

	detailWrap.prototype.getTaskUI = function(obj) {
		return this.oView.buildTaskDetail(obj);
	};
	detailWrap.prototype.getNotificationUI = function(obj) {
		return this.oView.buildNotificationDetail(obj);
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
	
	detailWrap.prototype.getNewResourceUI = function() {
		return this.oView.buildNewResourceUI();
	};

	detailWrap.prototype.getEditResourceUI = function(obj) {
		return this.oView.buildEditResourceUI(obj);
	};
	
	detailWrap.prototype.getNewResourceWorkerUI = function() {
		return this.oView.buildNewResourceWorkerUI();
	};

	detailWrap.prototype.getEditResourceWorkerUI = function(obj) {
		return this.oView.buildEditResourceWorkerUI(obj);
	};
	detailWrap.prototype.getResourceUI = function() {
		return this.oView.buildResourcesView();
	};
	detailWrap.prototype.getResourceDetailUI = function(obj) {
		return this.oView.buildResourcesDetailView(obj);
	};
	detailWrap.prototype.getResorceWorkerDetailUI = function(obj) {
		return this.oView.buildResourcesWorkerDetailView(obj);
	};
	detailWrap.prototype.getPlaceUI = function() {
		return this.oView.getPlaceFrameUI();
	};
	detailWrap.prototype.getNotificationDetailUI = function(obj) {
		return this.oView.buildNotificationItemDetailUI(obj);
	};
	detailWrap.prototype.cancelAction = function(obj) {
		return this.oView.cancelAction();
	};
	detailWrap.prototype.saveChanges = function() {
		return this.oView.saveChanges();
	};
	detailWrap.prototype.sendEmail = function(obj) {
		return this.oView.sendEmail(obj);
	};
	detailWrap.prototype.showEquipment = function() {
		return this.oView.showEquipment();
	};
	detailWrap.prototype.showTask = function() {
		return this.oView.showTask();
	};
	return (new detailWrap());
});

