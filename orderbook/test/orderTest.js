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


  before(async function () {

    [owner, addr1, addr2] = await ethers.getSigners();
    // Deploy the contract and set up test variables
    const OrderBook = await hre.ethers.getContractFactory("OrderBook");

    _daiToken = await hre.ethers.getContractFactory("DAIToken");
    daiToken = await _daiToken.deploy();
    _usmToken = await hre.ethers.getContractFactory("USMToken");
    usmToken = await _usmToken.deploy();

    feeAddr = owner.address
    takerFee = 1000; 
    makerFee = 500; 

    orderBook = await OrderBook.deploy(
      daiToken.address,
      usmToken.address,
      feeAddr,
      takerFee,
      makerFee
    );
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

});


describe("MatchingEngine", function () {
  let matchEng;
  let feeAddr;
  let takerFee = 1000
  let makerFee =500;
  let owner ;
  let addr1;
  let addr2;


  before(async function () {


    [owner, addr1, addr2] = await ethers.getSigners();
    // Deploy the contract and set up test variables
    const Match = await hre.ethers.getContractFactory("MatchingEngine");

    _daiToken = await hre.ethers.getContractFactory("DAIToken");
    daiToken = await _daiToken.deploy();
    _usmToken = await hre.ethers.getContractFactory("USMToken");
    usmToken = await _usmToken.deploy();

    feeAddr = owner.address
    takerFee = 1000; 
    makerFee = 500; 

    matchEng = await Match.deploy(
      daiToken.address,
      usmToken.address,
      feeAddr,
      takerFee,
      makerFee
    );
  });

  it('should create a maker order and add it to the order book', async () => {
    const token1Amt = 100;
    const token2Amt = 200;
    const sellingToken1 = 1;
    const dllPosition = 0;

    await daiToken.approve(matchEng.address, 2000);
    await usmToken.approve(matchEng.address, 2000);

    await matchEng.makerOrder(token1Amt, token2Amt, sellingToken1, dllPosition);

  });
  it('should match a taker order with an existing maker order', async () => {
    // Create and add a maker order to the order book
    const makerToken1Amt = 100;
    const makerToken2Amt = 200;
    const makerSellingToken1 = 1;
    const makerDllPosition = 0;

    await daiToken.approve(matchEng.address, 2000);
    await usmToken.approve(matchEng.address, 2000);

    await matchEng.makerOrder(makerToken1Amt, makerToken2Amt, makerSellingToken1, makerDllPosition);

    // Create a taker order that matches the maker order
    const takerToken1Amt = 50;
    const takerToken2Amt = 100;
    const takerSellingToken1 = 1;
    
    await matchEng.makerOrder(takerToken1Amt, takerToken2Amt, takerSellingToken1, 0);

  });

});