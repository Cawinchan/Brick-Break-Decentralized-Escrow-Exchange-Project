// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;     

// Defining a Contract
contract EscrowContract{

    /*
     *  Possible Events
     */
    // event Cancel(uint256 time);
    // event Return(uint256 time);
    // event Pay(uint256 time);
    // event Refund(uint256 time);
    // event Dispute(uint256 time);
    // event confirm(uint256 time);

    // Declaring the state variables
    address payable public buyer;
    address payable public seller;
    uint256 public value;
    string[] public terms;
    uint256 public time_created;
    

    // Future work 
    // struct Contract{
    //      string description;
    //      uint256 arbitrator_amount;
    //      uint256 lenght_of_contract:
    // }
        

    // Defining a enumerator 'State'
    enum State{
         
        // Following are the States
        // 0: await_confirmation - Waiting for seller to agree to the clauses of the contract
        // 1: await_payment - Waiting for Buyer to send funds to escrow account
        // 2: await_delivery - Buyer has sent funds, waiting for Seller to send item
        // 3: complete - Buyer has received item, funds sent to seller
        // 4: dispute_raised - after payment, either buyer or seller can raise this
        // 5: cancelled - Buyer decides to not send funds or seller decides to return funds to Buyer
        await_confirmation, await_payment, await_delivery, complete, dispute_raised, cancelled
    }
  
    // Declaring the object of the enumerator
    State public state;
      
    // modifier to set the expected state to execute the function
    modifier instate(State expected_state){
          
        require(state == expected_state);
        _;
    }
  
   // Defining function modifier 'onlyBuyer'
    modifier onlyBuyer(){
        require(msg.sender == buyer);
        _;
    }
  
    // Defining function modifier 'onlySeller'
    modifier onlySeller(){
        require(msg.sender == seller);
        _;
    }

    modifier afterADay(){
        require(((block.timestamp - time_created)/ 60 / 60 / 24) > 1);
        _;
    }

    /// Fallback function
    fallback() external payable{
    }
    /// Receive function
    receive() external payable {
    }

    // Defining a constructor
    constructor(address payable _buyer, 
                address payable _sender,
                uint256 _value,
                string[] memory _terms) payable{
        
        // Assigning the values of the 
        // state variables
        // value is in wei (1 eth = 1*10^18 wei)
        buyer = _buyer;
        seller = _sender;
        value = _value;
        terms = _terms;
        state = State.await_confirmation;
        time_created = block.timestamp;

    }

    // Defining function to agree on the smart contract clauses
    function approveContract() onlySeller instate(
    State.await_confirmation) public {
        state = State.await_payment;
    }
    
    // Defining function to confirm payment (Change to onlySeller to prevent cheating)
    function makePayment() onlyBuyer instate(
    State.await_payment) public payable{
        // checks if correct amount of payment was made
        require(msg.value == value, "Amount sent must be same as specified in the Escrow Contract!");
        state = State.await_delivery;
        (bool sent,) = address(this).call{value: msg.value}("");
        require(sent, "Failed to send funds to escrowcontract");
    }

    // Defining function to cancel payment
    function cancelPayment() onlyBuyer instate(
      State.await_payment) public{
        // emit event Cancel(block.timestamp);
        state = State.cancelled;
          
    }

    // Defining function to return payment 
    function returnPayment() onlySeller instate(
      State.await_delivery) public{
       state = State.cancelled;
       (bool sent,) = buyer.call{value: address(this).balance}("");
        require(sent, "Failed to return funds to buyer");

    }
      
    // Defining function to confirm delivery
    function confirmDelivery() onlyBuyer instate(
      State.await_delivery) public{
        state = State.complete;
        (bool sent,) = seller.call{value: address(this).balance}("");
        require(sent, "Failed to send funds to seller");
    }

    // seller calls this transation to gain the funds themself if the buyer does not launch a dispute within a day
    function completeTransaction() onlySeller instate(
      State.await_delivery) afterADay() public{
        state = State.complete;
        (bool sent,) = seller.call{value: address(this).balance}("");
        require(sent, "Failed to send funds to seller");
    }

    function launchDispute() instate(
      State.await_delivery) public {

    // Future work
    //    POS get Arbitrators 
    // arbitrator_addresses = POS.call()

    //    n-of-m wallet

    //    MultiSigWallet c = MultiSigWallet(disputer);
    // MultiSigWallet c = MultiSigWallet(msg.sender,arbitrator_addresses,((arbitrator_addresses.length/2)+1));

       state = State.dispute_raised;
    }

    function getBalance() view public returns (uint) {
        return address(this).balance;
    }

    function getState() view public returns (State){
        return state;
    }

}