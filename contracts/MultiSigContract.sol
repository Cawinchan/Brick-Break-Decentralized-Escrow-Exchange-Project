// SPDX-License-Identifier: MIT

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
    address payable public disputee;
    uint256 public required;
    uint256 public ApprovalCount;
    uint256 public time_created;

    enum State{
         
        // Following are the States
        // 0: await_deposit - Waiting for EscrowContract to send funds
        // 1: await_approval - Waiting arbitrators to approve contract 
        // 2: dispute_succesful - Disputer application was succesful
        // 3: dispute_failed - Disputer application was not succesful
        await_deposit, await_approval, dispute_succesful, dispute_failed
    }
  
    // Declaring the object of the enumerator
    State public state;

    /*
     *  Modifiers
     */

    // modifier to set the expected state to execute the function
    modifier instate(State expected_state){
          
        require(state == expected_state);
        _;
    }


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

    modifier AfterADay(){
        require(((block.timestamp - time_created)/ 60 / 60 / 24) > 1);
        _;
    }

    // Fallback function allows to deposit ether.
    fallback() external payable{
    }

    receive() external payable {
    }

    // Defining a constructor
    constructor(address payable _disputer, // Person lauching the dispute
                address payable _disputee, // Person lauching the dispute against
                address[] memory _arbitrators, 
                uint _required) payable{

    require(_required != 0
            && _arbitrators.length != 0);

    for (uint i=0; i<_arbitrators.length; i++) {
        require(!isArbitrator[_arbitrators[i]]);
        isArbitrator[_arbitrators[i]] = true;
    }

    disputer = _disputer;
    disputee = _disputee;
    arbitrators = _arbitrators;
    required = _required;
    state = State.await_deposit;
    time_created = block.timestamp;
    }
    
    function depositFunds() public payable
            instate(State.await_deposit)
            {
        state = State.await_approval;
        (bool sent,) = address(this).call{value: msg.value}("");
        require(sent, "Failed to send funds to multisig");
    }

    /// @dev Allows an arbitrator to approve the dispute within a day
    function ApproveDispute()
        public
        arbitratorExists(msg.sender)
        neverApproved(msg.sender)
        withinADay()
        instate(State.await_approval)
    {
        isApprover[msg.sender] = true;
        ApprovalCount += 1;
        emit Approve(ApprovalCount);
        if (ApprovalCount >= required){
            // Smart contract sends its balance to the disputer 
            state = State.dispute_succesful;
            (bool sent,) = disputer.call{value: address(this).balance}("");
            require(sent, "Failed to send funds to disputer");
            emit Execution(block.timestamp);
        }
    }

    /// @dev Allows an arbitrator to approve the dispute within a day
    function getResult()
        public
        AfterADay()
    {
        if (ApprovalCount < required){
            state = State.dispute_failed;
            (bool sent,) = disputee.call{value: address(this).balance}("");
            require(sent, "Failed to send funds to disputee");
        }
        if (ApprovalCount >= required){
            state = State.dispute_succesful;
            (bool sent,) = disputer.call{value: address(this).balance}("");
            require(sent, "Failed to send funds to disputer");
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

    function getState() view public returns (State){
        return state;
    }
}
