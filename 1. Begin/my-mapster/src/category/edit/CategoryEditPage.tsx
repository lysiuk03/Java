// Імпорт необхідних функцій та компонентів з бібліотек та модулів React та Ant Design
import {useNavigate, useParams} from "react-router-dom"; // Використання хуків для навігації та отримання параметрів шляху
import {Button, Form, Input, Row, Upload, UploadFile} from "antd"; // Імпорт компонентів Ant Design для створення форм та інтерфейсу
import TextArea from "antd/es/input/TextArea"; // Імпорт компонента для введення тексту з Ant Design
import {UploadChangeParam} from "antd/es/upload"; // Імпорт типів для зміни в компоненті завантаження файлів
import {PlusOutlined} from "@ant-design/icons";  // Імпорт іконки для кнопки завантаження фото
import {useEffect, useState} from "react";// Імпорт хуків для виконання ефектів та управління станом компоненту
import http_common from "../../http_common.ts";// Імпорт модуля для HTTP-запитів
import {APP_ENV} from "../../env";// Імпорт змінних середовища програми
import {ICategoryEdit} from "./types.ts";// Імпорт інтерфейсу для редагування категорії
import {ICategoryItem} from "../list/types.ts";// Імпорт інтерфейсу для елементів категорій
import {IUploadedFile} from "../create/types.ts";// Імпорт інтерфейсу завантаженого файлу

// Компонент сторінки для редагування існуючої категорії
const CategoryEditPage = () => {
    // Використання хука для навігації
    const navigate = useNavigate();
    // Отримання параметрів шляху
    const {id} = useParams();
    // Створення форми з використанням типу ICategoryEdit
    const [form] = Form.useForm<ICategoryEdit>();
    // Стан для управління вибраним файлом
    const [file, setFile] = useState<UploadFile | null>();

    // Обробник подання форми з викликом API для редагування існуючої категорії
    const onSubmit = async (values: ICategoryEdit) => {
        try {
            // Виклик API для оновлення категорії з використанням HTTP PUT-запиту
            await http_common.put("/api/categories", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Навігація на головну сторінку після успішного оновлення категорії
            navigate('/');
        } catch (ex) {
            // Обробка винятків під час невдалого оновлення категорії
            console.log("Exception create category", ex);
        }
    }
    // Ефект для отримання даних категорії при завантаженні компоненту
    useEffect(() => {
        // Виклик API для отримання даних категорії за ідентифікатором
        http_common.get<ICategoryItem>(`/api/categories/${id}`)
            .then(resp => {
                const {data} = resp;
                // Заповнення полів форми отриманими даними
                form.setFieldsValue(data);
                // Встановлення вибраного файлу (фото категорії) для попереднього перегляду
                setFile(
                    {
                        uid: '-1',
                        name: data.image,
                        status: 'done',
                        url: `${APP_ENV.BASE_URL}/uploading/150_${data.image}`,
                    });
            })
            .catch(error => {
                // Обробка помилок під час отримання даних від сервера
                console.log("Error server ", error);
            });
    }, [id]);

// Відображення компоненту форми для редагування категорії
    return (
        <>
            <h1>Редагування категорію</h1>
            <Row gutter={16}>
                <Form form={form}
                      onFinish={onSubmit}
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
                        name="id"
                        hidden
                    />

                    <Form.Item
                        label="Назва"
                        name="name"
                        htmlFor="name"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 3, message: 'Назва повинна містити мінімум 3 символи!'},
                        ]}
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Опис"
                        name="description"
                        htmlFor="description"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 10, message: 'Опис повинен містити мінімум 10 символів!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>

                    <Form.Item
                        name="file"
                        label="Фото"
                        valuePropName="file"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                    >
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                            fileList={file ? [file] : []}
                            onChange={(data) => {
                                setFile(data.fileList[0]);
                            }}

                        >
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Обрати нове фото</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Зберегти
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() => {
                            navigate('/')
                        }}>
                            Скасувати
                        </Button>
                    </Row>
                </Form>
            </Row>

        </>
    )
}
// Експорт компоненту для використання в інших частинах програми
export default CategoryEditPage;