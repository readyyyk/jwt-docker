import {Form, Input} from "antd";
import AuthForm from "./AuthForm.jsx";
import {useContext} from "react";
import {loginContext} from "../../Contexts/loginContext/LoginContextProvider.jsx";
import {useNavigate} from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const {register} = useContext(loginContext);

    const onFinish = async (values) => {
        const isSuccess = await register(values['username'], values['email'], values['password']);
        if (isSuccess) {
            form.setFields([{
                name: 'username',
                errors: ['Username already used!'],
            }]);
            return;
        }
        location.replace('/profile');
    }

    return (
        <AuthForm
            register
            form={form}
            inputs={[
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {required: true, message: "Please input username!"},
                    ]}
                >
                    <Input placeholder={"username"}/>
                </Form.Item>,
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {required: true, message: "Please input email!"},
                        {type: 'email', message: "Please input valid email!"}
                    ]}
                >
                    <Input placeholder={"example@gmail.com"}/>
                </Form.Item>,
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {required: true, message: "Please input password!"},
                        {type: 'string', min: 4, message: 'Password must contain at least 4 characters!'}
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
            ]}
            onFinish={onFinish}
        />
    );
}

export default Register
