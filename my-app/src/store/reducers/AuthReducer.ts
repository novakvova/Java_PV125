import {AuthUserActions, AuthUserActionType, IAuthUser, IUser} from "../../entities/Auth.ts";

const initState: IAuthUser = {
    isAuth: false,
    user: undefined,
};

export const AuthReducer = (state = initState, action: AuthUserActions): IAuthUser => {
    switch (action.type) {
        case AuthUserActionType.LOGIN_USER: {
            const user = action.payload as IUser;
            return {
                isAuth: true,
                user,
            };
        }
        case AuthUserActionType.LOGOUT_USER: {
            return {
                user: undefined,
                isAuth: false,
            };
        }
    }
    return state;
};
