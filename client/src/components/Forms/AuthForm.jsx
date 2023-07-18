import {Form, Card} from "antd";
import {
    LoginOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

function AuthForm({inputs, register: isRegister, onFinish, form}) {
    const navigate = useNavigate();

    return (
        <Card
            style={{
                width: 300,
                height: "min-content",
                cursor: "default",
            }}
            actions={[
                !isRegister ?
                    <UserAddOutlined
                        key="register"
                        style={{fontSize: 24}}
                        onClick={()=>navigate('/register')}
                    /> :
                    <UserOutlined
                        key="login"
                        style={{fontSize: 24}}
                        onClick={()=>navigate('/login')}
                    />
                ,
                <LoginOutlined
                    key="continue"
                    style={{fontSize: 24}}
                    onClick={form.submit}
                />,
            ]}
            hoverable
        >
            <Form
                form={form}
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                {...inputs}
            </Form>
        </Card>
    );
}

export default AuthForm
