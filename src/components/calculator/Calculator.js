import React, { useState, useRef } from "react";

import useCalculator from "../hooks/useCalculator";

const Calculator = () => {

    const [calculatorType, setCalculatorType] = useState("Common");

    const refA = useRef(null);
    const refB = useRef(null);
    const refC = useRef(null);

    const calculator = useCalculator(refA, refB, refC, calculatorType);

    const typeToggleHandler = () => {
        setCalculatorType(calculatorType === "Common" ? "Polynomial" : "Common");
    }

    return (
        <div className="calculator">
            <button className="calculator-type-toggle" onClick={typeToggleHandler}> {calculatorType} </button>
            <p>Калькулятор</p>
            <textarea className="calculator-textarea" placeholder="поле A" ref={refA} />
            <textarea className="calculator-textarea" placeholder="поле B" ref={refB} />
            {calculatorType === "Common" ? 
            <div className="common-operand-wrapper">
                <button className="calculator-operand" onClick={() => calculator('add')}>A+B</button>
                <button className="calculator-operand" onClick={() => calculator('sub')}>A-B</button>
                <button className="calculator-operand" onClick={() => calculator('mult')}>A*B</button>
                <button className="calculator-operand" onClick={() => calculator('prod')}>A**B</button>
                <button className="calculator-operand" onClick={() => calculator('div')}>A/B</button>
                <button className="calculator-operand" onClick={() => calculator('pow')}>A^B</button>
            </div> :
            calculatorType === "Polynomial" ? 
            <div className="polynomial-operand-wrapper">
                <button className="calculator-operand" onClick={() => calculator('add')}>A+B</button>
                <button className="calculator-operand" onClick={() => calculator('sub')}>A-B</button>
                <button className="calculator-operand" onClick={() => calculator('mult')}>A*B</button>
                <button className="calculator-operand" onClick={() => calculator('calcAt')}>A(B)</button>
                
            </div> : 
            <></>}
            <textarea className="calculator-textarea" placeholder="поле C" ref={refC} />
        </div>
    );
}

export default Calculator;