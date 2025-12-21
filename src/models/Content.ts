import mongoose, { Schema, model } from "mongoose";

export interface IContent {
  title: string;
  link?: string;
  tags: mongoose.Types.ObjectId[];
  userId: mongoose.Types.ObjectId;
}

const ContentSchema = new Schema<IContent>(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
    },
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

ContentSchema.index({ userId: 1 });

export const ContentModel = model<IContent>("Content", ContentSchema);
