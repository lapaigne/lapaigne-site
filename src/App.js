import logo from './logo.svg';
import './App.css';

import Header from "./components/Header/Header";
import Graph3D from "./components/Graph3D/Graph3D";
import Calculator from "./components/Calculator/Calculator"

import { useState } from 'react';

function App() {
    const [showComponent, setShowComponent] = useState('Graph3D');

    return (
        <div className="App">
            <Header showComponent={setShowComponent} />
        {
            showComponent === 'Calculator' ? <Calculator /> :
            showComponent === 'Graph3D' ? <Graph3D /> : <></>
        }            
        </div>
    );
}

export default App;
