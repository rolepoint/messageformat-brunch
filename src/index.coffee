sysPath = require 'path'
MessageFormat = require 'messageformat'
fs = require 'fs'
_ = require 'underscore'
vm = require 'vm'

module.exports = class MessageFormatCompiler
  brunchPlugin: yes
  type: 'template'
  extension: 'json'
  pattern: /\/lang\/([^/]+)/
  localeDirectory: ''

  constructor: (@config) ->
    messageFormatDir = sysPath.dirname(require.resolve('messageformat'))
    this.localeDirectory = messageFormatDir + '/locale'

  compile: (data, path, callback) ->

    paths = path.split('/')
    while paths.length and paths.shift() isnt "lang"
      continue

    return callback 'lang directory not found', null if paths.length is 0
    locale = paths.shift()

    try
      localeFunction = this._createLocaleFunction locale
    catch e
      return callback e, null

    messageFormat = new MessageFormat locale
    key = this._stripJsonExtension(paths.join '/')

    compileMessage = (memo, value, index) ->
      messageFunction = messageFormat.precompile(messageFormat.parse(value))
      return memo + "exports['#{index}'] = #{messageFunction};\n"

    try
      messages = JSON.parse(data)
    catch e
      return callback 'could not parse lang JSON', null

    bootstrap = "window.i18n = window.i18n || {};\n" + "window.i18n['" + key + "'] = window.i18n['" + key + "'] || {};\n" + "window.MessageFormat = window.MessageFormat || {};\n" + "window.MessageFormat.locale = window.MessageFormat.locale || {};\n" + localeFunction + "\n"

    output = _.reduce messages, compileMessage, bootstrap

    return callback null, output


  _createLocaleFunction: (locale)  ->
    localeFilename = this._getLocaleFilenameForLocale locale

    throw 'could not load locale: ' + localeFilename unless fs.existsSync localeFilename

    localeFunction = ''
    localeFunction += fs.readFileSync localeFilename
    vm.runInNewContext localeFunction,
      MessageFormat:MessageFormat

    return localeFunction

  _getLocaleFilenameForLocale: (locale) ->
    return this.localeDirectory + '/' + locale + '.js'

  _stripJsonExtension: (input) ->
    if /\.json$/.test input
      input = input.substr 0, input.length - '.json'.length
    return input

  getDependencies: (data, path, callback) =>
    callback null, []
