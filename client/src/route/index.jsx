import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/Home';
import App from '../App';
import SearchPage from '../pages/SearchPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import OtpVerification from '../pages/OtpVerification';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import UserMenuMobile from '../pages/UserMenuMobile';
import Dashboard from '../layout/Dashboard';
import Profile from '../pages/Profile';
import MyOrder from '../pages/MyOrder';
import Address from '../pages/Address';
import Category from '../pages/Category';
import SubCategory from '../pages/SubCategory';
import UploadProduct from '../pages/UploadProduct';
import ProductAdmin from '../pages/ProductAdmin';


const Router = createBrowserRouter([

    {
        path :'/',
        element : <App/>,
        children:[
            {
                path : "/",
                element : <Home/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },{
                path : "login",
                element : <Login/>
            },{
                path : "register",
                element : <Register/>
            },{
                path: "forgot-password",
                element: <ForgotPassword/>
            },{
                path : "OtpVerification",
                element : <OtpVerification/>
            },{
                path : "reset-password",
                element : <ResetPassword/>
            },{
                path : "user",
                element : <UserMenuMobile/>
            },{
                path : "dashboard",
                element : <Dashboard/>,
                children :[
                    {
                        path : "profile",
                        element : <Profile/>
                    },{
                        path : "myorder",
                        element : <MyOrder/>
                    },{
                        path : "address",
                        element : <Address/>
                    },{
                        path : "category",
                        element : <Category/>
                    },{
                        path : "subcategory",
                        element : <SubCategory/>
                    },{
                        path : "upload-product",
                        element : <UploadProduct/>
                    },{
                        path : "product",
                        element : <ProductAdmin/>                       
                    }


                ]
            }
            


        ]
    }
])

// export default Router;
export default Router;