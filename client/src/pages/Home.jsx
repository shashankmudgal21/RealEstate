import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingItem from "../Component/ListingItem";
import { list } from "firebase/storage";

export default function Home() {
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [offerListings, setOfferListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 py-28 px-4 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br />{" "}
          place with ease
        </h1>

        <div className="text-gray-400 text-xs sm:text-sm">
          RealEstate will help you find your home fast easy and comfartable, our
          expert support is always available
        </div>
        <Link
          className="text-xs sm:text-sm text-blue-800 hover:underline font-bold"
          to={"/search"}
        >
          Let's get started..
        </Link>
     </div>
      <Swiper navigation>
        {offerListings && offerListings.length>0 && (
          offerListings.map((listing)=>(
                <SwiperSlide>
                  <div className="h-[550px]" key={listing._id} style={{background:`url(${listing.imageUrls[0]}) center no-repeat `,backgroundSize:'cover'}}>

                  </div>
                </SwiperSlide>
          ))
        )}
      </Swiper>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length>0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
              <Link className="text-blue-500"to={`/search?offer=true`}>
                Show more offer
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing)=>(
                <ListingItem key={listing._id} listing={listing}/>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentListings && rentListings.length>0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
              <Link className="text-blue-500"to={`/search?type=rent`}>
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing)=>(
                <ListingItem key={listing._id} listing={listing}/>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {saleListings && saleListings.length>0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
              <Link className="text-blue-500"to={`/search?type=sale`}>
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing)=>(
                <ListingItem key={listing._id} listing={listing}/>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
  );
}
