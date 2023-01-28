const splitMaths = (math) => {
    const splitMath = math.split(/([*/]|\b\s*-|\b\s*\+)/g);
    const a = Number(splitMath.at(0));
    const b = Number(splitMath.at(splitMath.length - 1));
    const operation = splitMath.at(1).trim();

    return {
        a: a,
        b: b,
        operation: operation
    }
}

export default splitMaths;