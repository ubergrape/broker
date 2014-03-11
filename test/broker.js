/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

var broker = require('../');
var Emitter = require('events').EventEmitter;

describe('broker', function () {
	it('should call methods on events', function (done) {
		var obj1 = new Emitter({});
		var arg = {some: ['object']};
		var obj2 = {method: function () {
			arguments[0].should.equal(arg);
			done();
		}};
		broker(obj1, 'ev', obj2, 'method');
		obj1.emit('ev', arg);
	});
	it('should return the bound function', function () {
		var obj1 = new Emitter({});
		var arg = {some: ['object']};
		var obj2 = {method: function () {
			throw new Error('should not be reached');
		}};
		var fn = broker(obj1, 'ev', obj2, 'method');
		obj1.removeListener('ev', fn);
		obj1.emit('ev', arg);
	});
	it('should allow passing in a method function', function (done) {
		var obj1 = new Emitter({});
		var arg = {some: ['object']};
		var obj2 = {method: function () {
			arguments[0].should.equal(arg);
			done();
		}};
		broker(obj1, 'ev', obj2, obj2.method);
		obj1.emit('ev', arg);
	});
	it('should provide a method to pass events from one emitter to the other', function (done) {
		var obj1 = new Emitter({});
		var obj2 = new Emitter({});
		var arg = {some: ['object']};
		obj2.on('ev2', function () {
			arguments[0].should.equal(arg);
			done();
		});
		broker.pass(obj1, 'ev', obj2, 'ev2');
		obj1.emit('ev', arg);
	});
});

