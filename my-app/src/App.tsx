import './App.css'
import { Suspense, lazy, useEffect, useState } from 'react';
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
import CategoryListPage from "./components/category/list/CategoryListPage.tsx";
import CategoryCreatePage from "./components/category/create/CategoryCreatePage.tsx";
import ProductCreatePage from "./components/product/create/ProductCreatePage.tsx";
import Login from "./components/auth/login";
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';

const AdminLayout = lazy(() => import('./layout/AdminLayout.tsx'));

function App() {

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);


    return loading ? (
        <Loader />
    ) : (
        <>
            <Toaster position='top-right' reverseOrder={false} containerClassName='overflow-auto'/>

            <Routes>
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route element={<AdminLayout />}>
                    <Route index element={<ECommerce />} />
                    {routes.map(({ path, component: Component }) => (
                        <Route
                            path={path}
                            element={
                                <Suspense fallback={<Loader />}>
                                    <Component />
                                </Suspense>
                            }
                        />
                    ))}
                </Route>
            </Routes>
        </>
    );

  // return (
  //   <>
  //       <Routes>
  //           <Route path={"/"} element={<DefaultLayout/>}>
  //               <Route index element={<CategoryListPage />} />
  //               <Route path={"create"} element={<CategoryCreatePage />} />
  //               <Route path={"product"}>
  //                   <Route path={"create"} element={<ProductCreatePage/>} />
  //               </Route>
  //               <Route path={"login"} element={<Login />}></Route>
  //           </Route>
  //       </Routes>
  //   </>
  // )
}

export default App
