global.crypto=require('crypto');
const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(()=>{
    console.log("connected to db")
  })
  .catch((err)=>{
    console.log(err)
  });
async function main(){
    await mongoose.connect(mongo_url)
}

const initDB=async()=>{
    await Listing.deleteMany({});
    const data = initData.data.map((obj) => ({
    ...obj,
    owner: "6a683a5d51333c29b4d74ed7"
}));

await Listing.insertMany(data);
    console.log("data was initialised successfully");
}

initDB(); //calling init remember