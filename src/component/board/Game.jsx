import React, {useState} from "react";
import Board from "./Board";


export default function Game({boardSize, movesToWin}) {
  const TOTAL_SQUARE = boardSize * boardSize;

  const [history, setHistory] = useState([{squares: Array(TOTAL_SQUARE).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameInfo, setGameInfo] = useState([]);
  const [stepNumber, setStepNumber] = useState(0);
  const [reverseMove, setReverseMove] = useState(false);

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const replay = () => {
    setHistory([{squares: Array(TOTAL_SQUARE).fill(null)}]);
    setXIsNext(true);
    setGameInfo([]);
    setStepNumber(0);
  }


  const toggleSortMoves = () => {
    setReverseMove(!reverseMove);
  }

  const handleClick = (i) => {
    const gameInfoTemp = gameInfo.slice(0, stepNumber + 1);
    const historyTemp = history.slice(0, stepNumber + 1);
    const current = historyTemp[historyTemp.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares, boardSize, movesToWin) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    const newMoveCol = i % boardSize + 1;
    const newMoveRow = Math.floor(i / boardSize) + 1;
    let newMove = `${squares[i]} moves (${newMoveCol},${newMoveRow})`;
    setHistory(historyTemp.concat([{squares: squares}]));
    setXIsNext(!xIsNext);
    setGameInfo(gameInfoTemp.concat([newMove]));
    setStepNumber(historyTemp.length);
  };

  const current = history[stepNumber];
  let hasWinner = calculateWinner(current.squares, boardSize, movesToWin);
  let status;

  let winner;
  let highlight = [];

  if (hasWinner) {
    winner = hasWinner.winner;
    highlight = hasWinner.highlight;
    status = <span className={"h2 text-warning"}>{'Winner: ' + winner}</span>;
  } else {
    status = <span className="h3">{'Next player: ' + (xIsNext ? 'X' : 'O')}</span>;
  }

  if (!hasWinner && stepNumber === TOTAL_SQUARE) {
    status = <span className={"h2 text-secondary"}>Deuce</span>;
  }

  let move = history.map((step, index) => {
    const desc = index ? `#${index} ${gameInfo[index - 1]}` : 'Go to start';
    return (<li key={index}>
      <button
        className={"btn btn-info" + (index === stepNumber ? " font-weight-bolder" : undefined)}
        onClick={() => jumpTo(index)}>
        {desc}
      </button>
    </li>);
  });

  if (reverseMove) {
    move = move.reverse();
  }

  return (<div className="container">
      <div className="row">
        <div className="col col-md-6">
          <h1>Tic tac toe</h1>
          <div className="float-left">
            <Board
              squares={current.squares}
              onClick={i => handleClick(i)}
              boardSize={boardSize}
              highlight={highlight}
            />
            <button className="btn btn-outline-primary mt-5" onClick={() => replay()}>Rematch
            </button>
          </div>
          <div className="float-right">

            <div className="status">{status}</div>
            <div>Game info</div>
            <button
              className="btn btn-secondary"
              onClick={() => toggleSortMoves()}>{reverseMove ? "Sort moves ascending" : "Sort moves descending"}</button>
            <ul>
              {move}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares, boardSize, movesToWin) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];


  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        highlight: lines[i]
      };
    }
  }
  return null;
}
