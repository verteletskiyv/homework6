import React from "react";
import {withStyles} from "@material-ui/core";


const styles = () => ({
    containerStyle: {
        backgroundColor: '#3b3b3b',
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        width: '280px',
        padding: '50px 10px 30px 10px',
        margin: '0 auto',
        border: '#f5f5f5 1px solid',
        borderRadius: '10px',
    }
});

class CalcWrapper extends React.Component {
    render() {
        const {containerStyle} = this.props.classes;
        return (
            <div className={containerStyle}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(CalcWrapper);