
define(["items/itemsController"], function(controller){

	var itemsView = function(){
		this.oController = controller;
	};
	itemsView.prototype.createContent = function(obj) {
		var CreateItembarDiv='<div class="row">';
		var CreateItemDiv= this.createItemDiv(obj);
		var  ItemBarDivFinish='</div>';
		var div = CreateItembarDiv+CreateItemDiv+ItemBarDivFinish;
		return div;
	};
	
	itemsView.prototype.getController = function() {
		return this.oController;
	};
	
	itemsView.prototype.createItemDiv = function(itemCount) {
		var itemModel = obj;
		var ItemDiv="";
		for(var i=0;i<itemModel.length;i++){
			var JsonString = JSON.stringify(itemModel[i]);
			var temDiv="<div class='col-lg-3 col-md-6' onclick='window.app.component.handleItemClick("+JsonString+");'>"+
					        '<div class="'+itemModel[i]["class"]+'">'+
					        '<div class="panel-heading">'+
					            '<div class="row">'+
					                '<div class="col-xs-3">'+
					                    '<i class="'+itemModel[i]["class-icon"]+'"></i>'+
					                '</div>'+
					                '<div class="col-xs-9 text-right">'+
					                    '<div class="huge">'+itemCount[itemModel[i]["title"]]+'</div>'+
					                '</div>'+
					            '</div>'+
					        '</div>'+
					        '<a href="#">'+
					            '<div class="panel-footer">'+
					                '<span class="pull-left"><b>'+itemModel[i]["title"]+'</b></span>'+
					                '<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>'+
					                '<div class="clearfix"></div>'+
					            '</div>'+
					        '</a>'+
					    '</div>'+
					  '</div>';
			ItemDiv = ItemDiv + temDiv;
		}
		return ItemDiv;
	};
	
	return (new itemsView());
});
