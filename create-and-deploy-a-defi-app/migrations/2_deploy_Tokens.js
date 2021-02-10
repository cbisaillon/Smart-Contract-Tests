const MyToken = artifacts.require("MyToken")

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(MyToken)
    const myToken = await MyToken.deployed()
}