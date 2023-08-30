import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
    return (
        <>
            <DefaultHeader />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Сюди підставляється компонет один із групи комеонетів, які відносяться до даного Layout */}
                <Outlet/>
            </div>
        </>
    );
};

export default DefaultLayout;
