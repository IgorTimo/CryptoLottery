//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Lottery {
    address public manager;
    address[] public players;

    constructor()  {
        manager = msg.sender;
        console.log("msg.sender: ", msg.sender);
        // console.log("msg.data: ", msg.data);
        // console.log("msg.gas: ", msg.gas);
        // console.log("msg.value: ", msg.value);
    }

    function getPlayers() public view returns(address[] memory){
        return players;
    }

    function enter() public payable{
        require(msg.value >= 0.01 ether, "Too little money!");
        players.push(msg.sender);
    }

    function random() private view returns(uint){
       return uint(keccak256(abi.encode(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted{
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    modifier restricted(){
        require(msg.sender == manager, "You not a manager! You can't start lottery!");
        _;
    }
}

