const express = require('express');
const dotenv = require('dotenv');
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import supabase from "./config/SupabaseClient";
dotenv.config();
console.log(supabase);
const app = express();
app.use(cors());
app.use(express.json());
console.log("JWT_SECRET:-------------------------------------------", process.env.JWT_SECRET);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
