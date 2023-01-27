const calculateResult = math => {
    let splitMath = math.split(/([*/]|\b\s*-|\b\s*\+)/g);
    const a = Number(splitMath.at(0));
    const b = Number(splitMath.at(splitMath.length - 1));
    const o = splitMath.at(1).trim();

    switch (o) {
        case '+':
            return (a + b) % 1 === 0
                ? (a + b).toString()
                : (a + b).toFixed(1).toString()
        case '-':
            return (a - b) % 1 === 0
                ? (a - b).toString()
                : (a - b).toFixed(1).toString();
        case '/':
            if (b === 0)
                throw Error("division by zero!");
            return (a / b) % 1 === 0
                ? (a / b).toString()
                : (a / b).toFixed(1).toString();
        case '*':
            return (a * b) % 1 === 0
                ? (a * b).toString()
                : (a * b).toFixed(1).toString();
        default:
            throw Error("Unknown operation");
    }
};

export default calculateResult;