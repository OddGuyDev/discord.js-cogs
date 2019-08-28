/*
 * LICENSED BY LoeDoesCode
 *      MIT LICENSE
 *    AUGUST 19, 2019
 */

'use-strict';

const fs = require('fs');
const EventEmitter = require('events'); 
const Cog = require("./Cog.js");

/**
 * Class representing a Cog Client.
 *
 * @extends EventEmitter
 */
class Client extends EventEmitter {
  /**
   * Create a new `CogClient`.
   *
   * @param {Object} discord.js Client to reference
   * @param {Object} options Client options
   */
   /**
   * @param {ClientOptions} [options] Options for the Client
   */
  constructor(client, options = {}) {
    super();
    
   /**
    * All cogs loaded by the client
    * @type {Array[?Cogs]}
    */
    this.cogs = [];
    
   /**
    * File directory, as of process path
    * @type {String|URL}
    */
    this.path = process.cwd();
    
    if (options.path) this.path = process.cwd() + options.path;
    
   /**
    * Automatic reloading for cogs
    * Defaulted to true
    * <warn> Any cogs outside of the options.path will not be loaded, and must be individually loaded.<\warn>
    * @type {Boolean}
    */
    this.automatic;
    
    if (!options.automatic) options.automatic = true;
    
    if (options.automatic) this.automatic = options.automatic;
    
    if (options.automatic == true) {
        fs.readdir(this.path, { withFileTypes: true }, (err, files) => {
            let nc, name;
            if (err) return err;
            files.forEach(f => {
                if (!f.isFile()) return;
                if (!f.name.includes(".js")) return;
                name = f.name.slice(0, -3);
                nc = new Cog(name, this.path);
                this.cogs.push(nc);
            })
        })
    }
        
    
  }
  
 /**
  * Cogs loaded in Client
  * @returns {?Cogs[]}
  * @deprecated
  */
  get getCogs() {
   	return this.cogs;
   }
   
  /**
   * Reload a cog
   * @returns {?Array[Cogs]}
   */
   reloadCog(name, options = {}) {
       if (this.cogs.filter(r => r.name == name) == []) return Error("Invalid cog name provided");
       let oldCog = this.cogs.filter(r => r.name == name)[0];
       let oldCogs = this.cogs.filter(r => r.name !== name);
       let newCog = new Cog(name, oldCog.path, this, options);
       this.cogs = oldCogs.push(newCog);
       Console.log("Cog updated")
       return this.cogs;
   }  
   
  /**
   * Initialize the cog client to check for cogs.
   * @returns {Client}
   */
   start() {
       let cog;
       fs.readdir(this.path, {
           withFileTypes: true
       }, (err, files) => {
           if (err) return err;
           files.forEach(file => {
               if (!file.isFile()) return;
               cog = new Cog(file.name, this.path, this)
               this.cogs.push(cog);
           })
       });
       /*if (this.automatic == true) {
           client.addListener("cogUpdate", (newCog, oldCog) => {
               this.cogs = this.cogs.filter(c => c.name !== oldCog.name).push(newCog);
               Console.log("Cog updated")
           });
       }*/
       return this;
   }
       

}

module.exports = Client;