import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/database.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/jobs", jobRoutes);
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "welcome to the API",
    timestamp: new Date().toISOString,
    success: true,
  });
});
const corsOptions = {
  origin: ["http://localhost:4000"],
  Credentials: true,
};
app.use(cors(corsOptions));
connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3333, () => {
      console.log("listening to the port 3333");
    });
  })
  .catch((err) => {
    console.error("unable to connect to the database ");
  });
