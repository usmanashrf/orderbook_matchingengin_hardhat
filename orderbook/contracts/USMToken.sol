// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USMToken is ERC20, Ownable {
    constructor() ERC20("USMToken", "USM") {
        _mint(msg.sender, 200 * 10 **2);
    }

    function mint(uint _amountToMinted) external onlyOwner{
        _mint(msg.sender, _amountToMinted);
    }
}