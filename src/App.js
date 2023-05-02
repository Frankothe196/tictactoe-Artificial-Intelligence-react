import React, {useState} from 'react'
import {GameContainer,PanelDiv,Message} from './App.Styles.js'


const Tictactoe = () =>{
  // Todos 

  // Game state
  const [opponent,setOpponent] = useState('')
  const [turn,setTurn] = useState('X')
  const [winner,setWinner] = useState('')
  const [gameState,updateGameState] = useState([['','','',],['','',''],['','','']])
  const [AIThinking,setAIThinking] = useState()
  
  // Player action
  const playerAction = (player,position) =>{
    // unsure player is set and 
    if(opponent==='Player' && gameState[position[0]][position[1]]===""){
      setTurn(curr=>{
        if(curr==="X"){
          return("O")
        }else{
          return("X")
        }
      })

      updateGameState(curr=>{
        curr[position[0]][position[1]]=player
        // Check for a winner
        if(!gameEnded(curr)){
          return curr 
        }
      })

  }else if(opponent==="AI" && gameState[position[0]][position[1]]===""){
    // Todo
    // get best play for AI via minimax function
    if(player==='X'){
      setAIThinking(false)
    }else if(player==='O'){
      setAIThinking(true)
    }
  }
}

  // Game ended
  const gameEnded = (state) => {
    for(let x=0;x<3;x++){
      // Check horizontal
      if(state[0][x]===state[1][x]&&state[1][x]===state[2][x]&&state[2][x]!==""){
        setWinner(state[2][x])
        return(true)
      }

      // Check Vertical
      if(state[x][0]===state[x][1]&&state[x][1]===state[x][2]&&state[x][2]!==""){
        setWinner(state[x][2])  
        return(true)
      }
    }

    //Check diagonals
    if(state[0][0]===state[1][1]&&state[1][1]===state[2][2]&&state[2][2]!==""){
      setWinner(state[2][2])
      return(true)
    }
    if(state[0][2]===state[1][1]&&state[1][1]===state[2][0]&&state[2][0]!==""){
      setWinner(state[2][0])
      return(true)
    }

    //Check all items to ensure there are open positions
    let found = false
    for(let x=0;x<3;x++){
      for(let y=0;y<3;y++){
        if(state[x][y]==="")
          found=true
      } 
    }
    //If we didnt find an empyt space then there is now winner
    if(found===false){
      setWinner("No one")
      return(true)
    }

    // Game is not in terminal state
    return(false)
  }

  // Game interface
  let GameInterface = ()=>{
    return(
      <GameContainer disableClick={AIThinking}>
        <div><button onClick={()=>playerAction(turn,[0,0])}>{gameState[0][0]}</button><button onClick={()=>playerAction(turn,[0,1])}>{gameState[0][1]}</button><button onClick={()=>playerAction(turn,[0,2])}>{gameState[0][2]}</button></div>
        <div><button onClick={()=>playerAction(turn,[1,0])}>{gameState[1][0]}</button><button onClick={()=>playerAction(turn,[1,1])}>{gameState[1][1]}</button><button onClick={()=>playerAction(turn,[1,2])}>{gameState[1][2]}</button></div>
        <div><button onClick={()=>playerAction(turn,[2,0])}>{gameState[2][0]}</button><button onClick={()=>playerAction(turn,[2,1])}>{gameState[2][1]}</button><button onClick={()=>playerAction(turn,[2,2])}>{gameState[2][2]}</button></div>
      </GameContainer>
    ) 
  }

  // Panel
  const Panel = ()=>{
    return(
      <PanelDiv>
        {opponent===''?<>
        <button onClick={()=>setOpponent("Player")}>PvsP</button>
        <button onClick={()=>setOpponent("AI")}>PvsAI</button>
        </>:""}
        <h2>{opponent===''?"Choose you opponnent for this game":`Your opponent is ${opponent}, ready when you are`}</h2>
      </PanelDiv>
    )
  }

  // Minimax algorithm. Refer to https://en.wikipedia.org/wiki/Minimax for understanding of the code. 
  // But Basically, for each option in a given state, we iteratively explore all options one can take in that rabbit hole until the game until the game is terminal 
  // As two sides are in opposition, We then compare the score and choose either the highest or lowest score depedning on whether we want to minimize or maximize the score.
  // We however need to consider our opponents available moves so we choose the lowest or highest score available to them.
  
  const minimax = (state)=>{

  }

  // return the parent component
  return(
    <>  
      <Panel/>
      <h2>{AIThinking?'AI is thinking':'Your turn'}</h2>
      {winner===''?
      <GameInterface disableClick={AIThinking}/>:
      <Message onClick={() => window.location.reload(false)}>
        {winner} is the winner! <br/>
        Start Again
      </Message>  
      }
        
    </>)
  }

export default Tictactoe