// ****************************************************
// Javascript file save the block using LevelDB
// Dev : Danilo Zabeu  08/01/2019
// Linkedin: https://www.linkedin.com/in/danilo-zabeu-b6115b21/
// ****************************************************

// Importing the module 'level'
const level = require('level');
// Declaring the folder path that store the data
const chainDB = './chaindata';

// Declaring a class
class LevelSandbox {
	// Declaring the class constructor
    constructor() {
    	this.db = level(chainDB);
    }
  
  	getLevelDBData(key){
        let self = this; 
        return new Promise(function(resolve, reject) {
            self.db.get(key, (err, value) => {
                if(err){
                    if (err.type == 'NotFoundError') {
                        resolve(undefined);
                    }else {
                        console.log('Block ' + key + ' get failed', err);
                        reject(err);
                    }
                }else {
                    resolve(value);
                }
            });
        });
    }
  
    //Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise(function(resolve, reject) {
            self.db.put(key, value, function(err) {
                    if (err) {
                        console.log('Block ' + key + ' submission failed', err);
                        reject(err);
                    }
                    resolve(value);
                });
        });
    }

    getblockHeight(){
        let self = this;
        return new Promise(function(resolve, reject) {
            let i = -1;
            self.db.createReadStream()
        .on('data', function(data) {
            i++;
            }).on('error', function(err) {
                console.log('Unable to get block height', err)
            }).on('close', function() {
                resolve(i);
            });    
        });
    }
}

// Export the class
module.exports.LevelSandbox = LevelSandbox;