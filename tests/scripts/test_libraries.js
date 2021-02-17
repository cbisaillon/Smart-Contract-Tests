const NewGreetingsContract = artifacts.require("NewGreetingsContract");

module.exports = async function(callback) {
    let contract = await NewGreetingsContract.deployed();

    let a = await contract.DoGreeting.call("clem");
    console.log(a);

    callback();
}