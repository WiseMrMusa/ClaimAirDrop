import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import { ethers } from "hardhat";
import { impersonateAccount } from "@nomicfoundation/hardhat-network-helpers";


async function main() {
  const TimDanContract = await ethers.getContractFactory("TimiDAN");
  const deployContract = await TimDanContract.deploy("0x1c97f222d9ec0a07df47315ad18ff30d8e216e45eea2f47c3b77331ac2acd842");
  await deployContract.deployed()
  const conAddress = deployContract.address;
  console.log(`This contract is deloyed at: ${deployContract.address}`);


  const TimiBaby = await ethers.getContractAt("ITimiDAN",conAddress);

  let address = "0xab7608F1B3aaf54c54aDf5EEb50Fe507c3668D40";
  impersonateAccount(address);
  const TheSigner = await ethers.getSigner(address);


  let proof = [
    '0x4420ee2cd2ddf8dd00a8c1926714da7025823c1418619b7ca7c62959f47d8948',
    '0x12c12967dd4986a5f5f767d39ea73fbbce36c71660a75f5c514d57934477040c',
    '0x0ffc147ff884093f0f81ca4938918f42ae74975f7486287e46f13bde84f186c4',
    '0xd44cb2f18886ff3b38661ab777ea0b750e68772dbcd488ee60ebc768497d1d70'
  ];
  let amount = "10000";

  TimiBaby.connect(TheSigner).claimAirDrop(proof,amount)
}

 




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
