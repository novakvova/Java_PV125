import { ChangeEvent, FC, InputHTMLAttributes } from "react";

interface TextAreaGroupProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    field: string;
    handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string | undefined;
    touched?: boolean | undefined;
    handleBlur: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaGroup: FC<TextAreaGroupProps> = ({
                                                   label,
                                                   field,
                                                   handleBlur,
                                                   error,
                                                   touched,
                                                   handleChange,
                                                   value,
                                               }) => {
    return (
        <>
            <div className="mb-6">
        <textarea
            onBlur={handleBlur}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                error && touched
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                    : ""
            }`}
            placeholder={label}
            name={field}
            aria-label={label}
            aria-describedby="basic-addon2"
            onChange={handleChange}
            value={value}
        />
                {error && touched && (
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {error}
                    </div>
                )}
            </div>
        </>
    );
};

export default TextAreaGroup;
