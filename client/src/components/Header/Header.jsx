import React, {useContext} from 'react';
import {Layout} from "antd";

import styles from './Header.module.css'
import {loginContext} from "../../Contexts/loginContext/LoginContextProvider.jsx";
import {Link} from "react-router-dom";

const Header = () => {
    const {isLogged} = useContext(loginContext);
    return (
        <Layout.Header className={styles.header}>
            <a className={styles.link} href='https://github.com/readyyyk'> @readyyyk </a>
            <div className={styles.groupLinks}>
                <Link to='/register' className={styles.link}> Register </Link>
                <Link to='/login' className={styles.link}> Login </Link>
                <Link to={isLogged?'/profile':'#'} className={styles.link} disabled={!isLogged}> Profile </Link>
            </div>
        </Layout.Header>
    );
};

export default Header;