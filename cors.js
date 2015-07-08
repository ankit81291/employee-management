'use strict';
/**
 * Middleware- adds CORS headers for cross-origin access
 */


module.exports = function() {
	return function cors(req, res, next) {
		// CORS headers ================================================================
		var origin = req.get('Origin');
		res.header('Access-Control-Allow-Origin', origin);
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, accept, csrftoken, Cookie, Content-Type');
		res.header('Access-Control-Allow-Credentials', 'true');
		res.header('Access-Control-Max-Age', '1728000');
		if (req.method === 'OPTIONS') {
			//return status code for option and don't go down further
			res.statusCode = 204;
			res.end();
			return;
		}
		next();
		
	};
};