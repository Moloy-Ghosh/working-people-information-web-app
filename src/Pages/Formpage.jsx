import React from "react";
import {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";


const Formpage=() =>{

   const {state}= useLocation();

   
   const[name,setName]=useState('');
   const[deg,setDeg]=useState('');
   const[year,setYear]=useState(null);
   const[nameg,setNameg]=useState('');
   const[rel,setRel]=useState('');
   const[religion,setReligion]=useState('');
   const[bloodg,setBloodg]=useState('');
   const[active,setActive]=useState('');
   const[sex,setSex]=useState('');
   const [edit, setEdit]=useState(false);
   const [editable,setEditable]=useState({}); 



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
      else if(active===""){
         return alert(`You must neet to set it is active or not active`);
      }
      else edit? editHandler():createHandler();
   }

   const createHandler=()=>{
      const randomId=Date.now()+"";
      const newProfile={
         id:randomId,
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
      setName(''); 
      setDeg(''); 
      setYear(null); 
      setSex('');
      setNameg(''); 
      setRel(''); 
      setReligion(''); 
      setBloodg('');
      setActive(null);
      });
      alert(`Person's data is saved. App id is: `+randomId);
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

    const clrHandler=()=>{
      setName('');
      setDeg(''); 
      setSex('');
      setYear(''); 
      setNameg(''); 
      setRel(''); 
      setReligion(''); 
      setBloodg('');
      setActive('');
    }


   return (
      <div className="fftn">
         <h2>Single person's information form:</h2>
         <form onSubmit={submitHandler}>

            <div>
               <label for="name">Person's Name:</label> <br/>
               <input
               type="text"
               name="name"
               value={name}
               onChange={changeNameHandler}
               placeholder="Name"
               /><br/><hr/>
            </div>

            <div>
               <label for="deg">Person's Degree:</label> <br/>
               <input
               type="text"
               name="deg"
               value={deg}
               onChange={changeDegHandler}
               placeholder="Degree"
               /><br/><hr/>
            </div>

            <div>
               <label for="psyer">Passing Year:</label> <br/>
               <input
               type="text"
               name="psyer"
               value={year}
               onChange={changeYearHandler}
               placeholder="Year"
               /><br/><hr/>
            </div>

            <div>
               <label for="sex">Sex:</label> <br/>
               <input
               type="text"
               name="sex"
               value={sex}
               onChange={sexHandler}
               placeholder="Sex"
               /><br/><hr/>
            </div>

            <div>
               <label for="pgn">Person's Guardian Name:</label> <br/>
               <input
               type="text"
               name="pgn"
               value={nameg}
               onChange={changeGNameHandler}
               placeholder="Guardian Name"
               /><br/><hr/>
            </div>

            <div>
               <label for="rel">Relation between Guardian:</label> <br/>
               <input
               type="text"
               name="rel"
               value={rel}
               onChange={changeRelationHandler}
               placeholder="Relation"
               /><br/><hr/>
            </div>

            <div>
               <label for="rlign">Person's Religion:</label> <br/>
               <input
               type="text"
               name="rlign"
               value={religion}
               onChange={changeReligionHandler}
               placeholder="Religion"
               /><br/><hr/>
            </div>

            <div>
               <label for="bdg">Person's Blood Group:</label> <br/>
               <input
               type="text"
               name="bdg"
               value={bloodg}
               onChange={changeBloodgHandler}
               placeholder="Blood Group"
               /><br/><hr/>
            </div>

            <span>
               <label for="active">Select the Person is Active or Not Active:</label> <br/><br/>
               <input type="radio" name="active" value="1" onChange={activeHandler}/>Active<br/>
               <input type="radio" name="active" value="0" onChange={activeHandler}/>Not Active
               <hr/>
            </span>
            <button className="baton" type="submit">{edit?"Edit Person" : "Add Person"}</button>
            <button className="baton" type="reset" onClick={clrHandler}>Clear</button>
         </form>
      </div>
   );
};

export default Formpage;