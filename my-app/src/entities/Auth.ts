export enum AuthUserActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER",
}

export interface IUser {
    sub: string;
    email: string;
    roles: string[];
}

export interface IAuthUser {
    isAuth: boolean;
    user?: IUser;
}

export interface IRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResult {
    token: string;
}
