import React from "react";

const Header = ({ showComponent }) => {
    return (
        <div className="header">
            <button onClick={()=>showComponent('Calculator')}>Калькулятор</button>
            <button onClick={()=>showComponent('Graph3D')}>3д графоний</button>
            <button onClick={()=>showComponent('Graph2D')}>2д графня</button>
        </div>
    );
}

export default Header;