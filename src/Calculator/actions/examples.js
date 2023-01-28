import { receiveExamples, requestExamples, errorReceiveExamples } from "../constants/actionTypes";


const getExamples = (count) => {
    return fetch(`http://localhost:8080/math/examples/?count=${count}`)
        .then(response => response.json())
        .then(res => res)
        .catch((e) => console.log('fetch error: ' + e))
};

const fetchExamples = ({ count }) => (dispatch) => {
    dispatch(requestExamples());
    return getExamples(count)
        .then(examples => dispatch(receiveExamples(examples)))
        .catch(() => dispatch(errorReceiveExamples()));
};

export default {
    fetchExamples,
};