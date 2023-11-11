import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../Component/ListingItem";
export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const furnishedFromUrl = urlParams.get("furnished");
    const parkingFromUrl = urlParams.get("parking");
    const orderFromUrl = urlParams.get("order");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      furnishedFromUrl ||
      parkingFromUrl ||
      offerFromUrl ||
      orderFromUrl ||
      sortFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        type: typeFromUrl || "all",
        offer: offerFromUrl === "true" ? true : false,
        order: orderFromUrl || 'desc',
        sort: sortFromUrl || "created_At",
      });
    }

    const fetchListing = async () => {
      const searchQuery = urlParams.toString();
      setLoading(true);
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setLoading(false);
      setListings(data);
      
    };
    fetchListing();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "rent" ||
      e.target.id === "sale" ||
      e.target.id === "all"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id == "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("type", sidebardata.type);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term
            </label>
            <input
              className="border p-3 rounded-lg w-full"
              type="text"
              name=""
              id="searchTerm"
              placeholder="Search.."
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
                className="w-4"
                name=""
                id="all"
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
                className="w-4"
                name=""
                id="rent"
              />
              <span>Rent </span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
                className="w-4"
                name=""
                id="sale"
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={sidebardata.offer === true}
                className="w-4"
                name=""
                id="offer"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-semibold">Amenteies:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={sidebardata.parking === true}
                className="w-4"
                name=""
                id="parking"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={sidebardata.furnished === true}
                className="w-4"
                name=""
                id="furnished"
              />
              <span>Furnished </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-semibold">Sort:</label>
            <select
              className=" border rounded-lg p-3"
              defaultValue={"created_at_desc"}
              name=""
              onChange={handleChange}
              id="sort_order"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="border bg-slate-700 rounded-lg hover:opacity-95 p-3 text-white">
            Search
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl border-b text-slate-700 font-semibold mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700 ">No listing found</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full ">
              Loading...
            </p>
          )}

          {!loading &&
            listings && 
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            )
            )
          }
        </div>
      </div>
    </div>
  );
}
