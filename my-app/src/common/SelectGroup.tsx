import { ChangeEvent, FC, InputHTMLAttributes } from "react";

interface Option {
    id: number;
    name: string;
}

interface SelectGroupProps<T extends Option>
    extends InputHTMLAttributes<HTMLSelectElement> {
    label: string;
    field: string;
    handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    error?: string | undefined;
    touched?: boolean | undefined;
    handleBlur: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: T[];
    optionKey: keyof T;
    optionLabel: keyof T;
    initialCategoryId?: number | null;
}

const SelectGroup: FC<SelectGroupProps<Option>> = ({
                                                       label,
                                                       field,
                                                       handleBlur,
                                                       error,
                                                       touched,
                                                       handleChange,
                                                       options,
                                                       optionKey,
                                                       optionLabel,
                                                       initialCategoryId,
                                                   }) => {
    return (
        <>
            <div className="mb-6">
                <select
                    onBlur={handleBlur}
                    name={field}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        error && touched
                            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                            : ""
                    }`}
                    onChange={handleChange}
                >
                    <option value={-1}>Choose a {label}</option>
                    {options.map((item) => (
                        <option
                            key={item[optionKey]}
                            value={item[optionKey]}
                            selected={item[optionKey] === initialCategoryId}
                        >
                            {item[optionLabel]}
                        </option>
                    ))}
                </select>
                {error && touched && (
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {error}
                    </div>
                )}
            </div>
        </>
    );
};

export default SelectGroup;
