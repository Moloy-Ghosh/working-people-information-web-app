import React from "react";
import {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";


const Formpage=() =>{

   const {state}= useLocation();

   console.log(state);

   const[profile,setProfile]=useState({id:'', name:'', pass:{deg:'', year:null}, sex:'', guardian:{name:'', relation:''}, religion:'', bloodg:'',active:null});
   const[name,setName]=useState('');
   const[deg,setDeg]=useState('');
   const[year,setYear]=useState(null);
   const[nameg,setNameg]=useState('');
   const[rel,setRel]=useState('');
   const[religion,setReligion]=useState('');
   const[bloodg,setBloodg]=useState('');
   const[active,setActive]=useState('');
   const[sex,setSex]=useState('');
   const[profiles,setProfiles]=useState([
      {id:7, name:'Moloy', pass:{deg:'BSc. in CSE', year:2025},sex:"male", guardian:{name:'Milon', relation:'Father'}, religion:'Hindu', bloodg:'O+',active:0}
   ]);
   const [edit, setEdit]=useState(false);
   const [editable,setEditable]=useState({}); 
   
      const getAllProfiles=()=>{
         fetch(`http://localhost:4000/profiles`)
         .then((res)=>res.json())
         .then((data)=>setProfiles(data));
      };
   
      useEffect(()=>{
         getAllProfiles();
      },[]);



   const changeNameHandler=(e)=>{
      setName(e.target.value);
   }
   const changeDegHandler=(e)=>{
      setDeg(e.target.value);
   }
   const changeYearHandler=(e)=>{
      setYear(e.target.value);
   }
   const changeGNameHandler=(e)=>{
      setNameg(e.target.value);
   }
   const changeRelationHandler=(e)=>{
      setRel(e.target.value);
   }
   const changeReligionHandler=(e)=>{
      setReligion(e.target.value);
   }
   const changeBloodgHandler=(e)=>{
      setBloodg(e.target.value);
   }
   const activeHandler=(e)=>{
      setActive(e.target.value);
   }
   const sexHandler=(e)=>{
      setSex(e.target.value);
   }

   const submitHandler=(e)=>{
      e.preventDefault();
      if(name.trim()===""){
         return alert(`You must need a profile name.`);
      }
      else if(deg.trim()===""){
         return alert(`You must need a degree.`);
      }
      else if(year.trim()===""){
         return alert(`You must need a passing year.`);
      }
      else if(sex.trim()===""){
         return alert(`You must need a sex`);
      }
      else if(nameg.trim()===""){
         return alert(`You must need a guardian name.`);
      }
      else if(rel.trim()===""){
         return alert(`You must need the relation between your guardian.`);
      }
      else if(religion.trim()===""){
         return alert(`You must need a religion name.`);
      }
      else if(bloodg.trim()===""){
         return alert(`You must need your blood group.`);
      }
      else if(active==""){
         return alert(`You must neet to set it is active or not active`);
      }
      else edit? editHandler():createHandler();
   }

   const createHandler=()=>{
      const newProfile={
         id:Date.now()+"",
         name:name,
         pass:{
            deg:deg,
            year:year
         },
         sex:sex,
         guardian:{
            name:nameg,
            relation:rel
         },
         religion:religion,
         bloodg:bloodg,
         active:active
      }
      fetch(`http://localhost:4000/profiles`,{
         method:"POST",
         body:JSON.stringify(newProfile),
         headers:{
            "Content-type":"application/json",
         },
      }).then(()=>{
         //refetch
         getAllProfiles();
      });
      //setNotes([newNote,...notes]);
      setName(''); 
      setDeg(''); 
      setYear(null); 
      setSex('');
      setNameg(''); 
      setRel(''); 
      setReligion(''); 
      setBloodg('');
      setActive(null);
   }

   const editHandler=()=>{
      const {id,...rest}=editable;
      const updatedProfile={...rest,
         name:name,
         pass:{
            deg:deg,
            year:year
         },
         sex:sex,
         guardian:{
            name:nameg,
            relation:rel
         },
         religion:religion,
         bloodg:bloodg,
         active:active
      };
      fetch(`http://localhost:4000/profiles/${editable.id}`,{
         method:"PUT",
         body:JSON.stringify(updatedProfile),
         headers:{
            "Content-type":"application/json"
         },
      }).then(()=>{
         //refetch
         getAllProfiles();
         setName(''); 
         setDeg(''); 
         setYear(null); 
         setSex('');
         setNameg(''); 
         setRel(''); 
         setReligion(''); 
         setBloodg('');
         setActive(null);
         setEdit(false);
      })

   }


   useEffect(() => {
      if (state !== null) {
        updateHandler(state);
      }
    }, [state]);

    const updateHandler=(profile)=>{
      setEdit(true);
      setEditable(profile);
      
      setName(profile.name);
      setDeg(profile.pass.deg); 
      setSex(profile.sex);
      setYear(profile.pass.year); 
      setNameg(profile.guardian.name); 
      setRel(profile.guardian.relation); 
      setReligion(profile.religion); 
      setBloodg(profile.bloodg);
      setActive(profile.active);
    }


   return (
      <div>
         <form onSubmit={submitHandler}>
            <input
            type="text"
            value={name}
            onChange={changeNameHandler}
            placeholder="Name"
            />
            <input
            type="text"
            value={deg}
            onChange={changeDegHandler}
            placeholder="Degree"
            />
            <input
            type="text"
            value={year}
            onChange={changeYearHandler}
            placeholder="Passing Year"
            />
            <input
            type="text"
            value={sex}
            onChange={sexHandler}
            placeholder="Sex"
            />
            <input
            type="text"
            value={nameg}
            onChange={changeGNameHandler}
            placeholder="Guardian Name"
            />
            <input
            type="text"
            value={rel}
            onChange={changeRelationHandler}
            placeholder="Relation between Guardian"
            />
            <input
            type="text"
            value={religion}
            onChange={changeReligionHandler}
            placeholder="Religion"
            />
            <input
            type="text"
            value={bloodg}
            onChange={changeBloodgHandler}
            placeholder="Blood Group"
            />
            <input type="radio" name="active" value="1" onChange={activeHandler}/>Active
            <input type="radio" name="active" value="0" onChange={activeHandler}/>Not Active
            <button type="submit">{edit?"Edit Person" : "Add Person"}</button>
         </form>
      </div>
   );
};

export default Formpage;