export default function GameOver({ winner, handleResetGame }) {
    return <div id="game-over">
        <h2>Game over!</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It's a draw</p>}
        <button onClick={handleResetGame}>Rematch!</button>
    </div>
}