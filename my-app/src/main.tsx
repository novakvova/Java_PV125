// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import 'flowbite';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </>,
)
