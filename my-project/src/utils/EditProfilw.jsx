import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "./userSlice";
import Feedcard from "../assets/feedcard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [Age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [photourl ,setPhotoUrl]=useState("");
  const [showToast, setShowToast] = useState(false);

  // Update states when user changes
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAbout(user.about || "");
      setAge(user.age || "");
      setSkills(user.skills || "");
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const SaveProfile = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:4003/profile/edit",
        {
          firstName,
          lastName,
          age: Age,
          about,
          skills,
          photourl
        },
        { withCredentials: true }
      );
      console.log("API Response:", res.data);
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="justify-items-center mt-10 px-10 h-auto">
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <label className="label text-blue-50">First Name</label>
          <input
            type="text"
            className="input text-blue-50"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label text-blue-50">Last Name</label>
          <input
            type="text"
            className="input text-blue-50"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label text-blue-50">Age</label>
          <input
            type="text"
            className="input text-blue-50"
            value={Age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label text-blue-50">About</label>
          <input
            type="text"
            className="input h-10 text-blue-50"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <label className="label text-blue-50">Skills</label>
          <input
            type="text"
            className="input h-10 text-blue-50"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <label className="label text-blue-50">Photo URL</label>
          <input
            type="text"
            className="input h-10 text-blue-50"
            value={photourl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <button className="btn btn-primary" onClick={SaveProfile}>
            Save
          </button>
        </fieldset>
      </div>

      <div className="mt-10">
        <Feedcard user={{ firstName, lastName, Age, skills, about ,photourl}} />
      </div>

      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Profile Saved Successfully
        </div>
      )}
    </div>
  );
};

export default EditProfile;
