import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import AdminDashboard from "../../Pages/Dashboard/AdminDashboard";
import SellerDashboard from "../../Pages/Dashboard/SellerDashboard";
import UserDashboard from "../../Pages/Dashboard/UserDashboard";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Error from "../../Pages/Shared/Error/Error";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import AdminRoute from '../AdminRoute/AdminRoute'
import SellerRoute from '../SellerRoute/SellerRoute'
import UserRoute from '../UserRoute/UserRoute'
import AddAProduct from '../../Pages/SellerDashboard/AddAProduct'
import MyProducts from "../../Pages/SellerDashboard/MyProducts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/admin',
                element:<PrivetRoute> <AdminRoute><AdminDashboard> </AdminDashboard></AdminRoute></PrivetRoute>
            },
            {
                path: '/seller',
                element: <PrivetRoute><SellerRoute><SellerDashboard></SellerDashboard></SellerRoute></PrivetRoute>,
                children: [
                    {
                        path: '/seller/',
                        element: <PrivetRoute><SellerRoute><MyProducts></MyProducts></SellerRoute></PrivetRoute>
                    },
                    {
                        path: '/seller/addproduct',
                        element: <PrivetRoute><SellerRoute> <AddAProduct></AddAProduct></SellerRoute></PrivetRoute>
                    }
                ]
            },
            {
                path: '/user',
                element: <PrivetRoute><UserRoute><UserDashboard></UserDashboard></UserRoute></PrivetRoute>
            },
           
        ]
    }
])
export default router