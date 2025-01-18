import Player from "./components/Player/Player"
import GameBoard from "./components/GameBoard/GameBoard"
import { useState } from "react"
import Log from "./components/Log/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function derriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns[0]?.player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  
  const [players, setPlayers] = useState({ 
    'X': 'Player 1',
    'O': 'Player 2',
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(row => [...row])];

  let winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }

  }

  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  const resetGame = () => {
    setGameTurns([]);
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
      ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player onChangeName={handlePlayerNameChange} initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} />
        <Player onChangeName={handlePlayerNameChange} initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} />
      </ol>
      {(winner || hasDraw) && (<GameOver winner={winner} handleResetGame={resetGame}/>)}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>

    <Log gameTurns={gameTurns} />
  </main>
}

export default App
