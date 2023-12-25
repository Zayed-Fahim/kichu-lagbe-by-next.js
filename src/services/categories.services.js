import "server-only";
import Categories from "@/models/Categories";

export const createCategoryService = async (data) => {
  try {
    const category = await Categories.create({
      categoryId: data.categoryId,
      categoryName: data.categoryName,
    });
    return category;
  } catch (error) {
    console.log(error.message);
  }
};
export const getCategoryService = async () => {
  try {
    const categories = await Categories.find({});
    return categories;
  } catch (error) {
    console.log(error.message);
  }
};
