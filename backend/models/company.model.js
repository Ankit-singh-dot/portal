import mongoose, { mongo } from "mongoose";
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Company = mongoose.model("Company", companySchema);
export default Company;
