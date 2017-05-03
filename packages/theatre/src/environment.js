"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Angular 2
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
var _decorateModuleRef = function identity(value) { return value; };
if ('production' === ENV) {
    // Production
    platform_browser_1.disableDebugTools();
    core_1.enableProdMode();
}
else {
    _decorateModuleRef = function (modRef) {
        var appRef = modRef.injector.get(core_1.ApplicationRef);
        var cmpRef = appRef.components[0];
        var _ng = window.ng;
        platform_browser_1.enableDebugTools(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return modRef;
    };
}
exports.decorateModuleRef = _decorateModuleRef;
//# sourceMappingURL=environment.js.map