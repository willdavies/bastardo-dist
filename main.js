/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: eventBus */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/will/Work/bastardo-app/src/app.js: Identifier 'router' has already been declared (52:6)\\n\\n\\u001b[0m \\u001b[90m 50 | \\u001b[39m}\\u001b[0m\\n\\u001b[0m \\u001b[90m 51 | \\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 52 | \\u001b[39m\\u001b[36mconst\\u001b[39m router \\u001b[33m=\\u001b[39m \\u001b[36mnew\\u001b[39m \\u001b[33mVueRouter\\u001b[39m({\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m      \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 53 | \\u001b[39m  mode\\u001b[33m:\\u001b[39m \\u001b[32m'hash'\\u001b[39m\\u001b[33m,\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 54 | \\u001b[39m  routes\\u001b[33m:\\u001b[39m routes\\u001b[33m,\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 55 | \\u001b[39m  base\\u001b[33m:\\u001b[39m \\u001b[32m'/'\\u001b[39m\\u001b[33m,\\u001b[39m\\u001b[0m\\n    at Parser._raise (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:742:17)\\n    at Parser.raiseWithData (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:735:17)\\n    at Parser.raise (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:729:17)\\n    at ScopeHandler.checkRedeclarationInScope (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:4769:12)\\n    at ScopeHandler.declareName (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:4735:12)\\n    at Parser.checkLVal (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:9207:22)\\n    at Parser.parseVarId (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:11762:10)\\n    at Parser.parseVar (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:11737:12)\\n    at Parser.parseVarStatement (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:11549:10)\\n    at Parser.parseStatementContent (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:11148:21)\\n    at Parser.parseStatement (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:11081:17)\\n    at Parser.parseBlockOrModuleBlockBody (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:11656:25)\\n    at Parser.parseBlockBody (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:11642:10)\\n    at Parser.parseTopLevel (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:11012:10)\\n    at Parser.parse (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:12637:10)\\n    at parse (/Users/will/Work/bastardo-app/node_modules/@babel/parser/lib/index.js:12688:38)\\n    at parser (/Users/will/Work/bastardo-app/node_modules/@babel/core/lib/parser/index.js:54:34)\\n    at parser.next (<anonymous>)\\n    at normalizeFile (/Users/will/Work/bastardo-app/node_modules/@babel/core/lib/transformation/normalize-file.js:93:38)\\n    at normalizeFile.next (<anonymous>)\\n    at run (/Users/will/Work/bastardo-app/node_modules/@babel/core/lib/transformation/index.js:31:50)\\n    at run.next (<anonymous>)\\n    at Function.transform (/Users/will/Work/bastardo-app/node_modules/@babel/core/lib/transform.js:27:41)\\n    at transform.next (<anonymous>)\\n    at step (/Users/will/Work/bastardo-app/node_modules/gensync/index.js:254:32)\\n    at /Users/will/Work/bastardo-app/node_modules/gensync/index.js:266:13\\n    at async.call.result.err.err (/Users/will/Work/bastardo-app/node_modules/gensync/index.js:216:11)\");\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });