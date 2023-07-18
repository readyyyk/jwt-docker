import {Form, Input} from "antd";
import AuthForm from "./AuthForm.jsx";
import {useContext} from "react";
import {loginContext} from "../../Contexts/loginContext/LoginContextProvider.jsx";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const {login} = useContext(loginContext);

    const onFinish = async (values) => {
        const isSuccess = await login(values['username'], values['password']);
        if (isSuccess) {
            switch (isSuccess.data.code) {
                case 2:
                    form.setFields([{
                        name: 'username',
                        errors: ["User not found!"],
                    }]);
                    break;
                case 1:
                    form.setFields([{
                        name: 'password',
                        errors: ["Wrong password!"],
                    }]);
                    break;
            }

            return;
        }

        location.replace('/profile')
    }

    return (
        <AuthForm
            form={form}
            inputs={[
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: "Please input username!"}]}
                >
                    <Input placeholder={"username"}/>
                </Form.Item>,
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: "Please input password!"}]}
                >
                    <Input.Password/>
                </Form.Item>
            ]}
            onFinish={onFinish}
        />
    );
}

export default Login
