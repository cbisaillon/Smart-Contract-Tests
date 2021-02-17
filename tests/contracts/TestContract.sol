pragma solidity >=0.4.22 <0.9.0;

contract TestContract {
    uint public stateVariable = 5;

    function getBalance() public view returns (uint256 balance) {
        return address(this).balance;
    }
}