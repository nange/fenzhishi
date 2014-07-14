// 加载所有controllers
var fs = require('fs');
var path = require('path');
var controllDir = __dirname + '/controllers';
module.exports = function(app) {
	// 递归遍历
	function travel(dir, callback) {
		fs.readdirSync(dir).forEach(function(file) {
			var pathname = path.join(dir, file);

			if (fs.statSync(pathname).isDirectory()) {
				travel(pathname, callback);
			} else {
				callback(pathname);
			}

		});
	}

	travel(controllDir, function(pathname) {
		require(pathname)(app);
	});
	
};
