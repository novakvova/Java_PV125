import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import http_common from "../../../http_common";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { AuthUserActionType, IRegister, IUser } from "../../../entities/Auth";
import InputGroup from "../../../common/InputGroup.tsx";


function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues: IRegister = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
    };

    const registerSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Invalid email"),
        password: Yup.string().required("Password is required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        phone: Yup.string().required("Phone number is required"),
    });

    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (values: IRegister) => {
        try {
            const result = await http_common.post<{ token: string }>(
                "api/account/register",
                values
            );
            const { data } = result;
            const token = data.token;
            localStorage.token = token;
            const user = jwtDecode(token) as IUser;
            dispatch({
                type: AuthUserActionType.LOGIN_USER,
                payload: {
                    sub: user.sub,
                    email: user.email,
                    roles: user.roles,
                },
            });
            setMessage("");
            navigate("/");
        } catch {
            setMessage("Registration failed");
        }
    };

    return (
        <>
            <div className="mx-auto text-center">
                <h1 className="text-3xl  font-bold text-black sm:text-4xl">Реєстрація</h1>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={registerSchema}
            >
                {({ handleChange, errors, touched, handleBlur }) => (
                    <Form>
                        <i
                            className="bi bi-arrow-left-circle-fill back-button"
                            onClick={() => navigate("..")}
                        ></i>
                        {message && (
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        )}
                        <InputGroup
                            label="Email"
                            type="email"
                            field="email"
                            handleBlur={handleBlur}
                            error={errors.email}
                            touched={touched.email}
                            handleChange={handleChange}
                        />
                        <InputGroup
                            label="Password"
                            type="password"
                            field="password"
                            handleBlur={handleBlur}
                            error={errors.password}
                            touched={touched.password}
                            handleChange={handleChange}
                        />
                        <InputGroup
                            label="First Name"
                            type="text"
                            field="firstName"
                            handleBlur={handleBlur}
                            error={errors.firstName}
                            touched={touched.firstName}
                            handleChange={handleChange}
                        />
                        <InputGroup
                            label="Last Name"
                            type="text"
                            field="lastName"
                            handleBlur={handleBlur}
                            error={errors.lastName}
                            touched={touched.lastName}
                            handleChange={handleChange}
                        />
                        <InputGroup
                            label="Phone"
                            type="text"
                            field="phone"
                            handleBlur={handleBlur}
                            error={errors.phone}
                            touched={touched.phone}
                            handleChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default RegisterPage;