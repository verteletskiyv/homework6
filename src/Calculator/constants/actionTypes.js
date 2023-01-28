export const receiveExamples = examples => ({
    examples,
    type: 'RECEIVE_EXAMPLES'
});

export const requestExamples = () => ({
    type: 'REQUEST_EXAMPLES'
});

export const errorReceiveExamples = () => ({
    type: 'ERROR_RECEIVE_EXAMPLES'
});