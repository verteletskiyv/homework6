import React from "react";
import { withStyles } from "@material-ui/core/styles";


const styles = () => ({
    historyStyle: {
        display: 'table-cell',
        verticalAlign: 'bottom',
        height: '200px',
        width: '260px',
        textAlign: 'end',
        color: 'grey',
        fontSize: 'large',
    },
    lastInList: {
        color: 'salmon',
        margin: '5px 0 5px 0',
        fontSize: 'large',
    }
});

class CalcHistory extends React.Component {
    render() {
        const { lastInList, historyStyle } = this.props.classes;
        const history = this.props.history;
        return (
            <div className={historyStyle}>
                {history.map((example, index) => {
                    return (index === history.length - 1)
                        ? <div key={index} className={lastInList}>{example}</div>
                        : <div key={index}>{example}</div>
                })}
            </div>
        );
    }
}

export default withStyles(styles)(CalcHistory);