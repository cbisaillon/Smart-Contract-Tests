const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
    accounts = await new web3.eth.getAccounts()
    myToken = await MyToken.deployed()
    farmToken = await FarmToken.deployed()

    let balanceMyTokenBeforeAccount0 = await myToken.balanceOf(accounts[0])
    let balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)

    console.log("MyToken")
    console.log("Balance MyToken of accounts[0]: " + web3.utils.fromWei(balanceMyTokenBeforeAccount0.toString()))
    console.log("Balance MyToken of FarmToken: " + web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString()))

    let balanceFarmTokenBeforeAccount0 = await farmToken.balanceOf(accounts[0])
    let balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)

    console.log("FarmToken")
    console.log("Balance FarmToken of accounts[0]: " + web3.utils.fromWei(balanceFarmTokenBeforeAccount0.toString()))
    console.log("Balance FarmToken of FarmToken: " + web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString()))

    console.log("WITHDRAWING...")

    await farmToken.withdraw(web3.utils.toWei("100", "ether"))

    let balanceMyTokenAfterAccount0 = await myToken.balanceOf(accounts[0])
    let balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)

    console.log("MyToken")
    console.log("Balance MyToken of accounts[0]: " + web3.utils.fromWei(balanceMyTokenAfterAccount0.toString()))
    console.log("Balance MyToken of FarmToken: " + web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString()))

    let balanceFarmTokenAfterAccount0 = await farmToken.balanceOf(accounts[0])
    let balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)

    console.log("FarmToken")
    console.log("Balance FarmToken of accounts[0]: " + web3.utils.fromWei(balanceFarmTokenAfterAccount0.toString()))
    console.log("Balance FarmToken of FarmToken: " + web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString()))
}