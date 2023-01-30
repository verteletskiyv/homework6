import React from "react";
import {withStyles, TextField} from "@material-ui/core";


const styles = {
    input: {
        borderTop: '1px dashed #5F5F5F',
        padding: '10px 30px 0px 30px',
        color: "white",
        fontSize: '18px',
        textAlign: 'end',
        width: '220px',
        letterSpacing: '1px',
    }
};

class CalcScreen extends React.Component {
    render() {
        const {input} = this.props.classes;
        return (
            <TextField
                onChange={this.props.onChange}
                id="standard-textarea"
                InputProps={{disableUnderline: true}}
                inputProps={{className: input}}
                multiline
                value={this.props.currentField}
            />
        );
    }
}

export default withStyles(styles)(CalcScreen);

