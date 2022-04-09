// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;     

// Defining a Contract
contract EscrowContract{

    /*
     *  Events
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
    uint256 public time_created;
    

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

    modifier afterADay(){
        require(((block.timestamp - time_created)/ 60 / 60 / 24) > 1);
        _;
    }

    /// Fallback function
    fallback() external payable{
    }

    receive() external payable {
    }

    // Defining a constructor
    constructor(address payable _buyer, 
                address payable _sender,
                uint256 _value) payable{
        
        // Assigning the values of the 
        // state variables
        // value is in wei (1 eth = 1*10^18 wei)
        buyer = _buyer;
        seller = _sender;
        value = _value;
        state = State.await_payment;
        time_created = block.timestamp;

    }
    
    // Defining function to confirm payment (Change to onlySeller to prevent cheating)
    function makePayment() onlyBuyer instate(
    State.await_payment) public payable{
        // checks if correct amount of payment was made
        require(msg.value == value, "Amount sent must be same as specified in the Escrow Contract!");
        // emit event Pay(block.timestamp);
        payable(address(this)).transfer(msg.value);
        state = State.await_delivery;
        

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

       buyer.transfer(address(this).balance);
       state = State.cancelled;
    }
      
    // Defining function to confirm delivery
    function confirmDelivery() onlyBuyer instate(
      State.await_delivery) public{
          
        seller.transfer(address(this).balance);
        state = State.complete;
    }

    // seller calls this transation to gain the funds themself if the buyer does not launch a dispute within a day
    function completeTransaction() onlySeller instate(
      State.await_delivery) afterADay() public{
          
        seller.transfer(address(this).balance);
        state = State.complete;
    }

    function launchDispute() instate(
      State.await_delivery) public {

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

//Dispute contract

pragma solidity 0.8.13; 

/// @title Multisignature wallet - Allows multiple parties to agree on transactions before execution.
/// @author Cawin Chan - <cawin.chan@gmail.com>  
// Reference @aurthor Stefan George - <stefan.george@consensys.net> Gnosis multisigwallet
contract MultiSigWallet {
    /*
     *  Events
     */
    event Approve(uint256 ApprovalCount);
    event Execution(uint256 time);
    event Deposit(address sender, uint value);

    /*
     *  Storage
     */
    mapping (address => bool) public isArbitrator;
    mapping (address => bool) public isApprover;
    address[] public arbitrators;
    address payable public disputer;
    uint256 public required;
    uint256 public ApprovalCount;
    uint256 public time_created;


    /*
     *  Modifiers
     */

    modifier arbitratorExists(address arbitrator) {
        require(isArbitrator[arbitrator]);
        _;
    }

    modifier neverApproved(address arbitrator) {
        require(!isApprover[arbitrator]);
        _;
    }

    modifier withinADay(){
        require(((block.timestamp - time_created)/ 60 / 60 / 24) <= 1);
        _;
    }

    // Fallback function allows to deposit ether.
    fallback() external payable{
    }

    receive() external payable {
    }

    // Defining a constructor
    constructor(address payable _disputer,
                address[] memory _arbitrators, 
                uint _required) payable{

    require(_required != 0
            && _arbitrators.length != 0);

    for (uint i=0; i<_arbitrators.length; i++) {
        require(!isArbitrator[_arbitrators[i]]);
        isArbitrator[_arbitrators[i]] = true;
    }

    disputer = _disputer;
    arbitrators = _arbitrators;
    required = _required;
    time_created = block.timestamp;
    }

    /// @dev Allows an arbitrator to approve the dispute within a day
    function ApproveDispute()
        public
        
        arbitratorExists(msg.sender)
        neverApproved(msg.sender)
        withinADay()
    {
        isApprover[msg.sender] = true;
        ApprovalCount += 1;
        emit Approve(ApprovalCount);
        if (ApprovalCount >= required){
            // Smart contract sends its balance to the disputer 
            disputer.transfer(address(this).balance);
            emit Execution(block.timestamp);
        }
    }

    function getConfirmationCount() view public returns (uint){
        return ApprovalCount;
    }
   
    /// @dev Get time left before dispute expires in mins
    function getTimeLeft() 
        view public 
        withinADay() 
        returns (uint){

        return (24*60) - ((block.timestamp - time_created) / 60);
    }

    /// @dev Get time left before dispute expires in mins
    function getBalance() 
        view public 
        withinADay() 
        returns (uint){
            
        return address(this).balance;
    }
}
