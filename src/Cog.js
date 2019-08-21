/*
 * LICENSED BY LoeDoesCode
 *      MIT LICENSE
 *    AUGUST 19, 2019
 */

'use-strict';

const fs = require('fs');
const Util = require('./Util.js');
// PLACEHOLDER FOR VARIABLES
let data, newCog, names, newOptions;

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
  constructor(path, name, options = {}, cogClient) {
    
    data = require("../../" + path);
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
    this.disabled = options.disabled;
    /**
     * Every command of the Cog
     * @type {Object}
     */
    this.commands = data;
    /**
     * Total commands registered in the Cog
     * @type {Number}
     * @readonly
     */
    this.totalCommands = data.length;
    /**
     * Path for the Cog
     * @type {String}
     * @private
     * @readonly
     */
     this._path = path;
     
     if (options.disabled) this.disabled = false;
     
     names = [];
     JSON.parse(data.toString()).forEach(f => {
         names.push(f.name);
     });
     
    /**
     * Total commands registered in the Cog
     * @type {Array<String>}
     * @readonly
     */
     this.commandNames = names;
     
    /**
     * The Client of the Cog
     * @type {Client}
     */
     this.client = cogClient;
  }
  
  /**
   * Reloads the Cog
   * @returns {Cog}
   * @example
   * //Reload the Cog
   * Cog.reloadCog();
   */
  reloadCog() {
      delete require.cache[require.resolve('././' + this.path)];
      data = require('././' + this.path);
      newCog = new require('./Cog.js')(this.path, this.name, this.options);
      names = [];
      JSON.parse(data.toString()).forEach(f => {
          names.push(f.name);
      });
      this.commandNames = names;
      data = require("../../" + path);
      this.commands = data;
      this.totalCommands = data.length;
      this.client.reloadCog(newCog.name, newCog);
      return newCog;
  }
  
  /**
   * Disable the Cog
   * @returns {Cog}
   */
  disableCog() {
      newOptions = {
          name: this.name,
          options: this.options,
          disabled: this.disabled ? false : true,
          commands: this.commamds,
          totalCommands: this.totalCommands,
          path = this._path
      };
      newCog = new require('./Cog.js')(this.path, this.name, newOptions, this.client);
      this.client.reloadCog(newCog.name, newCog);
      return newCog;
      
  }
      
}

module.export = Cog;