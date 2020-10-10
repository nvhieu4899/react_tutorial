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
            stepNumber: 0,
            reverseMove: false
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

        const currState = this.state;

        this.setState({
            ...this.state,
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    replay() {
        this.setState({
            ...this.state,
            history: [{squares: Array(9).fill(null)}],
            xIsNext: true,
            gameInfo: [],
            stepNumber: 0,
        });
    }


    toggleSortMoves() {
        this.setState(
            {
                ...this.state,
                reverseMove: !this.state.reverseMove
            }
        )
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const hasWinner = this.calculateWinner(current.squares);
        let status;
        let winner;
        let highlight = [];

        if (hasWinner) {
            winner = hasWinner.winner;
            highlight = hasWinner.highlight;
            status = <span className={"h2 text-warning"}>{'Winner: ' + winner}</span>;
        } else {
            status = <span className="h3">{'Next player: ' + (this.state.xIsNext ? 'X' : 'O')}</span>;
        }

        if (!hasWinner && this.state.stepNumber === 9) {
            status = <span className={"h2 text-secondary"}>Deuce</span>;
        }

        let move = history.map((step, index) => {
            const desc = index ? `Go to move #${index}` : 'Go to start';
            return (<li key={index}>
                <button
                    className={"btn btn-info" + (index === this.state.stepNumber ? " font-weight-bolder" : undefined)}
                    onClick={() => this.jumpTo(index)}>
                    {desc}
                </button>
            </li>);
        });

        if (this.state.reverseMove) {
            move = move.reverse();
        }


        return (
            <div className="container">
                <div className="row">
                    <div className="col col-md-4">
                        <h1>Tic tac toe</h1>
                        <div className="float-left">
                            <Board
                                squares={current.squares}
                                onClick={(i) => this.handleClick(i)}
                                width={3}
                                height={3}
                                highlight={highlight}
                            />
                            <button className="btn btn-outline-primary mt-5" onClick={() => this.replay()}>Rematch
                            </button>
                        </div>
                        <div className="float-right">

                            <div className="status">{status}</div>
                            <div>Game info</div>
                            <button
                                className="btn btn-secondary"
                                onClick={() => this.toggleSortMoves()}>{this.state.reverseMove ? "Sort moves ascending" : "Sort moves descending"}</button>

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
