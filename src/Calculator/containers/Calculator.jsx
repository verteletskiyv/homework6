import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CalcHistory from "../components/CalcHistory";
import GetButton from "../components/GetButton";
import CalcButton from "../components/CalcButton";
import CalcScreen from "../components/CalcScreen";
import HrTag from "../components/HrTag";
import calculateResult from "../util/calculations";
import getStateDetails from "../util/getStateDetails";
import examplesActions from "../actions/examples"

const style = {
    backgroundColor: '#3b3b3b',
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    margin: '0 auto',
    width: '280px',
    border: '#f5f5f5 1px solid',
    borderRadius: '10px',
    padding: '50px 10px 30px 10px',
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inp: '0',
            history: [],
        }
    }

    render() {
        return (
            <div style={style}>
                <CalcHistory history={this.state.history}/>
                <HrTag/>
                <CalcScreen
                    currentField={this.state.inp}
                    onChange={e => this.setState({inp: e.target.value})}
                />
                <CalcButton
                    onDigitClick={this.handleDigitClick}
                    onSignClick={this.handleSignClick}
                />
                <GetButton onClick={this.handleGetClick} />
            </div>
        );
    }

    componentDidMount() {
        const { actionFetchExamples, } = this.props;
        actionFetchExamples({
            count: 5,
        });
    }

    evaluateRes = (btn) => {
        if (this.state.history.length > 8)
            this.setState(() => this.state.history.shift());

        let currState = this.state.inp;
        let res = calculateResult(currState.toString());

        if (btn === '+' || btn === '-' || btn === '*' || btn === '/') {
            this.setState(() => this.state.history.push(currState + ' = ' + res));
            this.setState({inp: res + ` ${btn} `});
        } else if (btn === '=') {
            this.setState(() => this.state.history.push(currState + ' = ' + res));
            this.setState({inp: res});
        } else
            this.setState(() => this.state.history.push('Unknown operation'));
    }

    handleDigitClick = (value) => {
        let currState = this.state.inp.toString();
        if (currState === '0') {
            this.setState({inp: currState.replace('0', value)});
        } else {
            this.setState({inp: currState + value.toString()});
        }
    }

    handleSignClick = (value) => {
        let currState = this.state.inp.toString();
        let {isLastANum, containsSign} = getStateDetails(currState);

        if (value === 'C') {
            if (currState.length < 2) {
                this.setState({inp: '0'});
            } else {
                isLastANum
                    ? this.setState({inp: currState.slice(0, -1)})
                    : this.setState({inp: currState.slice(0, -3)});
            }
        } else if (value === '=') {
            if (containsSign && isLastANum) {
                try {
                    this.evaluateRes('=');
                } catch (e) {
                    this.setState(() => this.state.history.push(currState + ' = ' + e.toString()));
                }
            }
        } else {
            if (containsSign && !isLastANum) {
                this.setState({inp: currState.slice(0, -3) + ` ${value} `})
            } else if (containsSign && isLastANum) {
                try {
                    this.evaluateRes(value);
                } catch (e) {
                    this.setState(() => this.state.history.push(currState + ' = ' + e.toString()));
                }
            } else {
                this.setState({inp: currState + ` ${value} `});
            }
        }
    }

    handleGetClick = () => {
        const {examples, actionFetchExamples,} = this.props;
        actionFetchExamples({
            count: 5,
        });
        let res = [];
        examples.list.forEach(x => {
            try {
                res.push(x + ' = ' + calculateResult(x));
            } catch (e) {
                res.push(x + ' = ' + e)
            }
        });

        res.map(x => this.setState(() => {
            if (this.state.history.length < 8) {
                this.state.history.push(x);
            } else {
                this.state.history.shift();
                this.state.history.push(x);
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

    return ({
        actionFetchExamples: fetchExamples,
    });
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Calculator);