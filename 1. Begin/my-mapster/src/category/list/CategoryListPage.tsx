// Імпорт необхідних компонентів та бібліотек з Ant Design та React
import {Button, Col, Form, Input, Pagination, Row} from "antd";// Елементи для створення кнопок, колонок, форм та пагінації
import {Link, useSearchParams} from "react-router-dom";// Компонент для створення посилань та хук для отримання параметрів шляху
import {useEffect, useState} from "react";// Хук для виконання ефектів та стану компоненту
import {ICategorySearch, IGetCategories} from "./types.ts";// Інтерфейси для пошуку категорій та отримання списку категорій
import http_common from "../../http_common.ts"; // Модуль для виконання HTTP-запитів
import CategoryCard from "./CategoryCard.tsx";// Компонент карточки категорії

// Компонент сторінки для відображення списку категорій
const CategoryListPage = () => {
// Стан для зберігання даних про категорії, що відображаються
    const [data, setData] = useState<IGetCategories>({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0
    });
    // Хук для отримання та оновлення параметрів шляху (URL)
    const [searchParams, setSearchParams] = useSearchParams();
    // Стан для зберігання параметрів пошуку та сторінку
    const [formParams, setFormParams] = useState<ICategorySearch>({
        name: searchParams.get('name') || "",
        page: Number(searchParams.get('page')) || 1,
        size: Number(searchParams.get('size')) || 2
    });
// Ефект для виклику API та отримання списку категорій при зміні параметрів пошуку та сторінки

    useEffect(() => {
        // Виклик API для отримання списку категорій із зазначеними параметрами
        http_common.get<IGetCategories>("/api/categories/search", {
            params: {
                ...formParams,
                page: formParams.page - 1, // Сервер працює зі сторінками, починаючи з 0
                searchText: formParams.name // Ваш параметр для пошуку як в назві, так і в описі
            }
        })
            .then(resp => {
                console.log("Items", resp.data);
                // Оновлення стану даними про категорії
                setData(resp.data);
            });
    }, [formParams]);// Запускається при зміні параметрів пошуку або сторінки
    // Деструктуризація полів даних категорій
    const {content, totalElements} = data;
// Створення форми для пошуку категорій
    const [form] = Form.useForm<ICategorySearch>();
    // Функція для виконання пошуку категорій за заданими параметрами
    const onSubmit = async (values: ICategorySearch) => {
        // Виклик функції для виконання пошуку та оновлення URL
        findCategories({...formParams, page: 1, name: values.name});
    }
    // Функція для виконання видалення категорії за заданим ідентифікатором
    const handleDelete = async (id: number) => {
        try {
            // Виклик API для видалення категорії
            await http_common.delete(`/api/categories/${id}`);
            // Оновлення стану, виключаючи видалену категорію
            setData({ ...data, content: content.filter(x => x.id != id)} );
        } catch (error) {
            // Обробка помилок під час видалення категорії
            throw new Error(`Error: ${error}`);
        }
    }

    // Функція для зміни сторінки та кількості елементів на сторінці
    const handlePageChange = async (page: number, newPageSize: number) => {
        // Виклик функції для виконання пошуку та оновлення URL
        findCategories({...formParams, page, size: newPageSize});
    };

    // Функція для виконання пошуку категорій та оновлення URL
    const findCategories = (model: ICategorySearch) => {
        // Оновлення стану параметрів пошуку
        setFormParams(model);
        // Виклик функції для оновлення параметрів шляху в URL
        updateSearchParams(model);
    }

    // Функція для оновлення параметрів шляху в URL
    const updateSearchParams = (params : ICategorySearch) =>{
        // Проходження по ключам та значенням параметрів та оновлення URL
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== 0 && value!="") {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }
        // Оновлення URL за допомогою хука setSearchParams
        setSearchParams(searchParams);
    };

// Відображення компоненту сторінки списку категорій
    return (
        <>
            <h1>Список категорій</h1>
            <Link to={"/category/create"}>
                <Button size={"large"}>Додати</Button>
            </Link>

            <Row gutter={16}>
                <Form form={form} onFinish={onSubmit} layout={"vertical"}
                      style={{
                          minWidth: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          padding: 20,
                      }}
                >
                    <Form.Item
                        label="Назва"
                        name="name"
                        htmlFor="name"
                    >
                        <Input autoComplete="name"/>
                    </Form.Item>

                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Пошук
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() =>{ }}>
                            Скасувати
                        </Button>
                    </Row>
                </Form>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {content.length === 0 ? (
                            <h2>Список пустий</h2>
                        ) : (
                            content.map((item) =>
                                <CategoryCard key={item.id} item={item} handleDelete={handleDelete} />,
                            )
                        )}
                    </Row>
                </Col>
            </Row>

            <Row style={{width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center'}}>
                <Pagination
                    showTotal={(total, range) => {
                        // console.log("range ", range);
                        return (`${range[0]}-${range[1]} із ${total} записів`);
                    }}
                    current={formParams.page}
                    defaultPageSize={formParams.size}
                    total={totalElements}
                    onChange={handlePageChange}
                    pageSizeOptions={[1, 2, 5, 10]}
                    showSizeChanger
                />
            </Row>
        </>
    )
}

// Експорт компоненту для використання в інших частинах програми
export default CategoryListPage;