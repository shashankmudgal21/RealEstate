import React from "react";

export default function CreateListing() {
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl my-7 text-center font-semibold">
        Create Lisiting
      </h1>
      <form className="flex flex-col sm:flex-row gap-4" action="">
        <div className="flex flex-col gap-4 flex-1 gap-4">
          <input
            className="p-3 rounded-lg border"
            type="text"
            placeholder="Name"
            id="Name"
            maxLength="62"
            minLength="3"
            required
          />
          <textarea
            className="p-3 rounded-lg border"
            type="text"
            placeholder="Description"
            id="Description"
            required
          />
          <input
            className="p-3 rounded-lg border"
            type="text"
            placeholder="Address"
            id="Address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-" name="" id="Sale" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-3" name="" id="Rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-3" name="" id="Parking" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-3" name="" id="furnished" />
              <span>furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-3" name="" id="offer" />
              <span>offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                className="border rounded-lg p-3 border-gray-300"
                type="number"
                name=""
                id="Bedrooms"
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
                id="Bathrooms"
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
                min="1"
                max="10"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <p className="text-xs">($/month)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="border rounded-lg p-3 border-gray-300"
                type="number"
                name=""
                id="discountPrice"
                min="1"
                max="10"
              />
              <div className="flex flex-col items-center">
                <p>Dicounted price</p>
                <p className="text-xs">($/month)</p>
              </div>
            </div>
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
              className="p-3 border rounded-lg"
              type="file"
              name=""
              id="images"
              accept="image/*"
            />
            <button className="p-3 text-green-600 border  rounded-lg  hover:shadow-lg border-green-600">
              Upload
            </button>
          </div>
          <button className="p-3 text-white bg-slate-700 rounded-lg hover:opacity-95 ">
            create Listing
          </button>
        </div>
      </form>
    </div>
  );
}
