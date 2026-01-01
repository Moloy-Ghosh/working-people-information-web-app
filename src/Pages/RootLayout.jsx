import {Outlet, Link} from "react-router-dom";
import '../App.css';

export default function Root(){
   return(
      <>
      <div id="sidebar" className="mnpg">
         <h1>Active People Information App</h1>
         <nav>
            <ul>
               <li className="mnpgli">
                  <Link to={'/'} className="mnpglnk">Form</Link>
               </li>
               <li className="mnpgli">
                  <Link to={'/search'} className="mnpglnk">Search</Link>
               </li>
               <li className="mnpgli">
                  <Link to={'/app'} className="mnpglnk">Information</Link>
               </li>
               <li className="mnpgli">
                  <Link to={'/about'} className="mnpglnk">About</Link>
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