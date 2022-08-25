import React from 'react';
import classes from "../../styles/components/Layout/Layout.module.css";
import Footer from './Footer';
import Header from './Header';

const Layout = (props) => {
    return (
        <>
          <Header />
          <main className={classes.container}>
            {props.children}
          </main>
          <Footer /> 
        </>
    );
}

export default Layout;
