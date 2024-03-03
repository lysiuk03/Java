// Імпорт необхідних компонентів та хуків з Ant Design та React
import {Layout, Menu, MenuProps, theme} from "antd";// Компоненти для створення layout, меню та теми
import React from "react"; // Імпорт бібліотеки React
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";// Іконки для меню
const {  Sider } = Layout;// Деструктуризація Layout та Sider з Ant Design

// Компонент бічної панелі за замовчуванням
const DefaultSider = () => {
    // Деструктуризація значень токенів теми для визначення стилів
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // Масив об'єктів, які представляють елементи меню та їх підпункти
    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${key}`,
                icon: React.createElement(icon),
                label: `subnav ${key}`,
// Генерація підпунктів меню
                children: new Array(4).fill(null).map((_, j) => {
                    const subKey = index * 4 + j + 1;
                    return {
                        key: subKey,
                        label: `option${subKey}`,
                    };
                }),
            };
        },
    );
    // Відображення бічної панелі з меню
    return (
        <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items2}
            />
        </Sider>
    )
}
// Експорт компоненту для використання в інших частинах програми
export default DefaultSider;