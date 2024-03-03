// Імпорт необхідних компонентів та модулів з бібліотек Ant Design та React
import {Button, Card, Col, Popconfirm, Typography} from "antd";// Компоненти Ant Design для кнопок, карточок, колонок та підтверджень
import NotImage from '../../assets/imagenot.png';// Зображення для використання, якщо фото категорії відсутнє
import Meta from "antd/es/card/Meta";// Компонент Ant Design для мета-даних у карточці
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'; // Іконки Ant Design для видалення та редагування
import {Link} from "react-router-dom";// Компонент для створення посилань в React
import {APP_ENV} from "../../env";// Змінні середовища програми
import {ICategoryItem} from "./types.ts";// Інтерфейс для елементів категорій

const { Title } = Typography;// Деструктуризація компонента Ant Design для заголовків

// Прописання інтерфейсу для пропсів компоненту CategoryCard
interface ICategoryCardProps {
    item: ICategoryItem,  // Елемент категорії
    handleDelete: (id: number) => void // Функція видалення категорії за ідентифікатором
}

// Компонент для відображення карточки категорії
const CategoryCard: React.FC<ICategoryCardProps> = (props) => {
    const {item, handleDelete} = props; // Деструктуризація пропсів
    const {id, name, description, image} = item;// Деструктуризація даних категорії

    return (
        <>
            <Col style={{padding: 10}} xxl={6} lg={8} md={12} sm={12}>
                <Card
                    bodyStyle={{flex: '1', paddingBlock: '10px'}}
                    style={{height: 350, display: 'flex', flexDirection: 'column', paddingTop: '40px'}}
                    hoverable
                    cover={
                        <img
                            style={{height: '120px', objectFit: 'contain'}}
                            alt={name}
                            src={image ? `${APP_ENV.BASE_URL}/uploading/300_${image}` : NotImage}
                        />
                    }
                    actions={[
                        <Link to={`/category/edit/${id}`}>
                            <Button type="primary" icon={<EditOutlined/>}>
                                Змінить
                            </Button>
                        </Link>,

                        <Popconfirm
                            title="Are you sure to delete this category?"
                            onConfirm={() => handleDelete(id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type={"primary"} danger icon={<DeleteOutlined/>}>
                                Видалити
                            </Button>
                        </Popconfirm>
                    ]}
                >

                    <Meta
                        title={name}
                        description={
                            <Title level={5} type="success">{description}</Title>
                        }
                    />
                </Card>
            </Col>
        </>
    )
}
// Експорт компоненту для використання в інших частинах програми

export default CategoryCard;