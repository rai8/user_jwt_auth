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

app.listen(PORT, () => console.log(`🚀 Server is up and running on port ${PORT} 🚀 `));
