const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const ListingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    
    image:{
        url:String,
        filename:String,
    },

    price:Number,
    location:String,
    country:String,

     lat: Number,
     lng: Number,
    



    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    
});

ListingSchema.post("findOneDelete",async(listing)=>{
    if(listing){
  await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

//revise this two lines
const Listing= mongoose.model("Listing",ListingSchema);
module.exports=Listing;