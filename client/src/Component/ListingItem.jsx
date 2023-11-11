import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white w-full sm:w-[330px] flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="h-320px sm:h-[220px] w-full object-cover hover:scale-105 transition:scale duration-300"
          src={listing.imageUrls[0]}
          alt="listing cover"
        />
     
      <div className="p-3 flex flex-col gap-2">
        <p className="truncate text-lg font-semibold">{listing.name}</p>
        <div className="flex gap-3 items-center">
          <FaMapMarkedAlt className="h-4 w-4 text-green-700" />
          <p className="text-sm text-gray-600 w-full">{listing.address}</p>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {listing.description}
        </p>
        <p>
            $
          {
          listing.offer
            ? listing.discountPrice.toLocaleString("en-US")
            : listing.regularPrice.toLocaleString("en-US")
          
          }
            {listing.type === 'rent' && '/month'}
        </p>
        <div className="flex items-center gap-2">
            <div className="font-bold">
                {listing.bedrooms>1?`${listing.bedrooms} Beds`:`${listing.bedrooms} Bed`}
            </div>
            <div className="font-bold">
                {listing.bathrooms>1?`${listing.bathrooms} Baths`:`${listing.bathrooms} Bath`}
            </div>
        </div>
      </div>
      </Link>
    </div>
  );
}
