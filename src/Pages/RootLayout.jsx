import {Outlet, Link} from "react-router-dom";

export default function Root(){
   return(
      <>
      <div id="sidebar">
         <h1>Active People Information App</h1>
         <nav>
            <ul>
               <li>
                  <Link to={'/'}>Form</Link>
               </li>
               <li>
                  <Link to={'/search'}>Search</Link>
               </li>
               <li>
                  <Link to={'/app'}>Information</Link>
               </li>
               <li>
                  <Link to={'/about'}>About</Link>
               </li>
            </ul>
         </nav>
      </div>
      <div id="detail">
         <Outlet/>
      </div>
      </>
   );
}