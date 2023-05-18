// const { expect } = require('chai');

// // Import the compiled OrderBook contract
// const OrderBook = artifacts.require('OrderBook');
// const Token1 = artifacts.require('Token1');
// const Token2 = artifacts.require('Token2');

// contract('OrderBook', (accounts) => {
//   let orderBook;
//   let token1;
//   let token2;

//   const owner = accounts[0];
//   const feeAddr = accounts[1];
//   const takerFee = 100; // 1% taker fee
//   const makerFee = 50; // 0.5% maker fee

//   beforeEach(async () => {
//     // Deploy the ERC20 tokens
//     token1 = await Token1.new();
//     token2 = await Token2.new();

//     // Deploy the OrderBook contract
//     orderBook = await OrderBook.new(token1.address, token2.address, feeAddr, takerFee, makerFee);
//   });

//   it('should set the correct initial values', async () => {
//     expect(await orderBook.token1()).to.equal(token1.address);
//     expect(await orderBook.token2()).to.equal(token2.address);
//     expect(await orderBook.feeAddr()).to.equal(feeAddr);
//     expect(await orderBook.takerFee()).to.equal(takerFee);
//     expect(await orderBook.makerFee()).to.equal(makerFee);
//   });

//   it('should create a new order', async () => {
//     const token1Amt = 100;
//     const token2Amt = 200;
//     const priceRatio = 2;
//     const biggerToken = 1; // Token1 is bigger
//     const sellingToken1 = 1; // Selling Token1

//     const result = await orderBook._make(token1Amt, token2Amt, priceRatio, biggerToken, sellingToken1);
//     const orderId = result.logs[0].args.id;

//     const order = await orderBook.viewOffer(orderId);
//     expect(order.sellingTokenAmt.toNumber()).to.equal(token1Amt);
//     expect(order.buyingTokenAmt.toNumber()).to.equal(token2Amt);
//     expect(order.owner).to.equal(accounts[0]);
//     expect(order.sellingToken1.toNumber()).to.equal(sellingToken1);
//   });

// });
