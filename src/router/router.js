import {createBrowserRouter} from "react-router-dom";
import Root from "../Pages/RootLayout";
import About from "../Pages/About";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import Formpage from "../Pages/Formpage";
import Search from "../Pages/Search";


export const router = createBrowserRouter([
   {
      path:'/',
      element:<Root/>,
      errorElement:<ErrorPage/>,
      children:[
         {index:true, element:<Formpage/>},
         {path:"/app", element:<App/>},
         {path:"/about", element:<About/>},
         {path:"/search", element:<Search/>}
      ],
   }
]);