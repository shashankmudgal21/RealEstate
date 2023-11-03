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
import { Link } from "react-router-dom";
export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError,setShowListingError] = useState(false);
  const [userListing,setUserListing] = useState([]);
  const dispatch = useDispatch();
  console.log(file);
  console.log(formData);
  console.log(userListing)
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
  const handleShowListing = async () =>{
    try{
      setShowListingError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if(data.sucess === false){
        setShowListingError(true);
        return;
      }
      setUserListing(data);

    }
    catch(err){
      setShowListingError(true);
    }
  }
  const handleListingDelete = async(listingId) =>{
    try{
      const res = await fetch(`/api/listing/delete/${listingId}`,{
        method:"DELETE",
      })
      const data = await res.json();
      if(data.sucess === false){
        console.log(data.message)
        return;
      }
      setUserListing((prev)=>prev.filter((listing)=>listing._id!==listingId))
    }
    catch(err){
      console.log(err.message);
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
          {loading ? "loading..." : "Update"}
        </button>
        <Link className="bg-green-700 text-white rounded-lg p-3 text-center hover:opacity-95" to = {'/create-listing'}>Create listing</Link>
      </form>

      <div className="flex justify-between mt-3">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick = {handleSignOut}className="text-red-700 cursor-pointer">Sign out</span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "user is updated succesfully" : ""}
      </p>
      <button onClick={handleShowListing} className="text-green-700 w-full">Show Listing</button>
      <p className="text-red-700 mt-5 text-sm">{showListingError?"Error in showing listing":''}</p>

      {userListing && userListing.length>0 &&
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-2xl mt-7 text-center">Your listing</h1>
      {userListing.map((listing)=>(
          <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">

            <Link to={`/listing/${listing._id}`}>
            <img className="h-16 w-16 rouded-lg object-contain" src={listing.imageUrls[0]} alt="listing cover" />
            </Link>

            <Link className="text-slate-700 font-semibold hover:underline flex-1 truncate " to={`/listing/${listing._id}`}>
          <p >{listing.name}</p>
            </Link>
            <div className="flex flex-col item-center">
              <button onClick = {()=>handleListingDelete(listing._id)} className="text-red-700">Delete</button>
              <Link to={`/update-listing/${listing._id}`}><button className="text-green-700">Edit</button></Link>
            </div>
          </div>
      ))}
      </div>
      }
    </div>
  );
}
