pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract RockPaperScissor {

    enum Action {NOT_DECIDED, ROCK, PAPER, SCISSOR}

    struct Game {
        address player1;
        address player2;
        uint256 stake;
        address winner;
    }

    mapping(address => bool) public playersOpenForChallenge;
    mapping(address => Game) public games;
    mapping(address => address) public playerGameMapping;
    mapping(address => Action) public playersAction;

    mapping(address => uint256) public balances;
    Game[] public currentGames;

    ///
    /// Modifier used to make sure
    /// the requester in not currently in a game
    ///
    modifier notAlreadyInAGame {
        Game memory game = games[playerGameMapping[msg.sender]];
        require(
            game.player1 == address(0) && game.player2 == address(0),
            "You are already in a game !"
            );
        _;
    }

    modifier inAGame {
        Game memory game = games[playerGameMapping[msg.sender]];
        require(
            game.player1 == msg.sender || game.player2 == msg.sender,
            "You are not in a game !"
            );
        _;
    }

    modifier notAlreadyPlayed {
        address sender = msg.sender;
        require(
            playersAction[sender] == Action.NOT_DECIDED,
            "You have already decided your action."
        );
        _;
    }

    function createGame() public notAlreadyInAGame {
        require(playersOpenForChallenge[msg.sender] == false, "You are already waiting for a challenger");
        playersOpenForChallenge[msg.sender] = true;

        Game memory game = Game({
            player1: msg.sender, 
            player2: address(0),
            stake: 0,
            winner: address(0)
        });
        games[msg.sender] = game;
        playerGameMapping[msg.sender] = msg.sender;
    }

    function joinGame(address otherPlayer) public notAlreadyInAGame {
        require(playersOpenForChallenge[otherPlayer] == true, "The requested player do not want to play !");
        
        playersOpenForChallenge[otherPlayer] = false;
        playersOpenForChallenge[msg.sender] = false;

        games[playerGameMapping[otherPlayer]].player2 = msg.sender;
        playerGameMapping[msg.sender] = otherPlayer;
    }

    function makeAction(Action action) public inAGame notAlreadyPlayed {
        require(action != Action.NOT_DECIDED);
        Game storage game = games[playerGameMapping[msg.sender]];
        playersAction[msg.sender] = action;

        // Check if the adversary played. If yes, determine the winner
        address adversary = getAdversary(msg.sender);
        Action adversaryAction = playersAction[adversary];
        if(adversaryAction != Action.NOT_DECIDED){
            if(action == Action.ROCK) {
                if(adversaryAction == Action.SCISSOR) {
                    // Won
                    setWinner(game, msg.sender);
                }
                if(adversaryAction == Action.PAPER) {
                    // Lost
                    setWinner(game, adversary);
                }
            }
            if(action == Action.PAPER) {
                if(adversaryAction == Action.ROCK) {
                    // Won
                    setWinner(game, msg.sender);
                }
                if(adversaryAction == Action.SCISSOR) {
                    // Lost
                    setWinner(game, adversary);
                }
            }
            if(action == Action.SCISSOR) {
                if(adversaryAction == Action.PAPER) {
                    // Won
                    setWinner(game, msg.sender);
                }
                if(adversaryAction == Action.ROCK) {
                    // Lost
                    setWinner(game, adversary);
                }
            }
        }
    }

    function setWinner(Game storage game, address player) private {
        require(game.winner == address(0));
        game.winner = player;
        // Transfer money to winner
        balances[player] += game.stake * 2;
    }

    /// Get the current adversary of the
    /// specified player
    function getAdversary(address player) private view inAGame returns (address) {
        Game memory game = games[playerGameMapping[player]];
        if(game.player1 != player){
            return game.player1;
        }
        if(game.player2 != player){
            return game.player2;
        }
    }

    function getGameOfPlayer(address player) public view returns (Game memory) {
        return games[playerGameMapping[player]];
    }
}