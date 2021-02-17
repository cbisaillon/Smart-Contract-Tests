pragma solidity >=0.4.16 <0.90;

library Greetings {
    function sayHello(bytes32 name) internal pure returns (bytes memory) {
        return abi.encodePacked("Hello ", name);
    }

    function sayBye() internal pure returns (bytes memory) {
        return "Adios cowboy";
    }
}

contract NewGreetingsContract {
    using Greetings for *;

    function DoGreeting(bytes32 name) public pure returns (bytes memory) {
        return Greetings.sayHello(name);
    }

    function DoLeavings() public pure returns (bytes memory) {
        return Greetings.sayBye();
    }
}