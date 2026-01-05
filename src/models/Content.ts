import mongoose, { Schema, model } from "mongoose";

export interface IContent {
  title: string;
  link?: string;
  type?: "twitter" | "youtube" | "linkedin" | "other";
  tags: mongoose.Types.ObjectId[];
  userId: mongoose.Types.ObjectId;
  shareLink?: string;
}

const ContentSchema = new Schema<IContent>(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
      trim: true,
    },
    link: {
      type: String,
    },
    type: {
      type: String,
      enum: ["twitter", "youtube", "linkedin", "other"],
      default: "other"
    },
    tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tag",
      },
    ],
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shareLink: {
      type: String,
      unique: true,
      sparse: true, // ✅ only enforce uniqueness when present
    },
  },
  { timestamps: true }
);

// 🔍 Common query optimizations
ContentSchema.index({ userId: 1 });
ContentSchema.index({ shareLink: 1 });

export const ContentModel = model<IContent>("Content", ContentSchema);