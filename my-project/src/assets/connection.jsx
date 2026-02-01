import axios from "axios"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addconnections } from "../utils/connectionslise";
import RequestCard from "./requestcard";
const Connections=()=>{

const dispatch=useDispatch();
const FetchConnections=async()=>{
        try{
            const res=await axios.get("http://localhost:3000/user/connections",{
                withCredentials:true
                
            })
            console.log(res)
            dispatch(addconnections(res.data))
            

        }catch(error){
            console.log(error)

        }
   };
    useEffect(()=>{
      //call functions one time when load
        FetchConnections();
    })

    if(!Connections) return;
    if(Connections.length===0) return(
       <div className="justify-items-center my-7  ">
           <h1 className=" text-bold text-2xl  ">No connection Request</h1>
        </div> 
    )
   return (
  <div className="justify-items-center my-7">
    <h1 className="font-bold text-2xl">Connections</h1>

    {Connections.map((user, index) => {
      return (
          <RequestCard key={index} user={user}/>
      );
    })}
  </div>
);

}


export default Connections