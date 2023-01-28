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
    lastInList: {
        color: 'salmon',
        marginTop: '5px',
        fontWeight: '500',
        fontSize: 'larger',
    }
});

class CalcHistory extends React.Component {
    render() {
        const { lastInList, historyStyle } = this.props.classes;
        const history = this.props.history;

        return (
            <div className={historyStyle}>
                {history.map((example, index) => {
                    if (index === history.length - 1)
                        return <div key={index} className={lastInList}>{example}</div>
                    else
                        return <div key={index}>{example}</div>
                })}
            </div>
        );
    }
}

export default withStyles(styles)(CalcHistory);