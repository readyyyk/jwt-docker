import React, {useContext, useEffect} from 'react';
import {Avatar, Button} from "antd";
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';

import styles from './Profile.module.css';
import {useLoaderData, useNavigate} from "react-router-dom";
import {loginContext} from "../../Contexts/loginContext/LoginContextProvider.jsx";

const Profile = () => {
    const navigate = useNavigate();
    const {logout} = useContext(loginContext);

    let {username, email} = useLoaderData();

    return (
        <div className={styles.content}>
            <div className={styles.userData}>
                <div className={styles.userLogo}>
                    <Avatar size={200} icon={<UserOutlined/>}></Avatar>
                </div>
                <div className={styles.userCredentials}>
                    <h1> {username} </h1>
                    <h3> {email} </h3>
                    <Button danger onClick={()=> {
                        logout();
                        navigate('/login');
                    }}>
                        Log out
                        <LogoutOutlined />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;