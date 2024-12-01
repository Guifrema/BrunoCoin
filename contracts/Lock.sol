// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BrunoCoin is ERC20, ERC20Burnable, Ownable {
    constructor(address initialOwner) 
        ERC20("BrunoCoin", "BCoin") 
        Ownable(initialOwner)
    {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address to, uint256 amount) public onlyOwner {
        _burn(to, amount);
    }

    function transferTo(address from, address to, uint256 amount) public onlyOwner{
        _transfer(from, to, amount);
    }

    function balance(address account) public view onlyOwner returns (uint256){
       return balanceOf(account);
    }

    function supply() public view onlyOwner returns (uint256){
       return totalSupply();
    }

    function getName() public view onlyOwner returns (string memory){
        return name();
    }

    function getSymbol() public view onlyOwner returns (string memory){
        return symbol();
    }

    function info() public view onlyOwner returns (uint8){
        return decimals();
    }
}
