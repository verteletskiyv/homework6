import React from "react";
import { withStyles } from "@material-ui/core";
import CalcHistory from "../components/CalcHistory";
import GetButton from "../components/GetButton";
import CalcButton from "../components/CalcButton";
import CalcScreen from "../components/CalcScreen";
import calculateResult from "../util/calculations";
import getStateDetails from "../util/getStateDetails";


const styles = () => ({
    container: {
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        margin: '0 auto',
        width: '280px',
        border: '#f5f5f5 1px solid',
        borderRadius: '20px',
        padding: '60px 10px 25px 10px',
    },
    hr: {
        width: '80%',
        margin: 'auto',
        marginTop: '5px'
    },
});

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inp: '0',
            history: [],
        }
    }

    evaluateRes = (btn) => {
        if (this.state.history.length > 8)
            this.setState(() => this.state.history.shift())

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
        } else
            this.setState({inp: currState + value.toString()});
    }

    handleSignClick = (value) => {
        let currState = this.state.inp.toString();
        let { isLastANum, containsSign } = getStateDetails(currState);

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
                        this.setState(() => this.state.history.push(currState + ' = ' +e.toString()));
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

    render() {
        const {container, hr} = this.props.classes;
        return (
            <div className={container}>
                <CalcHistory history={this.state.history} />
                <hr size="1" color="#5F5F5F" className={hr} />
                <CalcScreen
                    currentField={this.state.inp}
                    onChange={e => this.setState({inp: e.target.value})}
                />
                <CalcButton
                    onDigitClick={this.handleDigitClick}
                    onSignClick={this.handleSignClick}
                />
                <GetButton />
            </div>
        );
    }
}

export default withStyles(styles)(Calculator);