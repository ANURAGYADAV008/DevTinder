import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedslice";
//import { useEffect } from "react";

const Feedcard=({user})=>{
  const {_id}=user;
  const dispatch=useDispatch();
  const handleSendRequest=async(status,userId)=>{
    try{
      await axios.post("http://localhost:4003/request/send/"+status+"/"+userId,{},
     {withCredentials:true})
    }catch(error){
      console.log(error);

    };
    dispatch(removeUserFromFeed(user._id));

  }
  
  console.log(user)
    return(
    <div className="card bg-base-300 w-70 h-auto shadow-sm">
  <figure>
    <img
      src={user.photourl}
      alt="Shoes" 
      className="h-60 w-70"
      />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.firstName + " " +user.lastName}
    </h2>
    <p className="text-1.5xl">{user.about}</p>
    <p className="text-1.5xl">{user.Age}</p>
    <p className="text-1.5xl">{user.gender}</p>

    <div className="card-actions justify-center px-5" > 
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Intrested</button>
    </div>
   
  </div>
</div>
)};

export default Feedcard