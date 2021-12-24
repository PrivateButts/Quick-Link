/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    function multiReplace(templateCallback) {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No text selected');
            return; // No open text editor
        }
        let selections = editor.selections;
        editor.edit(function (e) {
            selections.forEach(selection => {
                var text = editor.document.getText(selection);
                text = templateCallback(text);
                e.replace(selection, text);
            });
        });
    }
    let mailto = vscode.commands.registerCommand('extension.quick-link.mailto', () => {
        multiReplace(v => {
            return `<a href="mailto:${v}">${v}</a>`;
        });
    });
    context.subscriptions.push(mailto);
    let tel = vscode.commands.registerCommand('extension.quick-link.tel', () => {
        multiReplace(v => {
            return `<a href="tel:${v}">${v}</a>`;
        });
    });
    context.subscriptions.push(tel);
    let sms = vscode.commands.registerCommand('extension.quick-link.sms', () => {
        multiReplace(v => {
            return `<a href="sms:${v}">${v}</a>`;
        });
    });
    context.subscriptions.push(sms);
    let callto = vscode.commands.registerCommand('extension.quick-link.callto', () => {
        multiReplace(v => {
            return `<a href="callto:${v}">${v}</a>`;
        });
    });
    context.subscriptions.push(callto);
    let fax = vscode.commands.registerCommand('extension.quick-link.fax', () => {
        multiReplace(v => {
            return `<a href="fax:${v}">${v}</a>`;
        });
    });
    context.subscriptions.push(fax);
    let link = vscode.commands.registerCommand('extension.quick-link.link', () => {
        multiReplace(v => {
            return `<a href="${v}">${v}</a>`;
        });
    });
    context.subscriptions.push(link);
    console.log('Quick Link has been installed');
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map