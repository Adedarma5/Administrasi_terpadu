import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './Dist/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
    </BrowserRouter>

)
