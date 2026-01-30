import axios from "axios"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addconnections } from "../utils/connectionslise";
const Connections=()=>{

    const dispatch=useDispatch();
const FetchConnections=async()=>{
        try{
            const res=await axios.get("http://localhost:4003/user/connections",{
                withCredentials:true
                
            })
            console.log(res)
            dispatch(addconnections(res.data))
            

        }catch(error){
            console.log(error)

        }
   };
    useEffect(()=>{
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

    {Connections.map((connection, index) => {
      const { firstName, lastName, age, gender, photoUrl, about } = connection;
      return (
        <div key={index}>
          <img
            alt="photo"
            className="w-20 h-20"
            src={photoUrl}
          />
        </div>
      );
    })}
  </div>
);

}


export default Connections