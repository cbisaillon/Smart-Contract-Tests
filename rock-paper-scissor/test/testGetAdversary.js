const RockPaperScissor = artifacts.require("RockPaperScissor");

module.exports = async function(callback) {
    rockPaperScissor = await RockPaperScissor.deployed();
    accounts = await web3.eth.getAccounts();

    try {
        await rockPaperScissor.createGame();
    } catch(error) {
        console.log("Error: " + error.reason);
    }

    try {
        await rockPaperScissor.joinGame(accounts[0], {from: accounts[1]});
    } catch(error) {
        console.log("Error: " + error.reason);
    }

    console.log("Player 1: " + accounts[0]);
    console.log("Player 2: " + accounts[1]);

    let opponentOf1 = await rockPaperScissor.getAdversary(accounts[0]);
    let opponentOf2 = await rockPaperScissor.getAdversary(accounts[1]);

    console.log("Opponent of player 1: " + opponentOf1);
    console.log("Opponent of player 2: " + opponentOf2);

    callback();
}