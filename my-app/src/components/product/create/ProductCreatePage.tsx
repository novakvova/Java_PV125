import { ICategory } from "../../../entities/Category.ts";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import http_common from "../../../http_common.ts";
import InputGroup from "../../../common/InputGroup.tsx";
import TextAreaGroup from "../../../common/TextAreaGroup.tsx";
import SelectGroup from "../../../common/SelectGroup.tsx";
import ImageListGroup from "../../../common/ImageListGroup.tsx";
import {IProductCreate} from "../types.ts";

const ProductCreate = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        http_common.get("api/categories").then((resp) => {
            setCategories(resp.data);
        });
    }, []);

    const initialValues: IProductCreate = {
        name: "",
        description: "",
        categoryId: null,
        images: [],
    };

    const productSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is required")
            .max(255, "Name must be smaller"),
        description: Yup.string()
            .required("Description is required")
            .max(4000, "Description must be smaller"),
        categoryId: Yup.number()
            .required("Category is required")
            .test("category-required", "Category is required", function (value) {
                if (value === -1) return false;
                else return true;
            }),
        images: Yup.array()
            .required("At least one image is required")
            .min(1, "At least one image is required"),
    });

    const navigate = useNavigate();

    const handleSubmit = async (values: IProductCreate) => {
        try {
            await productSchema.validate(values);

            await http_common.post("api/products", values, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            navigate("..");
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={productSchema}
            >
                {({
                      values,
                      setFieldValue,
                      handleChange,
                      errors,
                      touched,
                      handleBlur,
                  }) => (
                    <Form>
                        <i
                            className="bi bi-arrow-left-circle-fill back-button"
                            onClick={() => navigate("..")}
                        ></i>
                        <InputGroup
                            label="Name"
                            type="text"
                            field="name"
                            handleBlur={handleBlur}
                            error={errors.name}
                            touched={touched.name}
                            handleChange={handleChange}
                        ></InputGroup>
                        <TextAreaGroup
                            label="Description"
                            field="description"
                            handleChange={handleChange}
                            error={errors.description}
                            touched={touched.description}
                            handleBlur={handleBlur}
                            value={values.description}
                        ></TextAreaGroup>
                        <SelectGroup
                            label="Category"
                            field="categoryId"
                            handleChange={handleChange}
                            error={errors.categoryId}
                            touched={touched.categoryId}
                            handleBlur={handleBlur}
                            options={categories}
                            optionKey="id"
                            optionLabel="name"
                        ></SelectGroup>
                        <ImageListGroup
                            images={values.images}
                            setFieldValue={setFieldValue}
                            error={errors.images}
                            touched={touched.images}
                        ></ImageListGroup>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Create
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default ProductCreate;
