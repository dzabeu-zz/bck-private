
# Project #3. Private Blockchain with Express.js

This is Project 3, Private Blockchain, in this project I created the classes to manage a private blockchain, to be able to persist my blochchain i used LevelDB.

This project doesn't have any famous blockchain plataform, like Ethereum or Hyperledger. The ideia to this project is understand how a blockchain work, the connection between blocks and how you can create a new blockchain using only javascript tecnology. 

You can insert new blocks throught by webservice. This project used Express.js library

Main files: Blockchain.js, web_client.js, r_project.js, levelsandbox.js

## Setup project for Review.

To setup the project for review do the following:

Download the project.
Run command npm install to install the project dependencies.
With node.js installed, open a new terminal and execute the following command (inside the project patch): 
node web_client.js

If the following informantion showing, so its work correctly:

    server started on port 8000
    -1
    Block {
      hash: '9ede64bfe5d87958bbf6a0f158a43468c0345153c83f15b5f0b7bfe1dc473287',
      height: 0,
      body: 'First block in the chain - Genesis block',
      time: '1546944230',
      previousBlockHash: '' }

## To init the private Blockchain

The project use Express.js, so to create a new block, you can use a software to send a post mensage. In my case, i have used "Postman" (link do download: https://www.getpostman.com/)

To insert new block, access the postman software and create a new request. After that, change the request to a "POST" mensage. Now, put the following url on the address box and choose "body/raw" tab to put your block information. Now, just click on "Send" to create a new block on your private blockchain.

Example of result:

    {
        "hash": "f71fefea66c7c9d0392d0c3a20d9d0918aba78a3ff1f65dd120bca74d0dcb197",
        "height": 1,
        "body": "New block",
        "time": "1546944644",
        "previousBlockHash": "9ede64bfe5d87958bbf6a0f158a43468c0345153c83f15b5f0b7bfe1dc473287"
    }
    
To get this information, open a web browser and put the following address: 

    http://localhost:8000/block/BLOCK_NUMBER
	Example: http://localhost:8000/block/0  (0 = Genesis block)

Another way to create a new block is using the node console. To do that, open a new terminal (inside the project patch) and put "node", to open a node terminal.

Now, you need to declare the variables to start the blockchain:

    const BlockChain = require('./BlockChain.js');
    const Block = require('./Block.js');
    let blockchain = new BlockChain.Blockchain();

To insert blocks (examples):

	    blockchain.addBlock(new Block.Block("test data Heigh 1")).then((result) => {console.log(result)});
    	blockchain.addBlock(new Block.Block("test data Heigh 2")).then((result) => {console.log(result)});
    	blockchain.addBlock(new Block.Block("test data Heigh 3")).then((result) => {console.log(result)});
    	blockchain.addBlock(new Block.Block("test data Heigh 4")).then((result) => {console.log(result)});
    	
To get Blocks (examples):

	blockchain.getBlock(0).then((result) => {console.log(result)});
	blockchain.getBlock(1).then((result) => {console.log(result)});
	blockchain.getBlock(2).then((result) => {console.log(result)});
	blockchain.getBlock(3).then((result) => {console.log(result)});
		
	Result example: 
	Block {
	  hash: '5460ea7a076155efc1dca107ca8733faaf1797f08d7bee0d3005e38fa374f0f5',
	  height: 0,
	  body: 'First block in the chain - Genesis block',
	  time: '1546877377',
	  previousBlockHash: '' }


You can modify a block (to see the block inconsistency) with this command:

    blockchain.modifyBlock(Block_Number,new Block.Block("MODIFY"));


To check a block consistence, use the following command:

     blockchain.validateBlock(BLOCK_NUMBER).then(result => {
                        console.log(result)

To check the chain consistence, use the following command:

    blockchain.validateChain();

