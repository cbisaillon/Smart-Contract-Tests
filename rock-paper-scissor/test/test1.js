const RockPaperScissor = artifacts.require("RockPaperScissor");

const ROCK = 1;
const PAPER = 2;
const SCISSOR = 3;

module.exports = async function (callback) {
    let rockPaperScissor = await RockPaperScissor.deployed();
    let accounts = await web3.eth.getAccounts();

    console.log("Running test1");

    let gameCreatedBefore = await rockPaperScissor.playersOpenForChallenge(accounts[0]);
    console.log("Account 1 created game: " + gameCreatedBefore);

    console.log("Creating game...");
    try{
        await rockPaperScissor.createGame();

        let gameCreatedAfter = await rockPaperScissor.playersOpenForChallenge(accounts[0]);
        console.log("Account 1 created game: " + gameCreatedAfter);
    }catch(err){
        console.log("Error: " + err.reason);
    }

    // Let account 2 join the match

    console.log("Player 2 joining game...")
    try{
        await rockPaperScissor.joinGame(accounts[0], {from: accounts[1]});
    }catch(err){
        console.log("Error: " + err.reason);
    }

    console.log("Game status:")
    let game = await rockPaperScissor.playersInAGame(accounts[1]);
    console.log(game);

    let player1Action = await rockPaperScissor.getPlayerAction(accounts[0]);
    let player2Action = await rockPaperScissor.getPlayerAction(accounts[1]); 

    console.log("Player 1 action: " + player1Action.toNumber());
    console.log("Player 2 action: " + player2Action.toNumber());
    console.log("Winner: " + game.winner)

    console.log("Player 1 play...")
    try{
        await rockPaperScissor.makeAction(ROCK)
    }catch(err){
        console.log("Error: " + err.reason);
    }

    console.log("Player 2 play...")
    try{
        await rockPaperScissor.makeAction(PAPER, {from: accounts[1]})
    }catch(err){
        console.log("Error: " + err.reason);
    }

    let player1Action2 = await rockPaperScissor.getPlayerAction(accounts[0]);
    let player2Action2 = await rockPaperScissor.getPlayerAction(accounts[1]); 

    console.log("Player 1 action: " + player1Action2.toNumber());
    console.log("Player 2 action: " + player2Action2.toNumber());
    console.log("Winner: " + game.winner)


    callback();
}