import React from "react";
import { withStyles } from "@material-ui/core/styles";


const styles = () => ({
    historyStyle: {
        display: 'table-cell',
        verticalAlign: 'bottom',
        height: '200px',
        width: '250px',
        textAlign: 'end',
        color: 'grey',
        fontSize: 'large',
    },
    firstInList: {
        color: 'salmon',
        marginTop: '5px',
        fontWeight: '500',
        fontSize: 'larger',
    }
});


class CalcHistory extends React.Component {
    render() {
        const { firstInList, historyStyle } = this.props.classes;
        const history = this.props.history;

        return (
            <div className={historyStyle}>
                {history.map((expression, index) => {
                    if (index === history.length - 1)
                        return <div key={expression} className={firstInList}>{expression}</div>
                    else
                        return <div key={expression}>{expression}</div>
                })}
            </div>
        );
    }
}

export default withStyles(styles)(CalcHistory);