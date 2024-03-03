// Імпорт необхідних компонентів та хуків з Ant Design та React
import {Breadcrumb, Layout, theme} from "antd";// Компоненти для створення breadcrumb, розташування та теми
import DefaultHeader from "./DefaultHeader";// Компонент хедера
import {Outlet} from "react-router-dom";// Хук для виведення дочірніх компонентів в роуті
import DefaultSider from "./DefaultSlider.tsx"; // Компонент бічної панелі
// Деструктуризація Layout та його складових
const { Content, Footer} = Layout;
// Компонент лейауту за замовчуванням
const DefaultLayout = () => {
    // Деструктуризація значень токенів теми для визначення стилів
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    // Відображення компоненту
    return (
        <Layout>
            <DefaultHeader/>

            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                    <DefaultSider/>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center', bottom: "0", right: "0", left: "0"}}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    )
}
// Експорт компоненту  для використання в інших частинах програми
export default DefaultLayout;