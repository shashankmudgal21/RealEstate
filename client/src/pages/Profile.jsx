import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { getDownloadURL } from "firebase/storage";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
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
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>

      <form className="flex flex-col gap-4">
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
          id="username"
        />
        <input
          className="p-3 border rounded-lg"
          type="text"
          placeholder="email"
          id="email"
        />
        <input
          className="p-3 border rounded-lg"
          type="text"
          placeholder="password"
          id="password"
        />
        <button className="bg-slate-700 rounded-lg text-white p-3 hover:opacity-95">
          Update
        </button>
      </form>

      <div className="flex justify-between mt-3">
        <span className="text-red-700">Delete account</span>
        <span className="text-red-700">sign out</span>
      </div>
    </div>
  );
}
