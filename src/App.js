import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

function App() {
   const[profiles,setProfiles]=useState([]);

   const navigate = useNavigate();

   const handleClick = (singleProfile) => {
      navigate('/', {
        state: singleProfile
      });
    };

   const getAllProfiles=()=>{
      fetch(`http://localhost:4000/profiles`)
      .then((res)=>res.json())
      .then((data)=>setProfiles(data));
   };

   useEffect(()=>{
      getAllProfiles();
   },[]);

   const deleteHandler=(id)=>{
      fetch(`http://localhost:4000/profiles/${id}`,{
         method: "DELETE",
      }).then(()=>{
         //refetch
         fetch(`http://localhost:4000/profiles`)
         .then((res)=>res.json())
         .then((data)=>setProfiles(data));
      });
   }


  return (
    <div className="App">
      

      <h2>All Names</h2>
      <div>
         {profiles.map((singleProfile)=>(
            <>
            <li key={singleProfile.id}>
               <p>App Id: {singleProfile.id}</p>
               <p>Name: <span className="nm">{singleProfile.name}</span></p>
               <p>Pass: Year: {singleProfile.pass.year} Degree:{singleProfile.pass.deg}</p>
               <p>Sex: {singleProfile.sex}</p>
               <p>Guardian: Name: {singleProfile.guardian.name} Relation: {singleProfile.guardian.relation}</p>
               <p>Blood-Group:{singleProfile.bloodg}</p>
               <p>{singleProfile.active==="1" ? "Active" : "Not Active"}</p>
               <button className="Appbtn" onClick={()=> handleClick(singleProfile)}>Update</button>
               <button className="Appbtn" onClick={()=> deleteHandler(singleProfile.id)}>Delete</button>
               <hr/>
            </li>
            </>
            ))}
      </div>
    </div>
  );
}

export default App;