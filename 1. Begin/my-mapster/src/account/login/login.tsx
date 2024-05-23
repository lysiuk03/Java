
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {IAccountLogin} from "./types.ts";
import {useState} from "react";

const LoginPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const onFinish = (values: IAccountLogin) => {
        console.log('Received values:', values);
        setLoading(true);
        // Тут ви можете реалізувати логіку обробки логіну, наприклад, відправити дані на сервер
        setTimeout(() => {
            setLoading(false);
            navigate('/');
        }, 1000);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={8}>
                <h1>Логін</h1>
                <Form
                    name="login"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Будь ласка, введіть свій email!',
                            },
                            {
                                type: 'email',
                                message: 'Невірний формат email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Будь ласка, введіть свій пароль!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Пароль"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                            Увійти
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        Немаєте облікового запису? <Link to="/register">Зареєструватися</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default LoginPage;
