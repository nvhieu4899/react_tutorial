import React from "react";
import Square from "./Square";

function Board({squares, onClick, highlight, boardSize}) {


  const renderSquare = (i, isHighlight) => {
    return <Square value={squares[i]}
                   onClick={() => onClick(i)}
                   highlight={isHighlight}
                   key={i}/>;
  }


  const renderBoard = () => {
    const lines = [];
    for (let i = 0; i < boardSize; i++) {
      const currLine = [];
      for (let j = 0; j < boardSize; j++) {
        let index = i * boardSize + j;
        let isHighlight = highlight.includes(index);
        currLine.push(renderSquare(index, isHighlight));
      }
      lines.push(<div key={i}>{currLine}</div>);
    }
    return lines;
  }
  return (
    <div>
      {renderBoard()}
    </div>
  );

}

export default Board;
