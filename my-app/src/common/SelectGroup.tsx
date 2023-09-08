import {ChangeEvent, FC, InputHTMLAttributes} from "react";
import {ICategoryItem} from "../components/category/list/types.ts";


interface SelectGroupProps extends InputHTMLAttributes<HTMLSelectElement> {
    label: string,
    field: string,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    items: ICategoryItem[]
    // error?: string|undefined,
    // touched?: boolean|undefined
}

const SelectGroup : FC<SelectGroupProps> = ({
    label,
    field,
    onChange,
    items
    // error,
    // touched
    }) => {

    const content = items.map((item) => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ));

    return (
        <>
            <div>
                <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {label}
                </label>
                <select
                    onChange={onChange}
                    id={field}
                    name={field}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option selected>Виберіть значення</option>
                    {content}

                </select>
            </div>
        </>
    )
}

export default SelectGroup;
