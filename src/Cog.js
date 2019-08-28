/*
 * LICENSED BY LoeDoesCode
 *      MIT LICENSE
 *    AUGUST 19, 2019
 */

'use-strict';

const fs = require('fs');

/**
 * Class representing a Cog.
 */
class Cog {
  /**
   * Create a new `Cog`.
   *
   * @param {String} path to Cog file
   * @param {String} name of Cog
   * @param {Object} options Client options
   */
   /**
   * @param {ClientOptions} [options] Options for the client
   */
  constructor(name, path, options = {}) {
    
    
    /**
     * Name of the Cog
     * @type {String}
     * @readonly
     */
    this.name = name;
    /**
     * Options loaded for the Cog
     * @type {Object}
     * @readonly
     */
    this.options = options;
    /**
     * Whether the Cog is enabled/disabled
     * @type {Boolean}
     * @readonly
     */
    this.disabled;
    
    if (options.disabled) this.disabled = options.disabled;
    /**
     * Every command of the Cog
     * @type {Array[Object]}
     */
    this.commands;
    /**
     * Total commands registered in the Cog
     * @type {Number}
     * @readonly
     */
    this.totalCommands;
    /**
     * Path for the Cog
     * @type {String}
     * @private
     * @readonly
     */
     this._path = path;
     
     if (options.disabled) this.disabled = false;
     
    /**
     * Total commands registered in the Cog
     * @type {Array<String>}
     * @readonly
     */
     this.commandNames = [];
     
     if (name.includes(".js")) return Error("Invalid name of file provided");
     
     let data = require(path + "/" + name + ".js");
     
     this.totalCommands = data.length;
     this.commands = data;
     
     data.forEach(func => {
         this.commandNames.push(func.name)
     })
         
     
  }
  
 /**
  * Checks and runs (if valid) commands from the file
  * @returns {?}
  */
  run(cmdName, client, msg, args) {
      if (!this.commandNames.filter(c => c == cmdName)[0]) return Error("Invalid command name");
      return this.commands.filter(cmd => cmd.name == cmdName)[0](client, msg, args);
  }
  
}

module.exports = Cog;