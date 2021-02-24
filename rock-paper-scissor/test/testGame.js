const RockPaperScissor = artifacts.require("RockPaperScissor");

const ROCK = 1;
const PAPER = 2;
const SCISSOR = 3;

contract("RockPaerScissor", accounts => {
    it("should play a full game", () => {
        return RockPaperScissor.deployed()
            .then(instance => {

                // Check pre game created
                instance.playersOpenForChallenge(accounts[0])
                    .then(player1CreatedGame => assert.equal(player1CreatedGame, false));

                console.log("aa")

                // Create a game
                instance.createGame().then(() => {
                    console.log("Creating game");
                    instance.playersOpenForChallenge(accounts[0])
                        .then(player1CreatedGame => assert.equal(player1CreatedGame, true))
                        .then(() => {
                            console.log("111");
                            // Game created
                            // Let player 2 join the game
                            instance.playersInAGame(accounts[0]).then(game => {
                                console.log("AAA");
                                console.log(game);
                                assert.equal(game.player2, "0x0333");
                            });
                        })
                })
            })
        });

    // let gameCreatedBefore = ;
    // console.log("Account 1 created game: " + gameCreatedBefore);

    // console.log("Creating game...");
    // try{
    //     await rockPaperScissor.createGame();

    //     let gameCreatedAfter = await rockPaperScissor.playersOpenForChallenge(accounts[0]);
    //     console.log("Account 1 created game: " + gameCreatedAfter);
    // }catch(err){
    //     console.log("Error: " + err.reason);
    // }

    // // Let account 2 join the match

    // console.log("Player 2 joining game...")
    // try{
    //     await rockPaperScissor.joinGame(accounts[0], {from: accounts[1]});
    // }catch(err){
    //     console.log("Error: " + err.reason);
    // }

    // console.log("Game status:")
    // let game = await rockPaperScissor.playersInAGame(accounts[1]);
    // console.log(game);

    // let player1Action = await rockPaperScissor.getPlayerAction(accounts[0]);
    // let player2Action = await rockPaperScissor.getPlayerAction(accounts[1]); 

    // console.log("Player 1 action: " + player1Action.toNumber());
    // console.log("Player 2 action: " + player2Action.toNumber());
    // console.log("Winner: " + game.winner)

    // console.log("Player 1 play...")
    // try{
    //     await rockPaperScissor.makeAction(ROCK)
    // }catch(err){
    //     console.log("Error: " + err.reason);
    // }

    // console.log("Player 2 play...")
    // try{
    //     await rockPaperScissor.makeAction(PAPER, {from: accounts[1]})
    // }catch(err){
    //     console.log("Error: " + err.reason);
    // }

    // let player1Action2 = await rockPaperScissor.getPlayerAction(accounts[0]);
    // let player2Action2 = await rockPaperScissor.getPlayerAction(accounts[1]); 

    // console.log("Player 1 action: " + player1Action2.toNumber());
    // console.log("Player 2 action: " + player2Action2.toNumber());
    // console.log("Winner: " + game.winner)
    // });
});