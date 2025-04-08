import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: string,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Student", "Recruiter"],
      required: true,
    },
    profile: {
      bio: {
        type: String,
      },
      skills: {
        type: String,
      },
      resume: {
        type: String,
      },
      resumeOriginalname: {
        type: String,
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      profilePhotos: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
