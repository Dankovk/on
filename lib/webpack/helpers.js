/**
 * @authors: @qdouble and @AngularClass
 */

const path = require('path');
const fs = require('fs');

function checkNodeImport(context, request, cb) {
	if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
		cb(null, `commonjs ${request}`); return;
	}
	cb();
}

function includeClientPackages(packages) {
	return (context, request, cb) => {
		if (packages && packages.indexOf(request) !== -1) {
			return cb();
		}
		return checkNodeImport(context, request, cb);
	};
}

function hasProcessFlag(flag) {
	return process.argv.join('').indexOf(flag) > -1;
}

function testDll() {
	if (!fs.existsSync('./dll/polyfill.dll.js') || !fs.existsSync('./dll/vendor.dll.js')) {
		throw new Error("DLL files do not exist, please use 'npm run build:dll' once to generate dll files.");
	}
}

exports.checkNodeImport = checkNodeImport;
exports.includeClientPackages = includeClientPackages;
exports.hasProcessFlag = hasProcessFlag;
exports.testDll = testDll;
