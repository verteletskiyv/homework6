import React from "react";
import { Button, withStyles } from "@material-ui/core";


const styles = () => ({
    buttonsStyle: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: 'minmax(60px, auto)',
        marginBottom: '10px',
    },
    signBtnStyle: {
        variant: "text",
        color: "salmon",
        size: "large",
        borderRadius: '50px',
    },
    numBtnStyle: {
        variant: "text",
        color: "lightblue",
        size: "large",
        borderRadius: '50px'
    }
});

class CalcButton extends React.Component {
    render() {
        const buttonValues =
              [ 7, 8, 9, '/',
                4, 5, 6, '*',
                1, 2, 3, '-',
                'C', 0, '=', '+' ];
        const {
            buttonsStyle,
            numBtnStyle,
            signBtnStyle
        } = this.props.classes;
        return (
            <div className={buttonsStyle}>
                {buttonValues.map(btn => {
                    return (typeof btn === 'number')
                        ? <Button
                            className={numBtnStyle}
                            key={btn}
                            onClick={() => this.props.onDigitClick(btn)}>
                            {btn}
                        </Button>
                        : <Button
                            className={signBtnStyle}
                            key={btn}
                            onClick={() => this.props.onSignClick(btn)}>
                            <b>{btn}</b>
                        </Button>
                })}
            </div>
        );
    }
}

export default withStyles(styles)(CalcButton);