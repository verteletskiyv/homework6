import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import examplesActions from "../actions/examples"
import CalcHistory from "../components/CalcHistory";
import GetButton from "../components/GetButton";
import CalcButton from "../components/CalcButton";
import CalcScreen from "../components/CalcScreen";
import CalcWrapper from "../components/CalcWrapper"
import evalExample from "../util/evalExample";
import getStateDetails from "../util/getStateDetails";
import splitMath from "../util/splitMath";


class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: '0',
            history: [],
        }
    }

    componentDidMount() {
        const {actionFetchExamples} = this.props;
        actionFetchExamples({count: 5});
    }

    render() {
        return (
            <CalcWrapper>
                <CalcHistory history={this.state.history}/>
                <CalcScreen
                    currentField={this.state.screen}
                    onChange={e => this.setState({screen: e.target.value})}
                />
                <CalcButton
                    onDigitClick={this.handleDigitClick}
                    onSignClick={this.handleSignClick}
                />
                <GetButton onClick={this.handleGetClick}/>
            </CalcWrapper>
        );
    }

    handleDigitClick = (value) => {
        let screen = String(this.state.screen);
        const {containsSign, isLastANum} = getStateDetails(screen);
        screen === '0'
            ? this.setState({screen: screen.replace('0', value)})
            : this.setState({screen: screen + String(value)});
        if (containsSign && isLastANum) {
            let {b} = splitMath(screen);
            if (b === 0)
                this.setState({screen: screen.slice(0, -1) + String(value)});
        }
    }

    handleSignClick = (value) => {
        let screen = this.state.screen.toString();
        const {isLastANum, containsSign} = getStateDetails(screen);
        if (value === '=') {
            if (containsSign && isLastANum)
                this.updateHistory('=');
        } else if (value === 'C') {
            if (screen.length < 2)
                this.setState({screen: '0'});
            else isLastANum
                    ? this.setState({screen: screen.slice(0, -1)})
                    : this.setState({screen: screen.slice(0, -3)});
        } else {
            if (containsSign && isLastANum)
                this.updateHistory(value);
            else if (containsSign && !isLastANum)
                this.setState({screen: screen.slice(0, -3) + ` ${value} `});
            else
                this.setState({screen: screen + ` ${value} `});
        }
    }

    updateHistory = (btn) => {
        let history = this.state.history;
        let screen = String(this.state.screen);
        let res = evalExample(screen);
        if (history.length > 8)
            this.setState(() => history.shift());

        this.setState(() => history.push(screen + ' = ' + res));
        if (!(/\d/.test(res)))
            this.setState({screen: screen.slice(0, -1)});
        else if (btn === '=')
            this.setState({screen: res});
        else
            this.setState({screen: res + ` ${btn} `});
    }

    handleGetClick = () => {
        const {examples, actionFetchExamples} = this.props;
        let history = this.state.history;
        const res = [];
        actionFetchExamples({count: 5});
        examples.list.forEach(x => res.push(x + ' = ' + evalExample(x)));
        res.map(x => this.setState(() => {
            if (history.length < 8) {
                history.push(x);
            } else {
                history.shift();
                history.push(x);
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
    return ({actionFetchExamples: fetchExamples,});
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Calculator);