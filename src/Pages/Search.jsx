import React from "react";
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Search =() =>{

   const [isEnabled, setIsEnabled] = useState(false);
   const[id,setId]=useState(null);
   const[profile,setProfile]=useState({id:'', name:'', pass:{deg:'', year:null},sex:'', guardian:{name:'', relation:''}, religion:'', bloodg:'',active:null});
   const[profiles,setProfiles]=useState([
         {id:12, name:'Moloy', pass:{deg:'BSc. in CSE', year:2025},sex:"male", guardian:{name:'Milon', relation:'Father'}, religion:'Hindu', bloodg:'O+',active:0}
      ]);


      const navigate = useNavigate();

      const handleClick = (profile) => {
         navigate('/', {
           state: profile
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

         const getId=(e)=>{
            setId(e.target.value);
         }

         const getProfile = (e) => {
            e.preventDefault();
            const profile = profiles.find(p => p.id === id);
            if(profile==undefined){
               alert(`There is not any data with this id.`);
            }
            else{
               setProfile(profile);
               setId(null);
            }
          };


   return(
      <div>
         <form onSubmit={getProfile}>
            <input type="number" value={id} onChange={getId}/>
            <button type="submit" onClick={() => setIsEnabled(true)}>Search</button>
         </form>
          <li>
            <ul>Name: {profile.name}</ul>
            <ul>Educational Passing Year: {profile.pass.year}</ul>
            <ul>Degree:{profile.pass.deg}</ul>
            <ul>Sex: {profile.sex}</ul>
            <ul>Guardian Name: {profile.guardian.name}</ul>
            <ul>Relation With Guardian: {profile.guardian.relation}</ul>
            <ul>Religion: {profile.religion}</ul>
            <ul>Blood Group: {profile.bloodg}</ul>
            <ul> {profile.active=== "1"? "Active" : "Not Active"}</ul>
            <ul><button onClick={()=> handleClick(profile)} disabled={!isEnabled}>Update</button></ul>
          </li>
      </div>
   );
};

export default Search;