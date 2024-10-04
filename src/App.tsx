import "./App.css";
import { useRoutes } from "react-router-dom";
import LayoutUser from "./layouts/user/LayoutUser";

import LayoutAdmin from "./layouts/admin/LayuotAdmin"; // Fixed typo
import ProductItem from "./components/User/ProductItem";
import Contact from "./components/User/Contact";
import DetaillProduct from "./components/User/DetaillProduct";
import Cart from "./components/User/Cart";
import CheckOut from "./components/User/CheckOut";
import Oder from "./components/User/Oder";
import HomeAdmin from "./components/Admin/HomeAdmin";
import ListProduct from "./components/Admin/ListProduct";
import OderAdmin from "./components/Admin/OderAdmin";
import Statical from "./components/Admin/Statical";
import Voicher from "./components/Admin/Voicher";
import AddProduct from "./components/Admin/AddProduct";
import EditProduct from "./components/Admin/EditProduct";
import ProductContext from "./context/ProductContext";
import ColorContext from "./context/ColorContext";
import SizeContext from "./context/SizeContext";
import BrandContext from "./context/BrandContext";
import ColorDetail from "./components/Admin/ColorDetail";
import CategoryContext from "./context/CategoryContext";
import ProductDetail from "./components/Admin/ProductDetail";
import StoppedProducts from "./components/Admin/StoppedProducts";
import ManagementPage from "./components/Admin/ManagementPage";
import Register from "./components/acc/Register";
import Login from "./components/acc/Login";
import OrderContext from "./context/OrderContext";
import VoucherProvider from "./context/VoucherContext";
import { UserProvider } from "./context/UserContext";
import AccountList from "./components/Admin/AccountList";
import ReviewContext from "./context/ReviewContext";
// import CustomerManagement from './components/Admin/AccountList';
// import { UserProvider } from './context/UserConText';

function App() {
  const router = useRoutes([
    {
      path: "",
      element: (
        <UserProvider>
          <ProductContext>
            <VoucherProvider>
              <OrderContext>
                <CategoryContext>
                  <BrandContext>
                    <SizeContext>
                      <ColorContext>
                        <LayoutUser />
                      </ColorContext>
                    </SizeContext>
                  </BrandContext>
                </CategoryContext>
              </OrderContext>
            </VoucherProvider>
          </ProductContext>
        </UserProvider>
      ),
      children: [
        { path: "", element: <h1>Trang chủ</h1> },
        { path: "Listitem", element: <ProductItem /> },
        { path: "contact", element: <Contact /> },
        { path: "detail", element: <DetaillProduct /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <CheckOut /> },
        { path: "oder", element: <Oder /> },
        { path: "*", element: <h1>404 Not Found</h1> },
      ],
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    {
      path: "admin",
      element: (
        <ReviewContext>
          <UserProvider>
            <ProductContext>
              <VoucherProvider>
                <OrderContext>
                  <CategoryContext>
                    <BrandContext>
                      <SizeContext>
                        <ColorContext>
                          <LayoutAdmin />
                        </ColorContext>
                      </SizeContext>
                    </BrandContext>
                  </CategoryContext>
                </OrderContext>
              </VoucherProvider>
            </ProductContext>
          </UserProvider>
        </ReviewContext>
        ),
      children: [
        { path: "", element: <HomeAdmin /> },
        { path: "products", element: <ListProduct /> },
        { path: "product/add", element: <AddProduct /> },
        { path: "product/edit/:id", element: <EditProduct /> },
        { path: "products/stopped", element: <StoppedProducts /> },
        { path: "checkout", element: <OderAdmin /> },
        { path: "users", element: <AccountList /> },
        { path: "statical", element: <Statical /> },
        { path: "voicher", element: <Voicher /> },
        { path: "product/:id", element: <ProductDetail /> },
        { path: "all", element: <ManagementPage /> },
        { path: "color/edit/:id", element: <ColorDetail /> },
        { path: "size/edit/:id", element: <ColorDetail /> },
        { path: "category/edit/:id", element: <ColorDetail /> },
        { path: "brand/edit/:id", element: <ColorDetail /> },
        {
          path: "*",
          element: (
            <h1 className="flex justify-center items-center h-screen text-2xl font-bold">
              Không tìm thấy
            </h1>
          ),
        },
      ],
    },
  ]);

  return router;
}

export default App;
