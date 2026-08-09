require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

async function main() {
    // Check whether Atlas URL is loaded
    if (!process.env.ATLASDB_URL) {
        throw new Error("ATLASDB_URL is not found in .env file");
    }

    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("Connected to MongoDB Atlas");

    // Find your existing user
    const user = await User.findOne({ username: "stranger" });

    if (!user) {
        throw new Error("User 'stranger' not found in database");
    }

    console.log("Owner found:", user.username, user._id);

    // Remove existing listings
    await Listing.deleteMany({});

    // Add owner to every sample listing
    const data = initData.data.map((obj) => ({
        ...obj,
        owner: user._id
    }));

    // Insert listings
    await Listing.insertMany(data);

    console.log("Listings initialized successfully!");
    console.log(`${data.length} listings added.`);

    await mongoose.connection.close();
}

main().catch((err) => {
    console.log("ERROR:", err);
});