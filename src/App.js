
import React, { useState } from "react";
import { GameContainer, PanelDiv, Message, MessageTurn } from "./App.Styles.js";

const TicTacToe = () => {
  // Todos

  // Game state
  const [opponent, setOpponent] = useState("");
  const [turn, setTurn] = useState("O");
  const [winner, setWinner] = useState("");
  const [gameState, updateGameState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [AIThinking, setAIThinking] = useState();

  //handle click
  const handlePlay = (player, position) => {
    // if Player
    if (gameState[position[0]][position[1]] === "") {
      if (opponent === "Player") {
        playerAction(player, position);
        return;
        // if AI
      } else if (opponent === "AI") {
        aiAction(player, position);
        return;
      }
    }
  };

  // Player action
  const playerAction = (player, position) => {
    // If the opponent is a player and
    setTurn((curr) => {
      if (curr === "X") {
        return "O";
      } else {
        return "X";
      }
    });

    updateGameState((curr) => {
      curr[position[0]][position[1]] = player;
      // Check for a winner
      if (!gameEnded(curr)) {
        return curr;
      }
      return;
    });
  };

  // For the Ai Action we simply want to pass the game state to the minimax function and determine the best play AI can Make
  const aiAction = (player, position) => {
    // lets make ai the X player so this chain of events can only be called by O
    if (player === "O") {
      playerAction(player, position);
      // get best play for AI via minimax function
      setAIThinking(true);
      updateGameState((curr) => {
        let board =JSON.stringify(curr)
        let pred = miniMax(board);
        if (pred) curr[pred[0]][pred[1]] = "X";
        setAIThinking(false);
        setTurn("O");
        // Check for a winner
        if (!gameEnded(curr)) {
          return curr;
        }
      });
    }
    // return(miniMax)
  };

  // Minimax algorithm. Refer to https://en.wikipedia.org/wiki/Minimax for understanding of the code.
  // But Basically, for each option in a given state, we iteratively explore all options one can take in that rabbit hole until the game until the game is terminal/ended
  // As two sides are in opposition, We then compare the score and choose either the highest or lowest score depending on whether we want to minimize or maximize the score.
  // We however need to consider our opponents available moves so we choose the lowest or highest score available to them.
  function terminal(board) {
    //Returns True if game is over, False otherwise.
    //get number of available actions
    
    // To set the AI difficulty we will break the code below to make it easier for the human player
    // let cnt_empty = actions(board).length;

    let cnt_empty

    cnt_empty = actions(board).length;
    
    if (cnt_empty == 0) return true;
    else if (winnerState(board) != "") return true;
    else return false;
  }

  function actions(board) {
    let arr = [];
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (board[row][column] === "") arr.push([row, column]);
      }
    }
    return arr;
  }

  function utility(board) {
    // Returns 1 if O has won the game, -1 if X has won, 0 otherwise.
    if (winnerState(board) == "O"){
      return 1;
    } 
    else if (winnerState(board) == "X"){
      return -1;
    }
    else return 0;
  }

  // define max function
  function maxValue(state) {
    if (terminal(state)) return utility(state);

    let v = -1000000000000;
    actions(state).forEach((action) => {
      v = Math.max(v, minValue(result(state, action)));
    });
    return v;
  }

  // define min function
  function minValue(state) {
    if (terminal(state)) return utility(state);

    let v = 1000000000000;
    actions(state).forEach((action) => {
      v = Math.min(v, maxValue(result(state, action)));
    });
    return v;
  }


  const miniMax = (passed_state) => {
    let start_state = JSON.parse(passed_state)
    // Define helper functions min and max, terminal, utililty


    // Make unclicked copy of the game state
    // We don't want to modify the current game state
    let temp_board = [];
    temp_board = JSON.parse(JSON.stringify(start_state));

    // return none if these no space left on the board
    if (actions(temp_board).length == 0) {
      return null;
    } else {
      let turn = player(temp_board);
      if (turn == "O") {
        // Max
        let arr = {};
        actions(temp_board).forEach((action) => {
          arr[maxValue(result(temp_board, action))] = action;
        });
        // lets save the value as a dict since we only need one value per utility
        // choose the hightest value of the options from min
        return arr[Math.max(...Object.keys(arr))];
      } else if (turn == "X") {
        // Min
        let arr = {};
        actions(temp_board).forEach((action) => {
          arr[minValue(result(temp_board, action))] = action;
        });
        // choose the smallest value of the options from min
        return arr[Math.min(...Object.keys(arr))];
      }
    }
  };


  //Find Player from board State
  const player = (board) => {
    let count = 0;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (board[row][column] === "") count += 1;
      }
    }
    let turn = "";

    if (terminal(board)) turn = "O";
    else if (count % 2 == 0) turn = "X";
    else if (count % 2 != 0) turn = "O";

    return turn;
  };

  const result = (board, action) => {
    // Returns the board that results from making move (i, j) on the board.

    // A normal copy doesnt work well as it seems to create a reference; temp_board = board

    let temp_board = JSON.parse(JSON.stringify(board));

    let turn = player(temp_board);
    if (temp_board[action[0]][action[1]] === "") {
      temp_board[action[0]][action[1]] = turn;
      return temp_board;
    } else {
      return "Invalid Seclection";
    }
  };


  const winnerState = (state) => {
    for (let x = 0; x < 3; x++) {
      // Check horizontal
      if (
        state[0][x] === state[1][x] &&
        state[1][x] === state[2][x] &&
        state[2][x] !== ""
      ) {
        return state[2][x];
      }

      // Check Vertical
      if (
        state[x][0] === state[x][1] &&
        state[x][1] === state[x][2] &&
        state[x][2] !== ""
      ) {
        return state[x][2];
      }
    }

    //Check diagonals
    if (
      state[0][0] === state[1][1] &&
      state[1][1] === state[2][2] &&
      state[2][2] !== ""
    ) {
      return state[2][2];
    }
    if (
      state[0][2] === state[1][1] &&
      state[1][1] === state[2][0] &&
      state[2][0] !== ""
    ) {
      return state[2][0];
    }

    //Check all items to ensure there are open positions
    let found = false;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (state[x][y] === "") found = true;
      }
    }
    //If we did'nt find an empty space then there is now winner
    if (found === false) {
      return "No one";
    }

    // Game is not in terminal state
    return false;
  };

  // Game ended
  const gameEnded = (state) => {
    let winner = winnerState(state);
    if (winner) {
      setWinner(winner);
    }
  };

  // Game interface
  let GameInterface = () => {
    return (
      <GameContainer disableClick={AIThinking}>
        <div>
          <button onClick={() => handlePlay(turn, [0, 0])}>
            {gameState[0][0]}
          </button>
          <button onClick={() => handlePlay(turn, [0, 1])}>
            {gameState[0][1]}
          </button>
          <button onClick={() => handlePlay(turn, [0, 2])}>
            {gameState[0][2]}
          </button>
        </div>
        <div>
          <button onClick={() => handlePlay(turn, [1, 0])}>
            {gameState[1][0]}
          </button>
          <button onClick={() => handlePlay(turn, [1, 1])}>
            {gameState[1][1]}
          </button>
          <button onClick={() => handlePlay(turn, [1, 2])}>
            {gameState[1][2]}
          </button>
        </div>
        <div>
          <button onClick={() => handlePlay(turn, [2, 0])}>
            {gameState[2][0]}
          </button>
          <button onClick={() => handlePlay(turn, [2, 1])}>
            {gameState[2][1]}
          </button>
          <button onClick={() => handlePlay(turn, [2, 2])}>
            {gameState[2][2]}
          </button>
        </div>
      </GameContainer>
    );
  };

  // Panel
  const Panel = () => {
    return (
      <PanelDiv>
        {opponent === "" ? (
          <>
            <button onClick={() => setOpponent("Player")}>PvsP</button>
            <button onClick={() => setOpponent("AI")}>PvsAI</button>
          </>
        ) : (
          ""
        )}
        <h2>
          {opponent === ""
            ? "Choose you opponent for this game"
            : `Your opponent is ${opponent}, ready when you are`}
        </h2>
      </PanelDiv>
    );
  };

  // return the Main Game component
  return (
    <>
      <Panel />
      
      {opponent && (
        <MessageTurn>{AIThinking ? "AI is thinking" : "Your turn"}</MessageTurn>
      )}
      {winner === "" ? (
        <GameInterface disableClick={AIThinking} />
      ) : (
        <Message onClick={() => window.location.reload(false)}>
          {winner} is the winner! <br />
          Start Again
        </Message>
      )}
    </>
  );
};

export default TicTacToe;
