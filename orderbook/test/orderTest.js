const hre = require("hardhat");
const { expect } = require("chai");


describe("OrderBook", function () {
  let orderBook;
  let feeAddr;
  let takerFee = 1000
  let makerFee =500;
  let owner ;
  let addr1;
  let addr2;


  beforeEach(async function () {
    // Deploy the contract and set up test variables
    const OrderBook = await hre.ethers.getContractFactory("OrderBook");
   
    feeAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    takerFee = 1000; 
    makerFee = 500; 
    orderBook = await OrderBook.deploy(
      "0xf67d9ad670892347ced0404556c922d6a820a334",
      "0x184692bb70f186dfaef0a9b4eb52a0d79cf1cf97",
      feeAddr,
      takerFee,
      makerFee
    );
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("should set the initial taker fee correctly", async function () {
    const returnedTakerFee = await orderBook.getTakerFee();
    expect(returnedTakerFee.toString()).to.equal(takerFee.toString());
  });

  it("should set the initial maker fee correctly", async function () {
    const returnedMakerFee = await orderBook.getMakerFee();
    expect(returnedMakerFee.toString()).to.equal(makerFee.toString());
  });

  it("should allow owner to change the taker fee", async function () {
    const newTakerFee = 2000;
    await orderBook.setTakerFee(newTakerFee);
    const returnedTakerFee = await orderBook.getTakerFee();
    expect(returnedTakerFee.toString()).to.equal(newTakerFee.toString());
  });

  it("should allow owner to change the maker fee", async function () {
    const newMakerFee = 1000;
    await orderBook.setMakerFee(newMakerFee);
    const returnedMakerFee = await orderBook.getMakerFee();
    expect(returnedMakerFee.toString()).to.equal(newMakerFee.toString());
  });

  // Add more test cases as needed

});