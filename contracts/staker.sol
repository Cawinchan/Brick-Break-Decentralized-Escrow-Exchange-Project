// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";

/**
* @title Stacker Contract
* @notice A contract that allow users to stack ETH
*/
contract Staker {

  // Balances of the user's stacked funds
  mapping(address => uint256) public balances;
  address[] public stakers;   // Stakers

  // Contract's Events
  event Stake(address indexed sender, uint256 amount);

  // Fallback function allows to deposit ether.
    fallback() external payable{
    }

    receive() external payable {
    }

  /**
  * @notice Stake method that update the user's balance and allows them to participate in arbitration
  */
  function stake() public payable {
    // update the user's balance
    balances[msg.sender] += msg.value;
    stakers.push(msg.sender);
    
    // emit the event to notify the blockchain that we have correctly Staked some fund for the user
    emit Stake(msg.sender, msg.value);
  }

  /**
  * @notice Allow users to withdraw their balance from the contract
  */
  function withdraw() public {
    uint256 userBalance = balances[msg.sender];

    // check if the user has balance to withdraw
    require(userBalance > 0, "You don't have balance to withdraw");

    // reset the balance of the user, update state first to prevent Re-Entrancy Attack
    balances[msg.sender] = 0;

    // Remove staker from list
    for (uint i = 0; i<stakers.length-1; i++){
            if (stakers[i] == msg.sender){
                stakers[i] = stakers[stakers.length - 1];
                break;
            }
        }
    stakers.pop();
    
    // Transfer balance back to the user
    (bool sent,) = msg.sender.call{value: userBalance}("");
    require(sent, "Failed to send user balance back to the user");
  }

  /// @dev Returns list of stakers.
    /// @return List of owner stakers.
    function getStakers()
        view
        public
        returns (address[] memory)
    {
        return stakers;
    }

    function getStakeAmount(address userAddress) 
    view
    public 
    returns (uint) {
      return balances[userAddress];
}


}