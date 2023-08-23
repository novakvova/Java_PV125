import './App.css'
import {useEffect} from "react";
import axios from "axios";

function App() {
    useEffect(() => {
        axios.get("http://localhost:8084/")
            .then(resp => {
                console.log("--Server response--", resp.data);
            });
    },[]);

  return (
    <>
      <h1>Привіт</h1>
    </>
  )
}

export default App
