// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Messaging {
    address public owner;
    mapping(address => string) message;
    mapping(address => uint256) timestamps;

    function sendMessage(string memory _msg) public {
        message[msg.sender] = _msg;
        timestamps[msg.sender] = block.timestamp;
    }

    function getMessages(address owning) public view returns (string memory) {
        return message[owning];
    }

    constructor() {
        owner = msg.sender;
    }
}