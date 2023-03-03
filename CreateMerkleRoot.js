const fs = require('fs');
var merkle = require('merkle');

var dataPath = "./data.json";


var data = fs.readFileSync(dataPath,{encoding:'utf8'});
var JSONdata = JSON.parse(data);

var MerkleData = [];
JSONdata.map(e => MerkleData.push(e.ADDRESS));

var tree = merkle('sha1').sync(MerkleData);

console.log(tree.root());