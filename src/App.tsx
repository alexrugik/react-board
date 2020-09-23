import React from 'react';
import './App.css';
import { Board, BoardSettings } from './shared/board/board';

function App() {
  const boardSettings: BoardSettings = {
    width: 400,
    height: 400
  };

  return (
    <div className="App">
      <Board
        settings={boardSettings}>
      </Board>
    </div>
  );
}

export default App;
