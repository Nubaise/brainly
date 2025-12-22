import mongoose, { Schema, model } from "mongoose";

export interface ITag {
  title: string;
  userId: mongoose.Types.ObjectId;
}

const TagSchema = new Schema<ITag>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
      lowercase: true, // "React" === "react"
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
 * Prevent duplicate tags PER USER
 *
 * user A → "react" ❌ duplicate
 * user B → "react" ✅ allowed
 */
TagSchema.index({ title: 1, userId: 1 }, { unique: true });

export const TagModel = model<ITag>("Tag", TagSchema);
