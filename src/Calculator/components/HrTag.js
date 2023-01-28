import React from "react";
import { withStyles } from "@material-ui/core";

const styles = () => ({
    hr: {
        width: '80%',
        margin: 'auto',
        marginTop: '5px'
    },
})

class HrTag extends React.Component {
    render() {
        return (
            <hr size="1" color="#5F5F5F" className={this.props.classes.hr} />
        );
    }
}

export default withStyles(styles)(HrTag);