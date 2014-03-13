/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

var exports = module.exports = broker;
exports.pass = pass;

function broker(emitter, ev, receiver, fn) {
	var calls = (Array.isArray(receiver) ? receiver : [receiver]).map(function (obj) {
		var boundfn = typeof fn === 'string' ? obj[fn] : fn;
		return [obj, boundfn];
	});
	function cb() {
		var args = arguments;
		calls.forEach(function (obj) {
			obj[1].apply(obj[0], args);
		});
	}
	(Array.isArray(emitter) ? emitter : [emitter]).forEach(function (emitter) {
		emitter.on(ev, cb);
	});
	return cb;
}

var slice = [].slice;
function pass(emitter, onevent, receiver, emitevent) {
	emitevent = emitevent || onevent;
	receiver = Array.isArray(receiver) ? receiver : [receiver];
	function cb() {
		var args = [emitevent].concat(slice.call(arguments));
		receiver.forEach(function (receiver) {
			receiver.emit.apply(receiver, args);
		});
	}
	(Array.isArray(emitter) ? emitter : [emitter]).forEach(function (emitter) {
		emitter.on(onevent, cb);
	});
	return cb;
}

