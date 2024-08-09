import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormDisplay from "./Pages/Auth/FormDisplay";
import Header from "./Pages/Components/Header";
import AddProduct from "./Pages/AddProduct/AddProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { apiClient } from "./lib/apiClient";
import { GET_USER_INFO_ROUTE } from "./utils/constant";
import { userInfoActions } from "./ReduxStore/Slices/userInfoSlice";

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((store) => store.userInfo);
  const isPrivateRoute = !!userInfo;
  return isPrivateRoute ? children : <Navigate to={"/auth"} />;
};

const AuthRoute = ({ children }) => {
  const userInfo = useSelector((store) => store.userInfo);
  const isAuthRoute = !!userInfo;
  return isAuthRoute ? <Navigate to={"/add-product"} /> : children;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector((store) => store.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getUserInfo = async () => {
        setIsLoading(true);
        const responce = await apiClient(GET_USER_INFO_ROUTE, {
          withCredentials: true,
        });
        if (responce.status === 200 && responce.data.user.isAdmin) {
          dispatch(userInfoActions.setUserInfo(responce.data.user));
        }
      };
      if (!userInfo) {
        getUserInfo();
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

    return () => {};
  }, [userInfo]);

  if (isLoading) return <>Loading...</>;

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <FormDisplay />
              </AuthRoute>
            }
          ></Route>

          <Route path="/add-product" element={<Header />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              }
            ></Route>
          </Route>

          <Route path="/*" element={<Navigate to={"/auth"} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
