import http_common from "../../http_common.ts";
import jwtDecode from "jwt-decode";
import {AuthUserActionType, IUser, LoginSuccessAction} from "../../entities/Auth.ts";
import {Dispatch} from "react";

export const LoginUserAction = (dispatch: Dispatch<LoginSuccessAction>, token: string) => {
    http_common.defaults.headers.common["Authorization"]=`Bearer ${token}`;
    localStorage.token=token;
    const user = jwtDecode(token) as IUser;
    dispatch({
        type: AuthUserActionType.LOGIN_USER,
        payload: {
            sub: user.sub,
            email: user.email,
            roles: user.roles,
        },
    });
}