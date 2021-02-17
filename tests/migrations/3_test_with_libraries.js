const NewGreetingsContract = artifacts.require("NewGreetingsContract");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(NewGreetingsContract);
    const contract = await NewGreetingsContract.deployed();
}