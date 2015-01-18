require.config({
	
	paths : {
		"jquery":"jquery",
		"jquery-autocomplete": "jquery-ui.min",
		"Bootstrap":"bootstrap.min",
		"components" : "../component",
		"core" : ".",
		"navBar" : "../component/navBar",
		"detailWrap" : "../component/detailWrap",
		"items" : "../component/items",
	},
	
	   shim: {
		   "jquery-autocomplete": {
	            exports: "$",
	            deps: ['jquery']
	        },
	        "Bootstrap": {
	            
	            deps: ["jquery"]
	        }
	   }

});