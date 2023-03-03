import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import { ethers } from "hardhat";
import { impersonateAccount, setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { utils } from 'ethers';


async function main() {
  const TimDanContract = await ethers.getContractFactory("TimiDAN");
  const deployContract = await TimDanContract.deploy("0xe7fc701a407359b2949729565d52e87817f6adf1954865cad7a0b790e75ccd7d");
  await deployContract.deployed()
  const conAddress = deployContract.address;
  console.log(`This contract is deloyed at: ${deployContract.address}`);


  const TimiBaby = await ethers.getContractAt("ITimiDAN",conAddress);
  
  let address = "0xEF66A4463002222283C1C330eDf501790490fAd0";
  await impersonateAccount(address);
  await setBalance(address,ethers.utils.parseEther("1000000000"));
  const TheSigner = await ethers.getSigner(address);
  
  console.log(await TimiBaby.balanceOf(address));

  let proof = [
    '0x0d53100760a667a745249e76c38d2685c8987f0c99f468c54f7c99f37037edcb',
    '0xee00991c59c6c6c6cfdbbb86890d607645f6f0924c2edeef5d8b57d5ed9fc1a1',
    '0x4f97d06cb5cb8a0801e98a1fc478f515c32fc066168986b049808f2b03c78bc6',
    '0x339ec538df47f8c3bd2d836552afa20bb9a97111b801b5520d39c29e17595770'
  ];
  let amount = "10000";

  TimiBaby.connect(TheSigner).claimAirDrop(proof,amount);
  console.log(await TimiBaby.connect(TheSigner).balanceOf(address));
}

 




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
