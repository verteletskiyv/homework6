import splitMaths from "./splitMath";


const evalExample = (math) => {
    const {a, b, operation} = splitMaths(math);
    switch (operation) {
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
                return "Error division by zero!";
            return (a / b) % 1 === 0
                ? Math.trunc(a / b).toString()
                : (a / b).toFixed(1).toString();
        case '*':
            return (a * b) % 1 === 0
                ? (a * b).toString()
                : (a * b).toFixed(1).toString();
        default:
            return "Error unknown operation";
    }
};

export default evalExample;