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
        color: '#fff',
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
                className={inputStyle}
                type="text"
                onChange={this.props.onChange}
                value={this.props.currentField}
            />
        );
    }
}

export default withStyles(styles)(CalcScreen);

