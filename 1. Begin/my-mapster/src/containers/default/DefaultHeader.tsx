// Імпорт необхідних компонентів та хуків з Ant Design та React
import {Button, Layout, Menu} from 'antd';// Компоненти для створення кнопок, розташування та меню
import {Link, useLocation} from 'react-router-dom';// Компонент для створення посилань та хук для отримання поточного шляху

// Деструктуризація Layout та Header з Ant Design
const {Header} = Layout;

// Масив об'єктів, які представляють елементи меню
const items1 = ['Home', 'Add'].map((key) => ({
    key,
    label: `${key}`,
    link: key.toLowerCase(), // Додає властивість link на основі значення ключа елемента
}));

// Стиль для кнопок у хедері
const ButtonStyle = {
    margin: '0 10px 0 0',
};
// Компонент хедера зі стандартним меню та кнопками для Sign-In та Register
const DefaultHeader = () => {
    // Хук для отримання поточного шляху
    const location = useLocation();

    // Відображення хедера, який включає в себе меню та кнопки
    return (
        <Header style={{display: 'flex', alignItems: 'center'}}>
            <div className="demo-logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname.substr(1)]} // Highlight the selected menu item
                style={{flex: 1, minWidth: 0}}
            >
                {items1.map((item) => (
                    <Menu.Item key={item.link}>
                        <Link to={`/${item.link}`}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>

            <>
                <Link to={"/login"}>
                    <Button style={ButtonStyle}>
                        Sign-In
                    </Button>
                </Link>
                <Link to={"/register"}>
                    <Button>Register</Button>
                </Link>
            </>

        </Header>
    );
};
// Експорт для використання в інших частинах програми
export default DefaultHeader;