const receiveExamples = examples => ({
    examples,
    type: 'RECEIVE_EXAMPLES'
});

const requestExamples = () => ({
    type: 'REQUEST_EXAMPLES'
});

const errorReceiveExamples = () => ({
    type: 'ERROR_RECEIVE_EXAMPLES'
});

const getExamples = (count) => {
    return fetch(`http://localhost:8080/math/examples/?count=${count}`)
        .then(response => response.json())
        .then(res => res)
        .catch((e) => console.log('fetch error: ' + e))
}

const fetchExamples = ({ count }) => (dispatch) => {
    dispatch(requestExamples());
    return getExamples(count)
        .then(examples => dispatch(receiveExamples(examples)))
        .catch(() => dispatch(errorReceiveExamples()));
};

export default { fetchExamples, };