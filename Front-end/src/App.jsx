import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FormDisplay from "./Pages/Auth/FormDisplay";
import ShopOutlet from "./Pages/Shop/index";
import Shop from "./Pages/Shop/Shop/shop";
import Kids from "./Pages/Shop/Kids/Kids";
import Men from "./Pages/Shop/Men/Men";
import Women from "./Pages/Shop/Women/Women";
import Home from "./Pages/Home/LandingPage/Main";
import Profile from "./Pages/Profile/Profile";
import Cart from "./Pages/Cart/index";
import ProductDisplay from "./Pages/ProductDisplay/ProductDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_PRODUCTS,
  GET_NEW_COLLECTION,
  GET_USER_INFO_ROUTE,
  GET_PROFILE_INFORMATION_ROUTE,
} from "./utils/constant";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiClient } from "./lib/apiClient";
import { userInfoActions } from "./ReduxStore/Slices/userInfoSlice";
import { personalInformationAction } from "./ReduxStore/Slices/personal-information-slice";
import { newCollectionSliceActions } from "./ReduxStore/Slices/newCollectionSlice";
import Header from "./Pages/Components/Header";
import Footer from "./Pages/Components/Footer";
import UserProfile from "./Pages/Profile/Outlet/UserProfile";
import UserSetting from "./Pages/Profile/Outlet/UserSetting";
import { useLocation } from "react-router-dom";
import { productAction } from "./ReduxStore/Slices/productsSlice";

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((store) => store.userInfo);
  const isPrivateRoute = !!userInfo;
  return isPrivateRoute ? children : <Navigate to={"/auth"} />;
};

const AuthRoute = ({ children }) => {
  const userInfo = useSelector((store) => store.userInfo);
  const isAuthRoute = !!userInfo;
  return isAuthRoute ? (
    <Navigate to={userInfo.profileSetup ? "/home" : "/profile"} />
  ) : (
    children
  );
};

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [isLoading, setIsLoding] = useState(true);
  const userInfo = useSelector((store) => store.userInfo);
  const personalInfo = useSelector((store) => store.personalInfo);
  const allProducts = useSelector((store) => store.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const responce = await apiClient.get(GET_USER_INFO_ROUTE, {
          withCredentials: true,
        });
        if (responce.status === 200) {
          dispatch(userInfoActions.setUserInfo(responce.data.user));
        } else if (responce.status === 201) {
          setIsLoding(false);
        }
      } catch (error) {
        dispatch(userInfoActions.setUserInfo(null));
      }
    };

    if (!userInfo) {
      getUserInfo();
    }

    const getNewCollection = async (req, res) => {
      try {
        const responce = await apiClient.get(GET_NEW_COLLECTION, {
          withCredentials: true,
        });
        if (responce.status === 200) {
          dispatch(
            newCollectionSliceActions.setNewCollection(
              responce.data.newCollection
            )
          );
        }
      } catch (error) {
      } finally {
        if (allProducts) {
          setIsLoding(false);
        }
      }
    };

    if (userInfo) {
      getNewCollection();
    }
    return () => {};
  }, [userInfo]);

  useEffect(() => {
    try {
      const getPersonalInfo = async () => {
        try {
          setIsLoding(true);
          const responce = await apiClient.get(GET_PROFILE_INFORMATION_ROUTE, {
            withCredentials: true,
          });
          if (responce.status === 200) {
            dispatch(
              personalInformationAction.setPersonalInformation(
                responce.data.personalInformation
              )
            );
          }
        } catch (error) {
        } finally {
          if (allProducts) {
            setIsLoding(false);
          }
        }
      };
      if (userInfo?.profileSetup && !personalInfo) {
        getPersonalInfo();
      }
    } catch (error) {}
  }, [userInfo, personalInfo, dispatch]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const responce = await apiClient.get(GET_ALL_PRODUCTS, {
          withCredentials: true,
        });

        if (responce.status === 200) {
          dispatch(productAction.setProducts(responce.data.products));
        }
      } catch (error) {
        toast.error("somthing went wrong");
      } finally {
        setIsLoding(false);
      }
    };
    if (!allProducts && userInfo) {
      getProducts();
    }
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

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Layout>
                  <Profile />
                </Layout>
              </PrivateRoute>
            }
          >
            <Route index element={<UserProfile />}></Route>
            <Route path="setting" element={<UserSetting />}></Route>
          </Route>

          <Route
            path="/shop"
            element={
              <PrivateRoute>
                <Layout>
                  <ShopOutlet />
                </Layout>
              </PrivateRoute>
            }
          >
            <Route index element={<Shop />}></Route>
            <Route path="kids" element={<Kids />}></Route>
            <Route path="men" element={<Men />}></Route>
            <Route path="women" element={<Women />}></Route>
            <Route path=":name/:itemId" element={<ProductDisplay />}></Route>
          </Route>

          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Layout>
                  <Cart />
                </Layout>
              </PrivateRoute>
            }
          ></Route>

          <Route path="/*" element={<Navigate to={"/auth"} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
