import React, { useState } from "react";

import { useRef } from "react";

import CommonCalculator from "../../modules/Calculator/CommonCalculator";
import PolynomialCalculator from "../../modules/Calculator/PolynomialCalculator";

const Calculator = () => {

    const [calculatorType, setCalculatorType] = useState("Common");

    const refA = useRef(null);
    const refB = useRef(null);
    const refC = useRef(null);

    // const common =

    const operandHandler = (operand) => {
        if (refA, refB, refC) {
            const A = refA.current.value;
            const B = refB.current.value;
        }
    }

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
                <button className="calculator-operand">A+B</button>
                <button className="calculator-operand">A-B</button>
                <button className="calculator-operand">A*B</button>
                <button className="calculator-operand">A**B</button>
                <button className="calculator-operand">A/B</button>
                <button className="calculator-operand">A^B</button>
            </div> :
            calculatorType === "Polynomial" ? 
            <div className="common-operand-wrapper">

            </div> : 
            <></>}
            <textarea className="calculator-textarea" placeholder="поле C" ref={refC} />
        </div>
    );
}

export default Calculator;