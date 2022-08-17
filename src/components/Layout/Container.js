import React from 'react';
import classes from "../../styles/components/Layout/Container.module.css"

const Container = (props) => {
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    );
}

export default Container;
