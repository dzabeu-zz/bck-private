// ****************************************************
// Javascript file to init a new webservice instance
// Dev : Danilo Zabeu  08/01/2019
// Linkedin: https://www.linkedin.com/in/danilo-zabeu-b6115b21/
// ****************************************************

const express = require("express");
const bodyParser = require("body-parser");
const Route = require('./r_project.js');
const PORT = 8000;
const buildUrl = (block) => `/${block}`;
const Base_URL = buildUrl('block');
const server = express();
server.use(bodyParser.text());
server.use(Base_URL, Route);

server.listen(8000, () => {
    console.log(`server started on port ${PORT}`);
})


/*
To test: node web_client.js
access web page by placing the search parameter
get: http://localhost:8000/block/1
post:
Access the postman software and place the url: http://localhost:8000/block/create
In the body tab, put raw type and type any value in the text box.
*/