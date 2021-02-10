const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
    accounts = await new web3.eth.getAccounts()
    myToken = await MyToken.deployed()
    farmToken = await FarmToken.deployed()

    const allowanceBefore = await myToken.allowance(accounts[0], farmToken.address)
    console.log("Amount allowed to transfer on our behalf: " + allowanceBefore.toString())

    await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"))

    const allowanceAfter = await myToken.allowance(accounts[0], farmToken.address)
    console.log("Amount allowed to transfer on our behalf after approving: " + allowanceAfter.toString())
    
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

    console.log("Calling deposit...")

    await farmToken.deposit(web3.utils.toWei("100", "ether"))

    let balanceMyTokenAfterAccount0 = await myToken.balanceOf(accounts[0])
    let balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)

    console.log("Balance MyToken after accounts[0]: " + web3.utils.fromWei(balanceMyTokenAfterAccount0.toString()))
    console.log("Balance MyToken after FarmToken: " + web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString()))

    callback()
}