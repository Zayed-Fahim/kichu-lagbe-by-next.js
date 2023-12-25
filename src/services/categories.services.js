import Categories from "@/models/Categories";

export const createCategoryService = async (data) => {
  try {
    const category = await Categories.create({
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      subCategories: data.subCategories,
    });
    return category;
  } catch (error) {
    console.log(error.message);
  }
};
