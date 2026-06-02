// models/Schema.js
import mongoose from "mongoose";

const schemaModel = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,

    dbml: String,

    shareId: {
      type: String,
      unique: true,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Schema", schemaModel);