import React from "react";
import Square from "./Square";

function Board({squares, onClick, highlight, width, height}) {


    const renderSquare = (i, isHighlight) => {
        return <Square value={squares[i]}
                       onClick={() => onClick(i)}
                       highlight={isHighlight}
                       key={i}/>;
    }


    const renderBoard = () => {

        const lines = [];

        for (let i = 0; i < height; i++) {

            const currLine = [];
            for (let j = 0; j < width; j++) {
                let index = i * width + j;
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
