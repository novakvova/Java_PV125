import {ChangeEvent, FC, InputHTMLAttributes} from "react";


interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    type?: "text"|"password"|"email"|"number",
    field: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    // error?: string|undefined,
    // touched?: boolean|undefined
}

const InputGroup : FC<InputGroupProps> = ({
    label,
    type="text",
    field,
    value,
    onChange
    // error,
    // touched
    }) => {

    return (
        <>
            <div>
                <label
                    htmlFor="name"
                    className="text-sm text-gray-700 block mb-1 font-medium"
                >
                    {label}
                </label>
                <input
                    type={type}
                    name={field}
                    value={value}
                    onChange={onChange}
                    id={field}
                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                    placeholder="Вкажіть назву категорії"
                />
            </div>
        </>
    )
}

export default InputGroup;
