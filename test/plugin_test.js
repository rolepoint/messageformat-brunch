var sysPath = require('path');
var MessageFormatCompiler = require('../lib');
require('./common.js');
require('./factories.js');


describe('Plugin', function() {
	var plugin;
	var expect = chai.expect;

	beforeEach(function() {
		global.window = global; // Simulate global window context
		plugin = new MessageFormatCompiler();
	});

	afterEach(function() {
		delete global.i18n;
		delete global.MessageFormat;
		delete global.window;
	});

	it('should be an object', function() {
		expect(plugin).to.be.ok;
	});

	it('should be a valid brunch plugin', function() {
		expect(plugin.brunchPlugin).to.be.true;
	});

	it('should be a valid brunch compiler', function() {
		expect(plugin.type).to.be.a('string');
		expect(plugin.extension).to.be.a('string');
		expect(plugin.compile).to.be.a('function');
		expect(plugin.getDependencies).to.be.a('function');

	});

	it('should accept a langauge file as data', function() {
		var definition = chai.create('English plural format example');
		plugin.compile(definition.data, definition.path, function (error, result){
			expect(error).not.to.be.ok;
		});
	});

	it('should produce appropriately namespaced functions', function() {
		var definition = chai.create('simple replacement example in English');
		plugin.compile(definition.data, definition.path, function (error, result){
			eval(result);
			expect(window.i18n['test']['questionMark']).to.be.a('function');
		});
	});

	it('should replace simple string data', function() {
		var definition = chai.create('simple replacement example in English');
		plugin.compile(definition.data, definition.path, function (error, result){
			eval(result);
			expect(window.i18n['test']['questionMark']()).to.equal('?');
		});
	});

	it('should pluralise messages with numeric parameters', function() {
		var definition = chai.create('pluralisation example in English');
		plugin.compile(definition.data, definition.path, function (error, result){
			eval(result);
			expect(window.i18n['test']['hideMessages']({NUM: 1})).to.equal('Hide this message.');
			expect(window.i18n['test']['hideMessages']({NUM: 2})).to.equal('Hide these messages.');
		});
	});
});