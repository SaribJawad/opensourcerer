import mongoose, { Document, model, models, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  provider: "credentials" | "github" | "google";
  joinedOn: string;
  profileImage?: string;
  bookmarkedRepos?: string[];
  bio?: string;
  isPasswordCorrect: (inpPassword: string) => Promise<boolean>;
}

const UserModel = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  provider: {
    type: String,
    enum: ["credentials", "github", "google"],
    required: true,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
    required: false,
  },
  joinedOn: {
    type: String,
    requried: true,
  },
  bookmarkedRepos: [
    {
      type: String,
      default: [],
    },
  ],
});

UserModel.pre("save", async function (next) {
  const user = this;

  if (user.password && user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

UserModel.methods.isPasswordCorrect = async function (inpPassword: string) {
  return await bcrypt.compare(inpPassword, this.password);
};

export const User =
  (models.User as mongoose.Model<IUser>) || model<IUser>("User", UserModel);
