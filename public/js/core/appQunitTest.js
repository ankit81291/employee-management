function executeQunit(){

	require(["application"], function (application) {
		var app = new application();
		test('new application()', function() {
			ok( app, "passed" );
			ok( app.component, "passed" );
			ok( app.component.navBar, "passed" );
			ok( app.component.list, "passed" );
		});
		test('test list creation', function() {
			var value="<div id=\"list1acc\" class=\"span4\" draggable=\"true\" ondragstart=\"drag(event)\"><div class=\"accordion-group\"><div class=\"accordion-heading\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion2\" href=\"#list1\"></a><div class=\"accrDiv\"><div class=\"widTitle\"><label>Google Calender</label></div><div class=\"inlineImg\"><img  src=\"assets/img/arrow_down.png\" onclick=\"window.app.component.collapselist(list1);\"><img  src=\"assets/img/Minimize.png\" onclick=\"window.app.component.collapselist(list1);\"><img  src=\"assets/img/Delete_button.png\" onclick=\"window.app.component.Removelist(list1acc);\"></div></div></div><div id=\"list1\"class=\"accordion-body collapse in\"><div class=\"accordion-inner\"><iframe src=\"https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showCalendars=0&amp;showTz=0&amp;height=300&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=divya.parashar0387%40gmail.com&amp;color=%232952A3&amp;ctz=Asia%2FCalcutta\" style=\" border-width:0 \" width=\"300\" height=\"300\" frameborder=\"0\" scrolling=\"no\"></iframe></div></div></div></div>";
			strictEqual(app.component.buildlistContent(obj[0]), value);
		});
		test('test navbar creation', function() {
			var value="<li data=\"list1\" id=\"list1menulist\" class=\"enabled\"><a onclick=\"window.app.component.navlistClick(event);\">Google Calender</a></li>";
			strictEqual(app.component.buildNavContent(obj[0]), value);
		});
		test('test enabled/diabled', function() {
			ok($('#'+obj[0]["id"]+"menulist").hasClass('disabled'), 'list is available');
			window.app.component.Removelist($("#"+obj[0]["id"]+"acc")[0]);
			ok($('#'+obj[0]["id"]+"menulist").hasClass('enabled'), 'list is not available');
		});		
	});

}