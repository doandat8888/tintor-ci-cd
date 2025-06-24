const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`Connect to MongoDB successfully`);
  } catch (error) {
    console.log("Connect failed because of error: " + error);
  }
}

module.exports = { connect };
