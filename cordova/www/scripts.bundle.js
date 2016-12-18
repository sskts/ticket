webpackJsonp([2,4],{

/***/ 381:
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(690)(__webpack_require__(659))

/***/ },

/***/ 659:
/***/ function(module, exports) {

module.exports = "/*\r\n * Licensed to the Apache Software Foundation (ASF) under one\r\n * or more contributor license agreements.  See the NOTICE file\r\n * distributed with this work for additional information\r\n * regarding copyright ownership.  The ASF licenses this file\r\n * to you under the Apache License, Version 2.0 (the\r\n * \"License\"); you may not use this file except in compliance\r\n * with the License.  You may obtain a copy of the License at\r\n *\r\n * http://www.apache.org/licenses/LICENSE-2.0\r\n *\r\n * Unless required by applicable law or agreed to in writing,\r\n * software distributed under the License is distributed on an\r\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\r\n * KIND, either express or implied.  See the License for the\r\n * specific language governing permissions and limitations\r\n * under the License.\r\n */\r\nvar app = {\r\n    // Application Constructor\r\n    initialize: function() {\r\n        // document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);\r\n    },\r\n\r\n    // deviceready Event Handler\r\n    //\r\n    // Bind any cordova events here. Common events are:\r\n    // 'pause', 'resume', etc.\r\n    onDeviceReady: function() {\r\n        // this.receivedEvent('deviceready');\r\n    },\r\n\r\n    // Update DOM on a Received Event\r\n    receivedEvent: function(id) {\r\n        // var parentElement = document.getElementById(id);\r\n        // var listeningElement = parentElement.querySelector('.listening');\r\n        // var receivedElement = parentElement.querySelector('.received');\r\n\r\n        // listeningElement.setAttribute('style', 'display:none;');\r\n        // receivedElement.setAttribute('style', 'display:block;');\r\n\r\n        // console.log('Received Event: ' + id);\r\n    }\r\n};\r\n\r\napp.initialize();"

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