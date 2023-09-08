export interface IPorductCreate {
    name: string,
    description: string,
    price: number,
    category_id: number,
    files: Array<File>,
}

export interface IProductItem {
    id: number|string|undefined,
    name: string,
    description: string,
    price: number,
    category: string,
    category_id: string,
    files: Array<string>,
}

export interface IPorductEdit {
    name: string,
    price: number,
    description: string,
    category_id: string,
    files: Array<File>,
    removeFiles: string[]
}
