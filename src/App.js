import logo from './logo.svg';
import './App.css';

import Header from './components/header/Header';
import Calculator from './components/calculator/Calculator';
import Graph2D from './components/graph2d/Graph2D';
import Graph3D from './components/graph3d/Graph3D';
import { useState } from 'react';

function App() {
    const [showComponent, showComponentHandler] = useState('Graph3D');

    return (
        <div className="App">
            <Header showComponent={showComponentHandler} />
        {
            showComponent === 'Calculator' ? <Calculator /> :
            showComponent === 'Graph2D' ? <Graph2D /> :
            showComponent === 'Graph3D' ? <Graph3D /> : <></>
        }            
        </div>
    );
}

export default App;
