
import { Form, Input, Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import http_common from "../../http_common";
import {IAccountCreate} from "./types.ts";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values: IAccountCreate) => {
        try {
            await http_common.post("/api/register", values);
            navigate('/login');
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div>
            <h1>Реєстрація</h1>
            <Row justify="center">
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    style={{ width: 400 }}
                >
                    <Form.Item
                        name="name"
                        label="Ім'я"
                        rules={[{ required: true, message: "Будь ласка, введіть своє ім'я" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Прізвище"
                        rules={[{ required: true, message: "Будь ласка, введіть своє прізвище" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Електронна пошта"
                        rules={[{ required: true, type: 'email', message: "Будь ласка, введіть правильну електронну адресу" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{ required: true, message: "Будь ласка, введіть пароль" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="password_confirmation"
                        label="Підтвердіть пароль"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Будь ласка, підтвердіть пароль' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Введені паролі не співпадають'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Зареєструватися
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </div>
    );
};

export default RegisterPage;
