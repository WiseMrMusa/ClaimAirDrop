// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


interface ITimiDAN {
    function claimAirDrop(bytes32[] calldata proof, uint256 amount) external;
}
