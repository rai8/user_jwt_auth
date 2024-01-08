require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//routes
const userRouter = require("./routes/user.router");

const PORT = process.env.PORT || 8082;

//Middlewares
app.use(cors());
app.use(express.json());

//swagger setup
require("./swagger/swagger")(app);

//routes
app.use("/", userRouter);

const initApp = async () => {
  try {
    require("./core/db.js");
    /**
     * Start the web server on the specified port.
     */
    app.listen(PORT, () => console.log(`🚀 Server is up and running on port ${PORT} 🚀 `));
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

initApp();
