import { Document, model, models, Schema } from "mongoose";
import mongoose from "mongoose";

interface IBookmarkRepo extends Document {
  owner: typeof mongoose.Types.ObjectId;
  githubLink: string;
  repoId: string;
  image: string;
  name: string;
  description: string;
  topics?: string[];
  stars: string;
  forks: string;
  issues: string;
}

const BookmarkRepoModel = new Schema<IBookmarkRepo>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  repoId: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topics: [
    {
      type: String,
      default: [],
    },
  ],
  stars: {
    type: String,
    required: true,
  },
  forks: {
    type: String,
    required: true,
  },
  issues: {
    type: String,
    required: true,
  },
});

export const BookmarkRepo =
  (models.BookmarkRepo as mongoose.Model<IBookmarkRepo>) ||
  model<IBookmarkRepo>("BookmarkRepo", BookmarkRepoModel);
