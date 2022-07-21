// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Interlynk is ERC20, ERC20Burnable, Ownable {
    constructor(uint256 initialSupply) ERC20("Interlynk", "INT") {
        _mint(msg.sender, initialSupply *10**18 );

    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}