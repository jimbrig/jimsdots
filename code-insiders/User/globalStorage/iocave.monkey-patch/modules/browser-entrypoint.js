'use strict';

let _bootstrapWindow = global.MonacoBootstrapWindow;
if (!_bootstrapWindow)
	_bootstrapWindow = require('../../../../bootstrap-window');

const _prev = _bootstrapWindow.load;

_bootstrapWindow.load = function(modulePaths, resultCallback, options) {

	let prevBeforeLoaderConfig = options.beforeLoaderConfig;
	options.beforeLoaderConfig = function(configuration, loaderConfig) {
		if (prevBeforeLoaderConfig && typeof prevBeforeLoaderConfig === 'function')
			prevBeforeLoaderConfig(configuration, loaderConfig);
		loaderConfig.amdModulesPattern = /^vs\/|^monkey-generated\/|^customize-ui\//;
		loaderConfig.paths = {
			"customize-ui" : "file://./c:/Users/Jimmy Briggs/AppData/Roaming/Code - Insiders/User/globalStorage/iocave.customize-ui/modules",
			"monkey-generated" : "file://./c:/Users/Jimmy Briggs/AppData/Roaming/Code - Insiders/User/globalStorage/iocave.monkey-patch/modules"
		};
		require.define("monkey-patch", {
			load: function (name, req, onload, config) {
				req([name], function (value) {
					req(["customize-ui/customize-ui"], function() { 						
						onload(value); 
					}, function(error) {
						console.error(error);
						onload(value); 
					});
				});
			}
		});
	}
	if (modulePaths[0] == 'vs/workbench/workbench.main' ||
	    modulePaths[0] == 'vs/workbench/workbench.desktop.main') {
		modulePaths[0] = 'monkey-patch!' + modulePaths[0];
	}
	_prev(modulePaths, resultCallback, options);
};