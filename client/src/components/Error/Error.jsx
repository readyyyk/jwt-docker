import React from 'react';
import {Typography} from "antd";
import {useRouteError} from "react-router-dom";

const Error = () => {
    const e = useRouteError();
    console.log(e)
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography.Title> Oops... </Typography.Title>
            <Typography.Title> {e?.status || e?.code} </Typography.Title>
            <Typography.Text style={{fontSize: 24}}> {e?.statusText  || e?.message} </Typography.Text>
        </div>
    );
};

export default Error;