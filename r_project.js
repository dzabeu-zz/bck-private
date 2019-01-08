// ****************************************************
// Javascript file to start a get and post instance.
// Dev : Danilo Zabeu  08/01/2019
// Linkedin: https://www.linkedin.com/in/danilo-zabeu-b6115b21/
// ****************************************************

const express = require("express");
const BlockChain = require('./BlockChain.js');
const Block = require('./Block.js');
const router = express.Router();
let blockchain = new BlockChain.Blockchain();

//get function to access by a browser
router.get(`/:id`, (req, res) => {
    blockchain.getBlock(req.params.id).then((result) => {
        console.log(req.params.id)
        //console.log(result)
        try {
            if (JSON.parse(result).height  == req.params.id) {
                res.json( {
                       "hash":JSON.parse(result).hash,
                       "height": JSON.parse(result).height ,
                       "body":JSON.parse(result).body,
                       "time":JSON.parse(result).time,
                       "previousBlockHash":JSON.parse(result).previousBlockHash
                       }
               )
           }
        } catch (error) {
            res.send('height ' + req.params.id + ' not found');  
        }
       
    });
});

//post function to insert a new block using a webapi plataform, like "Postman"
router.post('/create/', async function (req, res, next) {
    var str = req.body;
    console.log("handling PUT request...");
    console.log('check req.body = ' + req.body);
    console.log(str.replace(/\s/g, '').length )
    if ((!isEmpty(req.body)) && (str.replace(/\s/g, '').length>0) ){
        blockchain.addBlock(new Block.Block(req.body)).then((result) => {
            res.send(result);  
        });
    }else{
        res.status(200).send("Body cant be null");
    }
})

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }   
    return JSON.stringify(obj) === JSON.stringify({});
}

module.exports = router;
