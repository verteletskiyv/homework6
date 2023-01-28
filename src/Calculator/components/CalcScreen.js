import React from "react";
import { withStyles } from "@material-ui/core";


const styles = () => ({
    inputStyle: {
        '&:focus, &:active': {
            outline: 'none',
        },
        height: '40px',
        width: '220px',
        backgroundColor: '#3b3b3b',
        color: '#ffffff',
        border: 'none',
        fontSize: 'larger',
        fontWeight: '500',
        letterSpacing: '1px',
        textAlign: 'end',
        padding: '0 30px',
    },
});

class CalcScreen extends React.Component {
    render() {
        const { inputStyle } = this.props.classes;
        return (
            <input
                type="text"
                value={this.props.currentField}
                className={inputStyle}
                onChange={this.props.onChange}
            />
        );
    }
}

export default withStyles(styles)(CalcScreen);

