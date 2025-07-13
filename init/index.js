const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/Listing.js");

const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(()=>{
        console.log("DB Connected");
    })
    .catch((err)=>{
        console.log(err);
    });
    
async function main(){
    await mongoose.connect(MONGO_URL);
    }

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:"686f7f401202dceecb3fa7b8",
      
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}
initDB();
