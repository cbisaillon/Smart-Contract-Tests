const TestContract = artifacts.require("TestContract")

module.exports = async function (callback) {

    testContract = await TestContract.deployed();

    let a = await testContract.getBalance();

    console.log(a.toNumber());

    // .call().then(function(result){
    //     console.log("State variable: " + result);
    // });

    callback();
}