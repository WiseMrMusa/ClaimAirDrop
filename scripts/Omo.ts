import { ethers } from "hardhat";
import { impersonateAccount } from "@nomicfoundation/hardhat-network-helpers";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
let csvToJson = require('convert-csv-to-json');

let fileInputName = './files/Untitled.csv'; 
let fileOutputName = './files/data.json';
var dataPath = "./files/data.json";



const createMerkleTrie = (_dataPath) => {
    console.log("####")
    const data = fs.readFileSync(_dataPath,{encoding:'utf8'});
    console.log(data)
    console.log("####")
    var JSONdata = JSON.parse(data);

    console.log("####")
    
    const values: any[] = [];
    JSONdata.map((e: { ADDRESS: string[]; AMOUNT: string[]; }) => values.push([ e.ADDRESS, e.AMOUNT]));
    console.log(values)
      const tree = StandardMerkleTree.of(values, ["address", "uint256"]);
      console.log('Merkle Root:', tree.root);
      fs.writeFileSync("./files/tree.json", JSON.stringify(tree.dump()));
      return tree;
}











async function main() {
    csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);
    const tree = createMerkleTrie(fileOutputName);


}

 




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
