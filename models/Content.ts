import mongoose, { Schema, model, models } from "mongoose";

const ContentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Use existing model if present (to prevent recompilation error in dev), otherwise create new
const Content = models.Content || model("Content", ContentSchema);

export default Content;
