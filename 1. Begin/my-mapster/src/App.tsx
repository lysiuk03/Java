// Імпорт стилів для компоненту App
import './App.css'
// Імпорт компонентів та хуків для роутингу та створення маршрутів
import CategoryListPage from "./category/list/CategoryListPage.tsx";// Сторінка списку категорій
import {Route, Routes} from "react-router-dom";// Компоненти для роботи з роутами в React
import DefaultLayout from "./containers/default/DefaultLayout.tsx";// Компонент лейауту за замовчуванням
import CategoryCreatePage from "./category/create/CategoryCreatePage.tsx";// Сторінка створення категорії
import CategoryEditPage from "./category/edit/CategoryEditPage.tsx"; // Сторінка редагування категорії

// Головна компонента App
function App() {
    // Відображення компонентів за допомогою роутів в React
    return (
        <>
            {/* Визначення роутів за допомогою компонента Routes */}
            <Routes>
                <Route path={"/"} element={<DefaultLayout/>}>
                    <Route index element={<CategoryListPage/>}/>
                    <Route path={"category"}>
                        <Route path = "create" element={<CategoryCreatePage/>}/>
                        <Route path = "edit/:id" element={<CategoryEditPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </>
    )
}
// Експорт головної компоненти App для використання в інших частинах програми
export default App