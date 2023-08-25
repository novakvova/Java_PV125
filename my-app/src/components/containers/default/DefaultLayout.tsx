import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
    return (
        <>
            <DefaultHeader />
            <div className="container">
                {/* Сюди підставляється компонет один із групи комеонетів, які відносяться до даного Layout */}
                <Outlet/>
            </div>
        </>
    );
};

export default DefaultLayout;
