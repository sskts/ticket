webpackJsonp([2,4],{

/***/ 381:
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(690)(__webpack_require__(659))

/***/ },

/***/ 659:
/***/ function(module, exports) {

module.exports = "/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\nvar app = {\n    // Application Constructor\n    initialize: function() {\n        // document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);\n    },\n\n    // deviceready Event Handler\n    //\n    // Bind any cordova events here. Common events are:\n    // 'pause', 'resume', etc.\n    onDeviceReady: function() {\n        // this.receivedEvent('deviceready');\n    },\n\n    // Update DOM on a Received Event\n    receivedEvent: function(id) {\n        // var parentElement = document.getElementById(id);\n        // var listeningElement = parentElement.querySelector('.listening');\n        // var receivedElement = parentElement.querySelector('.received');\n\n        // listeningElement.setAttribute('style', 'display:none;');\n        // receivedElement.setAttribute('style', 'display:block;');\n\n        // console.log('Received Event: ' + id);\n    }\n};\n\napp.initialize();"

/***/ },

/***/ 690:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	if (typeof execScript !== "undefined")
		execScript(src);
	else
		eval.call(null, src);
}


/***/ },

/***/ 694:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(381);


/***/ }

},[694]);
//# sourceMappingURL=scripts.bundle.map