const { expect } = require("chai");
const hre = require("hardhat");


describe("OrderBook", function () {
  let orderBook;
  let token1;
  let token2;
  let feeAddr;
  let takerFee;
  let makerFee;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Deploy the contract and set up test variables
    const OrderBook = await hre.ethers.getContractFactory("OrderBook");
    token1 = await hre.ethers.getContractFactory("ERC20").deploy(); // Replace with your ERC20 token contract
    token2 = await hre.ethers.getContractFactory("ERC20").deploy(); // Replace with your ERC20 token contract
    const token1Contract = await token1.deploy("Ethereum", "ETH");  
    const token2Contract = await token2.deploy("US Dollar", "USDT");

    await token1Contract.deployed();
    await token2Contract.deployed();
    
    feeAddr = await hre.ethers.provider.getSigner(); // Replace with a valid address for the fee recipient
    takerFee = 1000; // Set the initial taker fee (0.01%)
    makerFee = 500; // Set the initial maker fee (0.005%)
    orderBook = await OrderBook.deploy(token1.address, token2.address, feeAddr.address, takerFee, makerFee);
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("should set the initial taker fee correctly", async function () {
    const retrievedTakerFee = await orderBook.getTakerFee();
    expect(retrievedTakerFee).to.equal(takerFee);
  });

  it("should allow the owner to set the taker fee", async function () {
    const newTakerFee = 2000;
    await orderBook.connect(owner).setTakerFee(newTakerFee);
    const retrievedTakerFee = await orderBook.getTakerFee();
    expect(retrievedTakerFee).to.equal(newTakerFee);
  });

  it("should revert when setting taker fee above 50%", async function () {
    const invalidTakerFee = 6000;
    await expect(
      orderBook.connect(owner).setTakerFee(invalidTakerFee)
    ).to.be.revertedWith("InvalidFeeValue");
  });

  // Add more test cases for other functions and scenarios as needed
});