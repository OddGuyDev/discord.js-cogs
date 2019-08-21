/*
 * LICENSED BY LoeDoesCode
 *      MIT LICENSE
 *    AUGUST 19, 2019
 */

'use-strict';

const fs = require('fs');
const Util = require('./Util.js');

/**
 * Class representing a Cog.
 */
class Client {
  /**
   * Create a new `CogClient`.
   *
   * @param {String} path to cog file
   * @param {Object} options Client options
   */
   /**
   * @param {ClientOptions} [options] Options for the client
   */
  constructor(path, name, options = {}, cogClient) {
    
    let data = require("../../" + path);
    /**
     * Name of the cog
     * @type {String}
     * @readonly
     */
    this.name = name;
    /**
     * Options loaded for the cog
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
     * Path for the cog
     * @type {String}
     * @private
     * @readonly
     */
     this._path = path;
     
     if (options.disabled) this.disabled = false;
     
     let names = [];
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
   * //Reload the cog
   * Cog.reloadCog();
   */
  reloadCog() {
      delete require.cache[require.resolve('././' + this.path)];
      let data = require('././' + this.path);
      let newCog = new require('./Cog.js')(this.path, this.name, this.options);
      let names = [];
      JSON.parse(data.toString()).forEach(f => {
          names.push(f.name);
      });
      this.commandNames = names;
      let data = require("../../" + path);
      this.commands = data;
      this.totalCommands = data.length;
      this.client.reloadCog(newCog.name, newCog)
      return newCog;
  }
  
  /**
   * Disable the cog
   * @returns {Cog}
   */
  disableCog() {
      let newOptions = {
          name: this.name,
          options: this.options,
          disabled: this.disabled ? false : true,
          commands: this.commamds,
          totalCommands: this.totalCommands,
      let newCog = new require('./Cog.js')(this.path, this.name, newOptions);
      this = newCog;
      this.client.reloadCog(newCog.name, newCog)
      return newCog;
      
  }
      
}


















