/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

var exports = module.exports = broker;
exports.pass = pass;

function broker(obj1, ev, obj2, fn) {
	if (typeof fn === 'string') {
		fn = obj2[fn];
	}
	function cb() {
		fn.apply(obj2, arguments);
	}
	obj1.on(ev, cb);
	return cb;
}

var slice = [].slice;
function pass(obj1, ev1, obj2, ev2) {
	function cb() {
		var args = slice.call(arguments);
		obj2.emit.apply(obj2, [ev2].concat(args));
	}
	obj1.on(ev1, cb);
	return cb;
}

