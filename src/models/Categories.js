import mongoose, { Schema } from "mongoose";

const subCategorySchema = new Schema({
  subCategoryId: {
    type: Number,
    min: 1,
    required: true,
  },
  subCategoryName: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  },
});

const categorySchema = new Schema({
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
  subCategories: [subCategorySchema],
});

const Categories =
  mongoose.models.Categories || mongoose.model("Categories", categorySchema);
export default Categories;
