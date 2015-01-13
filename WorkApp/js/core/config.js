require.config({
	
	paths : {
		"jquery":"jquery",
		"Bootstrap":"bootstrap.min",
		"components" : "../component",
		"core" : ".",
		"navBar" : "../component/navBar",
		"detailWrap" : "../component/detailWrap",
		"items" : "../component/items",
	},
	
	   shim: {
	        "Bootstrap": {
	            
	            deps: ["jquery"]
	        }
	   }

});