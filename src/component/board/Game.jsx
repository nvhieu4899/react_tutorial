import React from "react";
import Board from "./Board";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            gameInfo: [],
            stepNumber: 0
        };
    }

    calculateWinner(squares) {
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


    handleClick(i) {
        const gameInfo = this.state.gameInfo.slice(0, this.state.stepNumber + 1);

        const history = this.state.history.slice(0, this.state.stepNumber + 1);


        const current = history[history.length - 1];
        const squares = current.squares.slice();


        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        let newMove = `${squares[i]} moves ${i}`;


        this.setState(
            {
                history: history.concat([{squares: squares}]),
                xIsNext: !this.state.xIsNext,
                gameInfo: gameInfo.concat([newMove]),
                stepNumber: history.length
            }
        );
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    replay() {
        this.setState({
            history: [{squares: Array(9).fill(null)}],
            xIsNext: true,
            gameInfo: [],
            stepNumber: 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const hasWinner = this.calculateWinner(current.squares);
        let status;

        if (hasWinner) {
            const {winner, highlight} = hasWinner;
            status = 'Winner: ' + winner;
            const [a, b, c] = highlight;

        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        if (!hasWinner && history.length > 9) {
            status = 'Deuce';
        }

        const move = history.map((step, index) => {
            const desc = index ? `Go to move #${index}` : 'Go to start';
            return (<li key={index}>
                <button className="btn btn-info" onClick={() => this.jumpTo(index)}>
                    {desc}
                </button>
            </li>);
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col col-md-4">
                        <h1>Tic tac toe</h1>
                        <div className="float-left">
                            <Board
                                squares={current.squares}
                                onClick={(i) => this.handleClick(i)}
                            />
                            <button className="btn btn-outline-primary mt-5" onClick={() => this.replay()}>Rematch
                            </button>
                        </div>
                        <div className="float-right">
                            <div className="status">{status}</div>
                            <div>Game info</div>
                            <ol>
                                {move}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )


    }
}

export default Game;
