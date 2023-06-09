import { CommonCalculator, PolynomialCalculator } from "../../modules/Calculator";

const useCalculator = (refA, refB, refC, calculatorType) => {
    const calc = (calculatorType == "Common") ? new CommonCalculator() : new PolynomialCalculator();

    return (
        (operand) => {
            if (refA && refB && refC) {

                const A = refA.current.value;
                const B = refB.current.value;

                console.log(calc, operand)

                refC.current.value = calc[operand](
                    calc.getEntity(A),
                    calc.getEntity(B)
                ).toString() || "0";
            }
        }
    );
}

export default useCalculator;