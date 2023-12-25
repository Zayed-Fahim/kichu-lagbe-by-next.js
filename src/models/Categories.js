import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryId: {
      type: Number,
      min: 1,
      required: true,
    },
    categoryName: {
      type: String,
      minlength: 1,
      maxlength: 100,
      required: true,
    },
  },
  { timestamps: true }
);

const Categories =
  mongoose.models.Categories || mongoose.model("Categories", categorySchema);

export default Categories;
