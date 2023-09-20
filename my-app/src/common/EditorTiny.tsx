import { Editor, IAllProps } from "@tinymce/tinymce-react";
import classNames from "classnames";
import { FC } from "react";

//Властивості, які приймає компонент
interface IEditorProps extends IAllProps {
    //тут міститься метод onEditorChange - який відслідковує зміни в едіторі
    label: string; //Назва самого інпута
    field: string; //ідентифікатор інпута
    error?: string | undefined;
    touched?: boolean | undefined;
}

const EditorTiny: FC<IEditorProps> = ({
                                          label,
                                          field,
                                          error,
                                          touched,
                                          ...props //Усі інши параметри, наприклад onEditorChange
                                      }) => {
    return (
        <div className="mb-3">
            <label htmlFor={field} className="form-label">
                {label}
            </label>
            <div
                className={classNames(
                    "form-control",
                    { "is-invalid border border-4 border-danger": touched && error },
                    { "is-valid border border-4 border-success": touched && !error }
                )}
            >
                <Editor
                    apiKey="kupo4zsw0i57zu17oxr8yc4hodzerjbh2x7s1xv8l41owg6h"
                    // initialValue="<p>This is the initial content of the editor</p>"
                    init={{
                        height: 500, //висота самого інтупа
                        language: "uk", //мова панелі
                        menubar: true, //показувать меню
                        images_file_types: "jpg,jpeg", //формати файлі, які можна обирать - фото
                        block_unsupported_drop: false,
                        menu: {
                            file: {
                                title: "File",
                                items: "newdocument restoredraft | preview | print ",
                            },
                            edit: {
                                title: "Edit",
                                items: "undo redo | cut copy paste | selectall | searchreplace",
                            },
                            view: {
                                title: "View",
                                items:
                                    "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen",
                            },
                            insert: {
                                title: "Insert",
                                items:
                                    "image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime",
                            },
                            format: {
                                title: "Format",
                                items:
                                    "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat",
                            },
                            tools: {
                                title: "Tools",
                                items: "spellchecker spellcheckerlanguage | code wordcount",
                            },
                            table: {
                                title: "Table",
                                items: "inserttable | cell row column | tableprops deletetable",
                            },
                            help: { title: "Help", items: "help" },
                        },
                        plugins: [
                            "advlist autolink lists link image imagetools charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen textcolor ",
                            "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                            "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | forecolor backcolor",
                        content_langs: [
                            { title: "English", code: "en" },
                            { title: "Українська", code: "ua" },
                        ],
                        content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        //Дає можливість завантажувать фото на серве
                        //Зявляється кнопка обрати фото

                    }}
                    //outputFormat="html"
                    //toolbar="code"
                    {...props} //до Eдітора додаємо усі властивості в вказіник onEditorChange
                />
            </div>
            {touched && error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default EditorTiny;
