const TestContract = artifacts.require("TestContract")

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(TestContract)
    const testContract = await TestContract.deployed();
}