// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract TimiDAN is ERC20 {

    bytes32 private root;
    constructor(bytes32 _root) ERC20("TimiToken", "TDT") {
        root = _root;
    }

    function claimAirDrop(bytes32[] calldata proof, uint256 amount) public {
        verify(proof,msg.sender,amount);
        _mint(msg.sender, amount);
    }

    function verify(
        bytes32[] memory proof,
        address addr,
        uint256 amount
    ) public view {
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(addr, amount))));
        require(MerkleProof.verify(proof, root, leaf), "Invalid proof");
    }
}
