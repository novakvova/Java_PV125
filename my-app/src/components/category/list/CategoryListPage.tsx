import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {ICategoryItem} from "./types.ts";
import http_common from "../../../http_common.ts";
import ModalDelete from "../../../common/ModalDelete.tsx";

const CategoryListPage = () => {
    const [list, setList] = useState<ICategoryItem[]>([]);

    const getData = () => {
        http_common
            .get<ICategoryItem[]>("/category")
            .then((resp) => {
                //console.log("Categories", resp.data);
                setList(resp.data);
            });
    }
    useEffect(() => {
        getData();
    }, []);

    const onHendlerDelete = async (id: number) => {
        try {
            await http_common.delete("/category/" + id);
            getData();
        } catch (error) {
            console.log("Error Delete", error);
        }
        //console.log("Delete product: ", id);
    };

    const content = list.map((c) => {
        return (
            <tr key={c.id}>
                <th scope="row">{c.id}</th>
                <td>{c.name}</td>
                <td>{c.image}</td>
                <td>{c.description}</td>
                <td>
                    <Link
                        to={`/category/edit/${c.id}`}
                        className="btn btn-info"
                    >
                        Змінити
                    </Link>
                </td>
                <td>
                    <ModalDelete
                        id={c.id}
                        text={`Ви дійсно бажаєте видалиати '${c.name}'?`}
                        deleteFunc={onHendlerDelete}
                    />
                </td>
            </tr>
        );
    });

    return (
        <>
            <div className="container">
                <h1 className="text-center">Список категорій</h1>
                <Link to="/create" className="btn btn-success">
                    Додати
                </Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Назва</th>
                        <th scope="col">Фото</th>
                        <th scope="col">Опис</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>


        </>
    );
};

export default CategoryListPage;
