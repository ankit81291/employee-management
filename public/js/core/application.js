define(["component"],function(component) {

	var Application = function(){
	 this.component = component;
	};
	
	Application.prototype.start = function(){

		window.console.log("Start called...");
		var navDivContent;
		var ItemDivContent;
		var detailWrapDivContent;
		var that=this;
		$.ajax({url:"http://localhost:3000/api/alerts",success:function(resultAlert){
				alertObj=resultAlert;
				$.ajax({url:"http://localhost:3000/api/tasks",success:function(resultTasks){
					taskObj=resultTasks;
					$.ajax({url:"http://localhost:3000/api/workers",success:function(resultWorker){
						workerObj=resultWorker;
						$.ajax({url:"http://localhost:3000/api/devices",success:function(resultdevice){
							deviceObj=resultdevice;
						navDivContent = that.component.buildNavContent(obj);
						$("#wrapper").prepend(navDivContent);
						ItemDivContent = that.component.buildItemContent(obj);
						$("#page-wrapper").append(ItemDivContent);
						detailWrapDivContent = that.component.buildDetailWrapContent(obj);
						$("#page-wrapper").append(detailWrapDivContent);
						that.buildChart();
						}});
					}});
				}});
			  }});
			
	};
	
	
	Application.prototype.buildTable = function(){
		$.ajax({url:"http://localhost:3000/api/performancedata",success:function(resultPerformaceData){
			$("#morris-area-chart").empty();
			var tableHeader=$('<div class="table-responsive">');
			tableDataRow = resultPerformaceData;
			 var content = $('<table class="table table-bordered table-hover table-striped">');
			 var myList=tableDataRow;
			 var columnSet = [];
			    var headerTr$ = $('<tr/>');

			    for (var i = 0 ; i < myList.length ; i++) {
			        var rowHash = myList[i];
			        for (var key in rowHash) {
			            if ($.inArray(key, columnSet) == -1){
			                columnSet.push(key);
			                headerTr$.append($('<th/>').html(key));
			            }
			        }
			    }
			    content.append(headerTr$);

			    var columns= columnSet;
			    var rows=$('');
			    for (var i = 0 ; i < myList.length ; i++) {
			        var row$ = $('<tr/>');
			        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
			            var cellValue = myList[i][columns[colIndex]];

			            if (cellValue == null) { cellValue = ""; }

			            row$.append($('<td/>').html(cellValue));
			        }
			        content.append(row$);
			    }
			    
			    tableHeader.append(content);
			 $("#morris-area-chart").append(tableHeader);

		}});		 
	};
	Application.prototype.buildChart = function(){
		$.ajax({url:"http://localhost:3000/api/performancedata",success:function(resultPerformaceData){
			$("#morris-area-chart").empty();
			  Morris.Bar({
			        element: 'morris-area-chart',
			        data: resultPerformaceData,
			        xkey: 'location',
			        ykeys: ['completion', 'equipment_available','workforce_available','material_available'],
			        labels: ['completion', 'equipment_available','workforce_available','material_available'],
			        pointSize: 2,
			        hideHover: 'auto',
			        resize: true
			    });
		}});
	};
	return Application;	
});