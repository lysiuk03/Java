// Імпорт ReactDOM для рендерингу React-додатку
import ReactDOM from 'react-dom/client'
// Імпорт компоненту App та стилів для нього
import App from './App.tsx'
import './index.css'
// Імпорт BrowserRouter для забезпечення роутингу в React-додатку
import {BrowserRouter} from "react-router-dom";
// Використання методу createRoot для рендерингу React-додатку у кореневий елемент з ідентифікатором 'root'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
)