const getStateDetails = (state) => {
    const containsSign = state.toString().startsWith('-')
        ? state.toString()
            .substring(1, state.length)
            .split('')
            .find(s => ['+', '-', '*', '/'].includes(s))
        : state.toString()
            .split('')
            .find(s => ['+', '-', '*', '/'].includes(s));

    const isLastANum = state.toString().at(state.length - 1) !== ' '
        && typeof Number(state.toString().at(state.length - 1)) === 'number';

    return {
        isLastANum: isLastANum,
        containsSign: containsSign,
    }
}

export default getStateDetails;