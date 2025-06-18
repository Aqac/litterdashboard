import { Form, Input, Flex, Checkbox, Button,message } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { Login } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Response {
    code: number;
    message: string;
    token?: string;
    data: {username: string; role: string};
}

interface LoginFormValues {
    username: string;
    password: string;
    remember?: boolean;
}

export default function LoginPage() {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: LoginFormValues) => {
        const { username, password } = values;
        try {
            setLoading(true);
            const res = await Login(username, password) as Response;
            if (res.code === 0) {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                }
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('role', res.data.role);
                if (res.data.role === 'admin') {
                    setLoading(false);
                    navigate('/admin');
                } else if (res.data.role === 'user') {
                    setLoading(false);
                    navigate('/main');
                }
            } else {
                setLoading(false);
                form.setFields([
                    {name:'username', errors: ["用户名或密码错误"]},
                ])
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const role = localStorage.getItem('role');
            if (role === 'admin') {
                navigate('/admin');
            } else if (role === 'user') {
                navigate('/main');
            }
        }
    },[navigate])

    const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
        messageApi.info('该功能正在实现中！！');
    }

    return (
        <>
            {contextHolder}
            <div className="w-screen h-screen bg-gray-100 pt-10">
                <div className="h-[500px] bg-white max-w-[600px] mx-auto flex justify-center rounded-2xl">
                    <Form
                        name="login"
                        style={{ minWidth: 360, marginTop: '80px' }}
                        onFinish={onFinish}
                        initialValues={{ remember: true }}
                        form={form}
                    >
                        <Form.Item
                            name='username'
                            rules={[{ required: true, message: '请输入用户名!' }]}

                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a onClick={info}>Forgot password</a>
                            </Flex>
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit" loading={loading}>
                                Log in
                            </Button>
                            or <a onClick={info}>Register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}