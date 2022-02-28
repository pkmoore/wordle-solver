import React from 'react';
import './App.css';
import LetterRow from './components/letterrow';
import Possibilities from './components/possibilities';

function App() {
  return (
      <React.Fragment>
      <h1>Top</h1>
      <div><LetterRow /></div>
      <div><Possibilities /></div>
      <h1>Bottom</h1>
      </React.Fragment>
  );
}

export default App;
