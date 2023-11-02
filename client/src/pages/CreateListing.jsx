import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import { useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function CreateListing() {
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user)
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(files);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("image is not uploaded");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can upload 6 image per listing ");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "furnished" ||
      e.target.id === "parking"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData.imageUrls.length<1){
      return setError('You must upload at least one image')
      }
      if(+formData.regularPrice<+formData.discountPrice){
      return setError('Discounted price is less than regular price')
      }
      setLoading(true);
      setError(false);
      const res = await fetch("api/listing/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          useRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.sucess === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`)
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl my-7 text-center font-semibold">
        Create a Lisiting
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4"
        action=""
      >
        <div className="flex flex-col gap-4 flex-1 gap-4">
          <input
            className="p-3 rounded-lg border"
            type="text"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="3"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <textarea
            className="p-3 rounded-lg border"
            type="text"
            placeholder="Description"
            id="description"
            onChange={handleChange}
            value={formData.description}
            required
          />
          <input
            className="p-3 rounded-lg border"
            type="text"
            placeholder="Address"
            id="address"
            onChange={handleChange}
            value={formData.address}
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-"
                name=""
                id="sale"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                name=""
                id="rent"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                name=""
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                name=""
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                name=""
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                className="border rounded-lg p-3 border-gray-300"
                type="number"
                name=""
                id="bedrooms"
                onChange={handleChange}
                value={formData.bedrooms}
                min="1"
                max="10"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="border rounded-lg p-3 border-gray-300"
                type="number"
                name=""
                id="bathrooms"
                onChange={handleChange}
                value={formData.bathrooms}
                min="1"
                max="10"
              />
              <p>Bath</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="border rounded-lg p-3 border-gray-300"
                type="number"
                name=""
                id="regularPrice"
                onChange={handleChange}
                value={formData.regularPrice}
                min="1"
                max="1000000000"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <p className="text-xs">($/month)</p>
              </div>
            </div>
            {formData.offer &&<div className="flex items-center gap-2">
              <input
                className="border rounded-lg p-3 border-gray-300"
                type="number"
                name=""
                id="discountPrice"
                onChange={handleChange}
                value={formData.discountPrice}
                min="0"
                max="10000000"
              />
              <div className="flex flex-col items-center">
                <p>Dicounted price</p>
                <p className="text-xs">($/month)</p>
              </div>
            </div> }
            
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-gray-600">
              the first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border rounded-lg"
              type="file"
              name=""
              id="images"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              disabled = {uploading}
              className="p-3 text-green-600 border  rounded-lg  hover:shadow-lg border-green-600"
            >
              {uploading ? "Uploading" : "Upload"}
            </button>
          </div>
          <p className="text-red-500 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => {
              <div key={url} className="flex justify-between item-center p-3">
                <img
                  src={url}
                  alt="lisiting page"
                  className="w-30 h-30 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  type="button"
                  className="text-red-700 rounded-lg hover:opacity-95"
                >
                  Delete
                </button>
              </div>;
            })}
          <button disabled = {loading || uploading} className="p-3 text-white bg-slate-700 rounded-lg hover:opacity-95 ">
            {loading ? "Creating" : "Create Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
