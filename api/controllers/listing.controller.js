import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async(req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};
export const deleteListing = async(req,res,next) =>{
  const listing = await Listing.findById(req.params.id)
  if(!listing){
    next(errorHandler(404,'listing not found'))
  }
  if(req.user.id !== listing.useRef){
    return next(errorHandler(401,'You can delete only your own listing'));
  }
  try{
    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).json('Listing deleted succesfully ')
  }
  catch(err){
    next(err);
  }
}
