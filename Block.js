// ****************************************************
// Javascript file with the blockchain class
// Dev : Danilo Zabeu  08/01/2019
// Linkedin: https://www.linkedin.com/in/danilo-zabeu-b6115b21/
// ****************************************************

class Block {
  constructor(data){
    this.hash = "",
    this.height = 0,
    this.body = data,
    this.time = 0,
    this.previousBlockHash = ""
  }
}

module.exports.Block = Block;