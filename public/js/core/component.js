define(["detailWrap/detailWrap","navBar/navBar","items/items"], function(detailWrap,navBar,items){
	
	var Component = function(){
	this.detailWrap=detailWrap;
	this.navBar=navBar;
	this.items=items;
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
	Component.prototype.handleItemClick = function(obj){
		if(obj['title']=="Task" || obj['kind']=="Task" ){
			this.detailWrap.getTaskUI(taskObj);	
		}
		else if(obj['title']=="Alert" || obj['kind']=="Notification"){
			this.detailWrap.getTaskUI(alertObj);
		}
	};
	Component.prototype.handleItemListClick = function(obj){
		this.detailWrap.getTaskItemDetailUI(obj);
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