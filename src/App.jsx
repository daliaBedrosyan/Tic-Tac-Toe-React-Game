import Player from "./components/Player/Player"
import GameBoard from "./components/GameBoard/GameBoard"
import { useState } from "react"
import Log from "./components/Log/Log";

function App() {

  const [gameTurns, setGameturns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');
  

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currentPlayer) => (currentPlayer === 'X' ? 'O' : 'X'));
    setGameturns((prevTurns) => {
      let currentPlayer = 'X';

      if (prevTurns[0]?.player === 'X') {
        currentPlayer = 'O';
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, 
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} />
        <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} />
      </ol>

      <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
    </div>

    <Log gameTurns={gameTurns}/>
  </main>
}

export default App
