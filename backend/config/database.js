import mongoose from "mongoose";
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ankitrajdihara123:hnZXXMbwpuYBXtaN@portal.nfxlmaz.mongodb.net/portal"
  );
};
export default connectDB;