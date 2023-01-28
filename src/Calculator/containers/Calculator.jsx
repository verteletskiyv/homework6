import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import examplesActions from "../actions/examples"
import CalcHistory from "../components/CalcHistory";
import GetButton from "../components/GetButton";
import CalcButton from "../components/CalcButton";
import CalcScreen from "../components/CalcScreen";
import HrTag from "../components/HrTag";
import evalExample from "../util/evalExample";
import getStateDetails from "../util/getStateDetails";
import splitMath from "../util/splitMath";


const style = {
    backgroundColor: '#3b3b3b',
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    width: '280px',
    padding: '50px 10px 30px 10px',
    margin: '0 auto',
    border: '#f5f5f5 1px solid',
    borderRadius: '10px',
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: '0',
            history: [],
        }
    }

    componentDidMount() {
        const { actionFetchExamples } = this.props;
        actionFetchExamples({ count: 5 });
    }

    render() {
        return (
            <div style={style}>
                <CalcHistory history={this.state.history} />
                <HrTag />
                <CalcScreen
                    currentField={this.state.screen}
                    onChange={e => this.setState({screen: e.target.value})}
                />
                <CalcButton
                    onDigitClick={this.handleDigitClick}
                    onSignClick={this.handleSignClick}
                />
                <GetButton onClick={this.handleGetClick} />
            </div>
        );
    }

    handleDigitClick = (value) => {
        let currState = this.state.screen.toString();
        const { containsSign, isLastANum } = getStateDetails(currState);

        currState === '0'
            ? this.setState({screen: currState.replace('0', value)})
            : this.setState({screen: currState + value.toString()});

        if (containsSign && isLastANum) {
            let { b } = splitMath(currState);
            if (b === 0)
                this.setState({screen: currState.slice(0, -1) + value.toString()});
        }
    }

    handleSignClick = (value) => {
        let currState = this.state.screen.toString();
        let currHistory = this.state.history;
        const {isLastANum, containsSign} = getStateDetails(currState);

        if (value === 'C') {
            if (currState.length < 2) {
                this.setState({screen: '0'});
            } else {
                isLastANum
                    ? this.setState({screen: currState.slice(0, -1)})
                    : this.setState({screen: currState.slice(0, -3)});
            }
        } else if (value === '=') {
            if (containsSign && isLastANum) {
                try {
                    this.calculateWithBtn('=');
                } catch (e) {
                    this.setState(() => currHistory.push(currState + ' = ' + e.toString()));
                }
            }
        } else {
            if (containsSign && !isLastANum) {
                this.setState({screen: currState.slice(0, -3) + ` ${value} `})
            } else if (containsSign && isLastANum) {
                try {
                    this.calculateWithBtn(value);
                } catch (e) {
                    this.setState(() => currHistory.push(currState + ' = ' + e.toString()));
                }
            } else {
                this.setState({screen: currState + ` ${value} `});
            }
        }
    }

    calculateWithBtn = (btn) => {
        let currHistory = this.state.history;
        let currState = this.state.screen.toString();
        let res = evalExample(currState);
        if (currHistory.length > 8)
            this.setState(() => currHistory.shift());

        if (btn === '+' || btn === '-' || btn === '*' || btn === '/') {
            this.setState(() => currHistory.push(currState + ' = ' + res));
            this.setState({screen: res + ` ${btn} `});
        } else if (btn === '=') {
            this.setState(() => currHistory.push(currState + ' = ' + res));
            this.setState({screen: res});
        } else
            this.setState(() => currHistory.push('Unknown operation'));
    }

    handleGetClick = () => {
        const { examples, actionFetchExamples } = this.props;
        let res = [];
        let currHistory = this.state.history;
        actionFetchExamples({ count: 5 });
        examples.list.forEach(x => {
            try {
                res.push(x + ' = ' + evalExample(x));
            } catch (e) {
                res.push(x + ' = ' + e)
            }
        });

        res.map(x => this.setState(() => {
            if (currHistory.length < 8) {
                currHistory.push(x);
            } else {
                currHistory.shift();
                currHistory.push(x);
            }
        }));
    }
}

const mapReduxStateToProps = reduxState => ({
    ...reduxState
});

const mapDispatchToProps = dispatch => {
    const {
        fetchExamples,
    } = bindActionCreators(examplesActions, dispatch);
    return ({ actionFetchExamples: fetchExamples, });
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Calculator);