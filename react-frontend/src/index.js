import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
