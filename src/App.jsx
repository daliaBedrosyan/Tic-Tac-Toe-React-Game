import Player from "./components/Player/Player"
import GameBoard from "./components/GameBoard/GameBoard"
import { useState } from "react"
import Log from "./components/Log/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
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

function derriveGameBoard (gameTurns) {

  let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  };

  return gameBoard;
}

function derriveWinner (gameBoard, players) {
  
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    };
  };

  return winner;
}

function App() {
  
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derriveActivePlayer(gameTurns);
  const gameBoard = derriveGameBoard(gameTurns);
  const winner = derriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

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
        <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} />
        <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} />
      </ol>
      {(winner || hasDraw) && (<GameOver winner={winner} handleResetGame={resetGame}/>)}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>

    <Log gameTurns={gameTurns} />
  </main>
}

export default App
