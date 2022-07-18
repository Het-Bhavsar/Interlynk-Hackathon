// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


contract Interlynk is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Interlynk", "ILK") {
        _mint(msg.sender, 10000000 );
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}