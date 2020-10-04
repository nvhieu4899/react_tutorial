import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Board from './component/board/Board';

function App() {
    return (
        <div className="App container">
            <h1>Tic tac toe</h1>
            <Board/>
        </div>
    );
}

export default App;
