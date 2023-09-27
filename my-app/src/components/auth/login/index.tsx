import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import LoginPage from "./LoginPage.tsx";

const Login = () => {
    return (
    <GoogleReCaptchaProvider reCaptchaKey={"6LctSFIoAAAAAB7fNQ_N-tjSs8Tpblv8zVRqAOXQ"}>
        <LoginPage/>
    </GoogleReCaptchaProvider>
    );
}

export default Login;
