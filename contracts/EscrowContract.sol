// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;     
   
// Defining a Contract
contract EscrowContract{

    // Declaring the state variables
    address payable public buyer;
    address payable public seller;
    uint256 public value;
	// mapping(address => uint) TotalAmount;

    // Future work 
    // struct Contract{
    //      string description;
    //      uint256 arbitrator_amount;
    //      uint256 lenght_of_contract:
    // }
            
  
    // Defining a enumerator 'State'
    enum State{
         
        // Following are the data members
        // 0: await_payment - Waiting for Buyer to send funds to escrow account
        // 1: await_delivery - Buyer has sent funds, waiting for Seller to send item
        // 2: complete - Buyer has received item, funds sent to seller
        // 3: dispute_raised - after payment, either buyer or seller can raise this
        // 4: cancelled - Buyer decides to not send funds or seller decides to return funds to Buyer
        await_payment, await_delivery, complete, dispute_raised, cancelled
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

    // Defining a constructor
    constructor(address payable _buyer, 
                address payable _sender,
                uint256 _value)  payable{


        
        // Assigning the values of the 
        // state variables
        // value is in wei (1 eth = 1*10^18 wei)
        buyer = _buyer;
        seller = _sender;
        value = _value;
        state = State.await_payment;
    }
    
    // Defining function to confirm payment (Change to onlySeller to prevent cheating)
    function makePayment() onlyBuyer instate(
    State.await_payment) public payable{
        // checks if correct amount of payment was made
        require(msg.value == value, "Amount sent must be same as specified in the Escrow Contract!");

        payable(address(this)).transfer(msg.value);
        state = State.await_delivery;
        

    }

    // Defining function to cancel payment
    function cancelPayment() onlyBuyer instate(
      State.await_payment) public{
        state = State.cancelled;
          
    }

    // Defining function to return payment 
    function returnPayment() onlySeller instate(
      State.await_delivery) public{

       buyer.transfer(address(this).balance);
       state = State.cancelled;
    }
      
    // Defining function to confirm delivery
    function confirmDelivery() onlyBuyer instate(
      State.await_delivery) public{
          
        seller.transfer(address(this).balance);
        state = State.complete;
    }

    function launchDispute() instate(
      State.await_delivery ) public {

    //    POS get validators 
    //    n-of-m wallet
       state = State.dispute_raised;
    }

    function getBalance() view public returns (uint) {
        return address(this).balance;
    }

    function getState() view public returns (State){
        return state;
    }



    // Test function
    function sendFunds() public payable returns (bool){
            bool res = payable(address(this)).send(msg.value);
            return res;
        }


    fallback() external payable{
    }

    receive() external payable {
    }

}
