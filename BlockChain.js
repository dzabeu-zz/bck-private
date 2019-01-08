// ****************************************************
// Javascript file with the blockchain constructor
// Dev : Danilo Zabeu  08/01/2019
// Linkedin: https://www.linkedin.com/in/danilo-zabeu-b6115b21/
// ****************************************************


const SHA256 = require('crypto-js/sha256');
const Block = require('./Block.js');
var chain = [];
const LevelSandboxClass = require('./levelSandbox.js');
const db = new LevelSandboxClass.LevelSandbox();

class Blockchain {

    constructor() {
        
        db.getblockHeight().then((result) => {
            if (result ==-1){
               this.addBlock(new Block.Block("First block in the chain - Genesis block")).then((result) => {console.log(result)});            }
        });
    }

    async lastBlock(){ 
        let lastdb = await db.getblockHeight(); 
        return lastdb;
    }

    async addBlock(newBlock) {
        let block = await new Promise(async function(resolve, reject){   
                await db.getblockHeight().then(async function(result) {
                    newBlock.height = result + 1
                    newBlock.time = new Date().getTime().toString().slice(0,-3);
                    if(result>=0){
                        await db.getLevelDBData((result)).then( async function(result){
                             newBlock.previousBlockHash = JSON.parse(result).hash;
                             newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
                             await new Promise( async function(resolve, reject) {
                                resolve(
                                    await db.addLevelDBData( newBlock.height ,JSON.stringify(newBlock).toString()).then(async function(result){
                                        if(!result) {
                                            console.log("Error Adding data");
                                        }
                                    }).catch((err) => { console.log(err); })
                                )
                            });
                         });
                     }else{
                        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
                        await new Promise(async function(resolve, reject) {
                            resolve(
                                await db.addLevelDBData( newBlock.height ,JSON.stringify(newBlock).toString()).then(async function(result){
                                    if(!result) {
                                        console.log("Error Adding data");
                                    }
                                }).catch((err) => { console.log(err); })
                            )
                        });
                     }
                    resolve(newBlock)
                }
            )
        });
        return block
    }
    
    getBlock(height) {
        return db.getLevelDBData(height)
    }

    // Validate if Block is being tampered by Block Height
    validateBlock(blockHeight) {
        return new Promise( (resolve, reject) => {
            resolve(         
                this.getBlock(blockHeight).then((result) => {
                let block = JSON.parse(result);
                let blockHash = block.hash;
                // remove block hash to test block integrity
                block.hash = '';
                // generate block hash
                let validBlockHash = SHA256(JSON.stringify(block)).toString();
                // Compare
                if (blockHash===validBlockHash) {
                    console.log('Block #'+blockHeight+' valid hash:\n'+blockHash+' == '+validBlockHash);
                    return true;
                } else {
                    console.log('Block #'+blockHeight+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
                    return false;
                }
            }))
        });


    }

    validateChain() {
        let errorLog = [];
        let promises  = [];
        db.getblockHeight().then(chainHeight => {
            //check if have some inconsistence
            for (let i = 1; i <= chainHeight; i++) {
                this.validateBlock(i).then(result => {
                    console.log(result)
                    if (result==false) {
                        errorLog.push('Error at block position ' + i)
                    }
                });
                promises.push(this.getBlock(i));
            }
            //check if have inconsitance between the blocks
            Promise.all(promises).then(result => {
                if (chainHeight > 1) {
                    for (let b = 1; b <=chainHeight -1 ; b++) {
                        let previousHash  = JSON.parse(result[b]).previousBlockHash;
                        let  blockHash = JSON.parse(result[b-1]).hash;
                    if (blockHash !== previousHash  || previousHash == null ) {
                        errorLog.push('Error linking blockchain at block position '+ b);
                        }
                    } 
                    if (errorLog.length > 1 ) {
                        console.log( errorLog);
                    }
                }
            });
        });
        
    }

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    modifyBlock(height, block) {
        let self = this;
        return new Promise( (resolve, reject) => {
            db.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(block);
            }).catch((err) => { console.log(err); reject(err)});
        });
    }
   
}

module.exports.Blockchain = Blockchain;