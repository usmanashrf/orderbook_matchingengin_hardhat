const { ethers } = require("hardhat");

async function main() {
  // Deploying OrderBook contract
  const OrderBook = await ethers.getContractFactory("OrderBook");
  const token1 = await ethers.getContractAt("ERC20", "0xf67d9ad670892347ced0404556c922d6a820a334"); // token1 address of USDT
  const token2 = await ethers.getContractAt("ERC20", "0x184692bb70f186dfaef0a9b4eb52a0d79cf1cf97"); //  token2 address of ETH
  const feeAddr = "0xF10EB2EA6c3579F911E7cB24B3ffDb15e6A95ef3"; // my metamask wallet address
  const takerFee = 100; // taker fee in BPS (0.01%)
  const makerFee = 50; // maker fee in BPS (0.01%)
  const orderBook = await OrderBook.deploy(token1.address, token2.address, feeAddr, takerFee, makerFee);
  await orderBook.deployed();

  console.log("OrderBook deployed to:", orderBook.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
