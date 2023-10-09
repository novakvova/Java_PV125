import { AiFillGoogleCircle } from "react-icons/ai";
import {useGoogleLogin} from "@react-oauth/google";
import http_common from "../../../http_common.ts";

const GoogleAuth = () => {

    const onHandleGooleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            const {access_token} = tokenResponse;
            console.log("Access token = ", access_token);

            http_common.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`)
                .then(resp => {
                    console.log("Resp google info", resp.data);
                });
        }
    })

    return (
        <>
            <button onClick={(e) => {
                e.preventDefault();
                onHandleGooleLogin();
            }}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <AiFillGoogleCircle className={"mr-2 text-2xl"}/>
                Buy now
            </button>
        </>
    )
}

export default GoogleAuth;