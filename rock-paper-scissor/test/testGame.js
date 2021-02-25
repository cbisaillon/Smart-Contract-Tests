const RockPaperScissor = artifacts.require("RockPaperScissor");

const ACTION_NOT_PLAYED = 0;
const ROCK = 1;
const PAPER = 2;
const SCISSOR = 3;

contract("RockPaperScissor", accounts => {
    it("should play a full game", () => {
        return RockPaperScissor.deployed()
            .then(async function(instance){

                // Check pre game created
                var player1CreatedGame = await instance.playersOpenForChallenge(accounts[0])
                assert.equal(player1CreatedGame, false)

                // Create a game
                await instance.createGame();
                var player1CreatedGame = await instance.playersOpenForChallenge(accounts[0]);
                assert.equal(player1CreatedGame, true)

                // Let player 2 join the game
                var game = await instance.getGameOfPlayer(accounts[0]);
                assert.equal(game.player1, accounts[0]);
                assert.equal(game.player2, "0x0000000000000000000000000000000000000000");

                await instance.joinGame(accounts[0], {from: accounts[1]});
                var game = await instance.getGameOfPlayer(accounts[0]);
                assert.equal(game.player1, accounts[0]);
                assert.equal(game.player2, accounts[1]);

                // Prechecks before playing
                var player1Action = await instance.playersAction(accounts[0]);
                var player2Action = await instance.playersAction(accounts[1]); 

                assert.equal(player1Action, ACTION_NOT_PLAYED);
                assert.equal(player2Action, ACTION_NOT_PLAYED);

                // Let player 1 play
                await instance.makeAction(ROCK)

                var player1Action = await instance.playersAction(accounts[0]);
                var player2Action = await instance.playersAction(accounts[1]); 

                assert.equal(player1Action, ROCK);
                assert.equal(player2Action, ACTION_NOT_PLAYED);

                // Let player 2 play
                await instance.makeAction(PAPER, {from: accounts[1]})

                var player1Action = await instance.playersAction(accounts[0]);
                var player2Action = await instance.playersAction(accounts[1]); 

                assert.equal(player1Action, ROCK);
                assert.equal(player2Action, PAPER);

                // Check that there is a winner
                var game = await instance.getGameOfPlayer(accounts[0]);
                assert.equal(game.winner, accounts[1]);

                //todo: check that everything resets
            })
        });
});