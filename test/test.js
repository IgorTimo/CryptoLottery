const { expect } = require("chai");
const { ethers } = require("hardhat");


let Lottery;
let lottery;
let addresses;

beforeEach (async () => {
  Lottery = await ethers.getContractFactory("Lottery");
  addresses = await ethers.getSigners();
  addresses = addresses.map(address => address.address);
  console.log("addresses: ", addresses[0])


});

describe('Lottery', () => {

  it("Deploys a contract", async () => {
     lottery = await Lottery.deploy();
  });

  it('Allows to enter one player', async () => {
    expect(await lottery.enter());
  })


  it("Have a deployer", async () => {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  })

});


//ORIGINAL TESTS FROM COURSE:

/*
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: bytecode})
  .send({from: accounts[0], gas: '1000000'});
});

describe("Lottery contract", () => {
  it("Deploys a contract:   ", () => {
    assert.ok(lottery.options.address);
  });
  it("Allows one account to enter the lottery:   ", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.1", "ether")
    });


    const players = await lottery.methods.getPlayers().call({from: accounts[0]});

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });
  it("Allows multiple account to enter the lottery:   ", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.1", "ether")
    });
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.1", "ether")
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.1", "ether")
    });


    const players = await lottery.methods.getPlayers().call({from: accounts[0]});

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });
  it("Rquieres a minimum amount of ether:   ", async () => {
    try{
      await lottery.methods.enter().send({
        from: account[0],
        value: 22
      });
      assert(false);
    } catch (err){
      assert(err);
    }
  });
  it("Only manager con pick winner:   ", async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1],
        value: web3.utils.toWei("0.1", "ether")
      });
      assert(false);
    } catch(err){
      assert(err);
    }
  });
  it("Sends money to the winnner and reset players arr:   ", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether")
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickWinner().send({from: accounts[0]});
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initialBalance;
    
    console.log("Defference:   " + difference);
    assert(difference > web3.utils.toWei("1.8", "ether"));

  });
});
*/