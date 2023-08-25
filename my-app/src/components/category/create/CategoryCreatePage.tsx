import { useNavigate } from "react-router-dom";
import { ICategoryCreate } from "./types";
import { useFormik } from "formik";
import http_common from "../../../http_common.ts";

const CategoryCreatePage = () => {
    const navigate = useNavigate();

    const init: ICategoryCreate = {
        name: "",
        image: "",
        description: "",
    };

    const onFormikSubmit = async (values: ICategoryCreate) => {
        try {
            await http_common.post(
                "/category",
                values
            );
            navigate("/");
        } catch {
            console.log("Server error");
        }
    };

    const formik = useFormik({
        initialValues: init,
        onSubmit: onFormikSubmit,
    });

    const { values, handleChange, handleSubmit } = formik;
    return (
        <>
            <h1 className="text-center">Додати категорію</h1>
            <div className="container">
                <form className="col-md-8 offset-md-2" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Назва
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                            name="name"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Фото
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            value={values.image}
                            onChange={handleChange}
                            name="image"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Опис
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={values.description}
                            onChange={handleChange}
                            name="description"
                        />
                    </div>
                    <button
                        onClick={() => {
                            navigate("/");
                        }}
                        className="btn btn-secondary "
                    >
                        Скасувати
                    </button>

                    <button type="submit" className="btn btn-primary">
                        Додати
                    </button>
                </form>
            </div>
        </>
    );
};

export default CategoryCreatePage;
