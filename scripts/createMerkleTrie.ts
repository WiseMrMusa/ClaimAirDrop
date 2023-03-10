import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

var dataPath = "./files/data.json";

var data = fs.readFileSync(dataPath,{encoding:'utf8'});
console.log(data)
var JSONdata = JSON.parse(data);

const values: any[] = [];

  JSONdata.map((e: { ADDRESS: string[]; AMOUNT: string[]; }) => values.push([ e.ADDRESS, e.AMOUNT]));

  console.log(values)

  const tree = StandardMerkleTree.of(values, ["address", "uint256"]);
  console.log('Merkle Root:', tree.root);

  values.forEach((e,i)=> console.log(tree.getProof(i)))


  fs.writeFileSync("./files/tree.json", JSON.stringify(tree.dump()));