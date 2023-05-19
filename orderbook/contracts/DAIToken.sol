// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAIToken is ERC20, Ownable {
    constructor() ERC20("DAIToken", "DAI") {
        _mint(msg.sender, 2000 * 10 **2);
    }

    function mint(uint _amountToMinted) external onlyOwner{
        _mint(msg.sender, _amountToMinted);
    }
}