import mongoose from "mongoose";


function connect() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Successfully connected to MongoDB.");
    })
    .catch((err) => {
      console.error("Connection error", err);
    });
}

export default connect;
