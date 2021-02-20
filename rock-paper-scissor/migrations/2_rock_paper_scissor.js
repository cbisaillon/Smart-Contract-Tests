const RockPaperScissor = artifacts.require("RockPaperScissor");

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(RockPaperScissor);
    const rockPaperScissor = await RockPaperScissor.deployed();
}