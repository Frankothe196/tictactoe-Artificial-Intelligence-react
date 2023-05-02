import styled from 'styled-components'

export const GameContainer = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: red;
  border: 1px solid red;
  pointer-events: ${props=>props.disableClick?'none':'all'};

  div{
    display: flex;
    flex-direction: row;
    button{
      font-size: 10vh;
      height: 20vh;
      width: 20vh;
      border: none;
      margin: 1px;
      padding: 0;
      overflow: hidden;
      cursor: pointer;
    }
  }

`
 
export const PanelDiv = styled.div`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;

  button{
    font-size: 2rem;
    margin: 20px;
    width: 220px;
  }
  h2{
    position: fixed;
    top: -30px;
    transform: translateX(-50%);
    left: 50%;
    white-space: nowrap;
    text-align: center;
    color: black;
  }
`

export const Message = styled.button`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: auto;
  height: auto;
  color: black;
  background: none;
  border: none;
  text-align: center;
  cursor: pointer;
  font-size: 5rem;
  z-index: 10;
`