const mongoose = require("mongoose");
const app = require("./src/app");

// Hardcoded MongoDB URI
const MONGO_URI = "mongodb+srv://elycart:Elycart%40123@cluster0.ek1afix.mongodb.net/elycart?retryWrites=true&w=majority";
const PORT = 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.log("MongoDB connection error:", err));
