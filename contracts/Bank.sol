// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Bank {
    address public owner;

    event Withdrawal(uint amount, uint when);

    mapping(address => uint256) savings;
    mapping(address => uint256) timestamps;

    function deposit(uint256 amount) public {
        savings[msg.sender] += amount;
        timestamps[msg.sender] = block.timestamp;
    }

    function getInterest(address owning) public view returns (uint) {
        if (timestamps[owning] > 0) {
            return (block.timestamp - timestamps[owning]);
        }
        return 0;
    }

    function getTotalAmount(address owning) public view returns (uint) {
        return savings[owning] + getInterest(owning);
    }

    function withdraw() public {
        savings[msg.sender] = 0;
        timestamps[msg.sender] = 0;
    }

    constructor() {
        owner = msg.sender;
    }
}