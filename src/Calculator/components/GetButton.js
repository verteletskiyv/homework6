import React from "react";
import {Button, withStyles} from "@material-ui/core";

const styles = () => ({
    btnStyle: {
        border: '2px solid #E06149',
        color: '#E06149',
        fontWeight: '600',
    },
});

class GetButton extends React.Component {
    render() {
        const { btnStyle } = this.props.classes;
        return (
            <Button
                className={btnStyle}
                onClick={this.props.onClick}
                variant="outlined"
            >
                Получить и решить примеры
            </Button>
        );
    }
}

export default withStyles(styles)(GetButton);