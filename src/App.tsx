import React from 'react';
import './App.scss';
import {Canvas} from "./index/Canvas";
import {Nav} from "./Nav";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Canvas/>
    </div>
  );
}

export default App;