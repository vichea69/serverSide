const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Start the server
const PORT = process.env.PORT;



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});