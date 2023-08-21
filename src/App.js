import React, { useState } from "react";
import { GameContainer, PanelDiv, Message, MessageTurn } from "./App.Styles.js";

const Tictactoe = () => {
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
  const handlePlay = (player,position) => {
    // if Player
    if(opponent==="Player"){
      playerAction(player,position)
    // if AI
    }else if(opponent==="AI"){
      aiAction(player,position)
    }
    return
  }

  // Player action
  const playerAction = (player, position) => {
    // If the opponent is a player and 
    if (gameState[position[0]][position[1]] === "") {
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
        return
      });
  };
    return
  }


  // Minimax algorithm. Refer to https://en.wikipedia.org/wiki/Minimax for understanding of the code.
  // But Basically, for each option in a given state, we iteratively explore all options one can take in that rabbit hole until the game until the game is terminal/ended
  // As two sides are in opposition, We then compare the score and choose either the highest or lowest score depedning on whether we want to minimize or maximize the score.
  // We however need to consider our opponents available moves so we choose the lowest or highest score available to them.
  const miniMax = () => {
    // TODOS
    
    // Make unlicked copy of the game state

    //get possible actions
    
    //loop over till game over

    // select and return the best possible play
    
    return([1,1])
  };

  //For the Ai Action we simply want to pass the game state to the minimax function and determine the best play AI can Mae
  // Not well have to play right after the player, and return their turn
  const aiAction = (player,position) =>{
   //lets make ai the X player so this chain of events canonly be called by O
   if (player==="O") {
    playerAction(player,position)
    // get best play for AI via minimax function
    setAIThinking(true);
    updateGameState((curr) => {
      let pred = miniMax()
      curr[pred[0]][pred[1]] = "X"
      setAIThinking(false)
      setTurn("O")
      // Check for a winner
      if (!gameEnded(curr)) {
        return curr;
      }
    });
    }
    // return(miniMax)
  }
 


  // Game ended
  const gameEnded = (state) => {
    for (let x = 0; x < 3; x++) {
      // Check horizontal
      if (
        state[0][x] === state[1][x] &&
        state[1][x] === state[2][x] &&
        state[2][x] !== ""
      ) {
        setWinner(state[2][x]);
        return true;
      }

      // Check Vertical
      if (
        state[x][0] === state[x][1] &&
        state[x][1] === state[x][2] &&
        state[x][2] !== ""
      ) {
        setWinner(state[x][2]);
        return true;
      }
    }

    //Check diagonals
    if (
      state[0][0] === state[1][1] &&
      state[1][1] === state[2][2] &&
      state[2][2] !== ""
    ) {
      setWinner(state[2][2]);
      return true;
    }
    if (
      state[0][2] === state[1][1] &&
      state[1][1] === state[2][0] &&
      state[2][0] !== ""
    ) {
      setWinner(state[2][0]);
      return true;
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
      setWinner("No one");
      return true;
    }

    // Game is not in terminal state
    return false;
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

  // return the parent component
  return (
    <>
      <Panel />
      {opponent&&
        <MessageTurn>{AIThinking ? "AI is thinking" : "Your turn"}</MessageTurn>
      }
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

export default Tictactoe;
