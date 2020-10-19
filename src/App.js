import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from "./component/board/Game";


function App() {
  return (
    <div className="App">
      <Game boardSize={3} movesToWin={3}/>
    </div>
  );
}

export default App;
