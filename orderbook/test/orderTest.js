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
    [owner, addr1, addr2] = await ethers.getSigners();
    // Deploy the contract and set up test variables
    const OrderBook = await hre.ethers.getContractFactory("OrderBook");
   
    feeAddr = owner.address
    takerFee = 1000; 
    makerFee = 500; 
    orderBook = await OrderBook.deploy(
      "0xf67d9ad670892347ced0404556c922d6a820a334",
      "0x184692bb70f186dfaef0a9b4eb52a0d79cf1cf97",
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

  it("should create a maker order correctly", async function () {
    const token1Amt = 100;
    const token2Amt = 200;
    const priceRatio = 50;
    const biggerToken = 1; // token1 is the bigger token
    const sellingToken1 = 1; // token1 is being sold

    const tx = await orderBook._make(
      token1Amt,
      token2Amt,
      priceRatio,
      biggerToken,
      sellingToken1
    );

    // Check event emission
    const offerCreateEvent = await tx.wait().then((receipt) => {
      return receipt.events.find((event) => event.event === "OfferCreate");
    });
    expect(offerCreateEvent).to.not.be.undefined;

    // Get the created order
    const orderId = offerCreateEvent.args.id;
    const order = await orderBook.viewOffer(orderId);
    expect(order.sellingTokenAmt.toString()).to.equal(token1Amt.toString());
    expect(order.buyingTokenAmt.toString()).to.equal(token2Amt.toString());
    expect(order.owner.toString()).to.equal(owner.address.toString());
    expect(order.sellingToken1.toString()).to.equal(sellingToken1.toString());
  });


});