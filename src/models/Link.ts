import mongoose, { Schema, model } from "mongoose";

export interface ILink {
  hash: string;
  userId: mongoose.Types.ObjectId;
}

const LinkSchema = new Schema<ILink>(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * One active share link per user
 * If user enables sharing again → old link must be replaced
 */
LinkSchema.index({ userId: 1 }, { unique: true });

export const LinkModel = model<ILink>("Link", LinkSchema);
