// Імпорт необхідних функцій та компонентів з бібліотек та модулів
import {useNavigate} from "react-router-dom"; // Використовуємо хук для навігації в React Router
import {ICategoryCreate, IUploadedFile} from "./types.ts";
import {Button, Form, Input, Row, Upload} from "antd"; // Імпорт компонентів Ant Design для форм та інтерфейсу
import {Link} from "react-router-dom"; // Імпорт компонента для створення посилань
import TextArea from "antd/es/input/TextArea"; // Імпорт компонента для введення тексту з Ant Design
import {UploadChangeParam} from "antd/es/upload"; // Імпорт типів для зміни в компоненті завантаження файлів
import { PlusOutlined } from '@ant-design/icons'; // Імпорт іконки для кнопки завантаження фото
import http_common from "../../http_common.ts"; // Імпорт модуля для HTTP-запитів


// Створення компоненту сторінки для створення нової категорії
const CategoryCreatePage = () => {
    // Використання хука для навігації
    const navigate = useNavigate();
    // Створення форми з використанням типу ICategoryCreate
    const [form] = Form.useForm<ICategoryCreate>();
    // Обробник подання форми з викликом API для створення нової категорії
    const onHandlerSubmit = async (values: ICategoryCreate) => {
        try {
            // Виклик API для створення категорії з використанням HTTP POST-запиту
            await http_common.post("/api/categories/create", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Навігація на головну сторінку після успішного створення категорії
            navigate('/');
        }
        catch(ex) {
            // Обробка винятків під час невдалого створення категорії
            console.log("Exception create category", ex);
        }
    }
    // Відображення компоненту форми для створення категорії
    return (
        <>
            <h1>Додати категорію</h1>
            <Row gutter={16}>
                <Form form={form}
                      onFinish={onHandlerSubmit}
                      layout={"vertical"}
                      style={{
                          minWidth: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          padding: 20,
                      }}
                >

                    <Form.Item
                        label={"Назва"}
                        name={"name"}
                        htmlFor={"name"}
                        rules={[
                            {required: true, message: "Це поле є обов'язковим!"},
                            {min: 3, message: "Довжина поля 3 символи"}
                        ]}
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Form.Item
                        label={"Опис"}
                        name={"description"}
                        htmlFor={"description"}
                        rules={[
                            {required: true, message: "Це поле є обов'язковим!"},
                            {min: 10, message: "Довжина поля 10 символи"}
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Фото"
                        valuePropName="image"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                        rules={[{required: true, message: 'Оберіть фото категорії!'}]}
                    >
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                        >
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Додати
                        </Button>
                        <Link to={"/"}>
                            <Button style={{margin: 10}} htmlType="button">
                                Скасувати
                            </Button>
                        </Link>
                    </Row>
                </Form>
            </Row>
        </>
    );
}
// Експорт компоненту для використання в інших частинах програми
export default CategoryCreatePage;