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
	it('should be able to call into multiple objects', function (done) {
		var obj1 = new Emitter({});
		var arg = {some: ['object']};
		var other = false;
		var obj2 = {method: function () {
			arguments[0].should.equal(arg);
			other = true;
		}};
		var obj3 = {method: function () {
			arguments[0].should.equal(arg);
			other.should.be.true;
			done();
		}};
		broker(obj1, 'ev', [obj2, obj3], 'method');
		obj1.emit('ev', arg);
	});
	it('should be able to listen to multiple emitters', function () {
		var em1 = new Emitter({});
		var em2 = new Emitter({});
		var arg = {some: ['object']};
		var calls = 0;
		var rcv = {method: function () {
			arguments[0].should.equal(arg);
			calls++;
		}};
		broker([em1, em2], 'ev', rcv, 'method');
		em1.emit('ev', arg);
		em2.emit('ev', arg);
		calls.should.eql(2);
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
	it('should use the first event name if no second is given', function (done) {
		var obj1 = new Emitter({});
		var obj2 = new Emitter({});
		var arg = {some: ['object']};
		obj2.on('ev', function () {
			arguments[0].should.equal(arg);
			done();
		});
		broker.pass(obj1, 'ev', obj2);
		obj1.emit('ev', arg);
	});
	it('should be able to pass from multiple to one emitter', function () {
		var em1 = new Emitter({});
		var em2 = new Emitter({});
		var rcv = new Emitter({});
		var arg = {some: ['object']};
		var calls = 0;
		rcv.on('ev', function () {
			arguments[0].should.equal(arg);
			calls++;
		});
		broker.pass([em1, em2], 'ev', rcv);
		em1.emit('ev', arg);
		em2.emit('ev', arg);
		calls.should.eql(2);
	});
	it('should be able to pass from one to multiple emitters', function () {
		var em = new Emitter({});
		var rcv1 = new Emitter({});
		var rcv2 = new Emitter({});
		var arg = {some: ['object']};
		var calls = 0;
		var rcv = function () {
			arguments[0].should.equal(arg);
			calls++;
		};
		rcv1.on('ev', rcv);
		rcv2.on('ev', rcv);
		broker.pass(em, 'ev', [rcv1, rcv2]);
		em.emit('ev', arg);
		calls.should.eql(2);
	});
});

