import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { getDownloadURL } from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  console.log(file);
  console.log(formData);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (err) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.sucess == false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };
  const handleDeleteUser = async()=>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`,{
        method:"DELETE"
      });
      const data = await res.json();
      if(data.sucess == false){
        dispatch(deleteUserFailure(data.message))
      }
      dispatch(deleteUserSuccess(data));
    }
    catch(err){
      dispatch(deleteUserFailure(err.message))
    }
   
  }
  const handleSignOut = async() =>{
    try{
      dispatch(signoutUserStart());
      const res = await fetch('api/auth/sign-out');
      const data = await res.json();
      if(data.sucess === false){
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    }
    catch(err){
      dispatch(signoutUserFailure(err.message))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>

      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 self-center"
          src={formData.avatar || currentUser.avatar}
          onChange={handleChange}
          alt=""
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">Error in uploading image</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`uploading ${filePerc}%`}</span>
          ) : filePerc == 100 ? (
            <span className="text-green-700">Uploaded sucessfully</span>
          ) : (
            " "
          )}
        </p>
        <input
          className="p-3 border rounded-lg"
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          id="username"
        />
        <input
          className="p-3 border rounded-lg"
          type="text"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          id="email"
        />
        <input
          className="p-3 border rounded-lg"
          type="password"
          placeholder="password"
          onChange={handleChange}
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 rounded-lg text-white p-3 hover:opacity-95"
        >
          {loading ? "loading..." : "update"}
        </button>
      </form>

      <div className="flex justify-between mt-3">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick = {handleSignOut}className="text-red-700 cursor-pointer">sign out</span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "user is updated succesfully" : ""}
      </p>
    </div>
  );
}
