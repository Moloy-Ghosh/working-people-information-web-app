import React from "react";
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Search =() =>{

   const [isEnabled, setIsEnabled] = useState(false);
   const[id,setId]=useState(undefined);
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
         },[id]);

         const getId=(e)=>{
            setId(e.target.value);
         }

         const getProfile = (e) => {
            e.preventDefault();
            const profile = profiles.find(p => p.id === id);
            if(profile===undefined){
               alert(`There is not any data with this id.`);
            }
            else{
               setIsEnabled(true);
               setProfile(profile);
               setId(undefined);
            }
          };

          const clrSrc=()=>{
            setId(undefined);
            setProfile({id:'', name:'', pass:{deg:'', year:null},sex:'', guardian:{name:'', relation:''}, religion:'', bloodg:'',active:null});
          }


   return(
      <div className="srcp">
         <form onSubmit={getProfile}>
            <input className="search-box" placeholder="Give the person's App Id here" type="number" onChange={getId}/>
            <button className="search-button" type="submit">Search</button>
            <button type="reset" className="search-button" onClick={clrSrc}>Clear</button>
         </form>
          <p>
            <ul><strong className="srcpf">Name:</strong> {profile.name}</ul>
            <ul><strong className="srcpf">Educational Passing Year:</strong> {profile.pass.year}</ul>
            <ul><strong className="srcpf">Degree:</strong> {profile.pass.deg}</ul>
            <ul><strong className="srcpf">Sex:</strong> {profile.sex}</ul>
            <ul><strong className="srcpf">Guardian Name:</strong> {profile.guardian.name}</ul>
            <ul><strong className="srcpf">Relation With Guardian:</strong> {profile.guardian.relation}</ul>
            <ul><strong className="srcpf">Religion:</strong> {profile.religion}</ul>
            <ul><strong className="srcpf">Blood Group:</strong> {profile.bloodg}</ul>
            <ul><strong className="srcpf"> {profile.active=== "1"? "Active" : "Not Active"}</strong></ul>
            <ul><button className="search-button" onClick={()=> handleClick(profile)} disabled={!isEnabled}>Update</button></ul>
          </p>
      </div>
   );
};

export default Search;