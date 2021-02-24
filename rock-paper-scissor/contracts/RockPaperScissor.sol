pragma solidity >=0.4.22 <0.9.0;

contract RockPaperScissor {

    enum Action {NOT_DECIDED, ROCK, PAPER, SCISSOR}

    struct Game {
        address player1;
        address player2;
        mapping(address => Action) playersAction;
        uint256 stake;
        address winner;
    }

    mapping(address => bool) public playersOpenForChallenge;
    mapping(address => Game) public playersInAGame;
    mapping(address => uint256) public balances;
    Game[] public currentGames;

    ///
    /// Modifier used to make sure
    /// the requester in not currently in a game
    ///
    modifier notAlreadyInAGame {
        Game memory game = playersInAGame[msg.sender];
        require(
            game.player1 == address(0) && game.player2 == address(0),
            "You are already in a game !"
            );
        _;
    }

    modifier inAGame {
        Game memory game = playersInAGame[msg.sender];
        require(
            game.player1 == msg.sender || game.player2 == msg.sender,
            "You are not in a game !"
            );
        _;
    }

    modifier notAlreadyPlayed {
        address sender = msg.sender;
        require(
            playersInAGame[sender].playersAction[sender] == Action.NOT_DECIDED,
            "You have already decided your action."
        );
        _;
    }

    function createGame() public notAlreadyInAGame {
        require(playersOpenForChallenge[msg.sender] == false, "You are already waiting for a challenger");
        playersOpenForChallenge[msg.sender] = true;
    }

    function joinGame(address otherPlayer) public notAlreadyInAGame {
        require(playersOpenForChallenge[otherPlayer] == true, "The requested player do not want to play !");
        
        playersOpenForChallenge[otherPlayer] = false;
        playersOpenForChallenge[msg.sender] = false;

        Game memory game = Game({
            player1: otherPlayer, 
            player2: msg.sender,
            stake: 0,
            winner: address(0)
        });

        playersInAGame[msg.sender] = game;
        playersInAGame[otherPlayer] = game;
    }

    function makeAction(Action action) public inAGame notAlreadyPlayed {
        require(action != Action.NOT_DECIDED);
        playersInAGame[msg.sender].playersAction[msg.sender] = action;

        // Check if the adversary played. If yes, determine the winner
        address adversary = getAdversary(msg.sender);
        Action adversaryAction = playersInAGame[msg.sender].playersAction[adversary];
        if(adversaryAction != Action.NOT_DECIDED){
            if(action == Action.ROCK) {
                if(adversaryAction == Action.SCISSOR) {
                    // Won
                    setWinner(playersInAGame[msg.sender], msg.sender);
                }
                if(adversaryAction == Action.PAPER) {
                    // Lost
                    setWinner(playersInAGame[msg.sender], adversary);
                }
            }
            if(action == Action.PAPER) {
                if(adversaryAction == Action.ROCK) {
                    // Won
                    setWinner(playersInAGame[msg.sender], msg.sender);
                }
                if(adversaryAction == Action.SCISSOR) {
                    // Lost
                    setWinner(playersInAGame[msg.sender], adversary);
                }
            }
            if(action == Action.SCISSOR) {
                if(adversaryAction == Action.PAPER) {
                    // Won
                    setWinner(playersInAGame[msg.sender], msg.sender);
                }
                if(adversaryAction == Action.ROCK) {
                    // Lost
                    setWinner(playersInAGame[msg.sender], adversary);
                }
            }
        }
    }

    function setWinner(Game memory game, address player) private {
        require(game.winner == address(0));
        game.winner = player;
        // Transfer money to winner
        balances[player] += game.stake * 2;
    }

    /// Get the current adversary of the
    /// specified player
    function getAdversary(address player) public view inAGame returns (address) {
        if(playersInAGame[player].player1 != player){
            return playersInAGame[player].player1;
        }
        if(playersInAGame[player].player2 != player){
            return playersInAGame[player].player2;
        }
    }

    function getPlayerAction(address player) public view returns (Action) {
        return playersInAGame[player].playersAction[player];
    }
}