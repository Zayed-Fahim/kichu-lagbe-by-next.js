import { createCategoryService } from "@/services/categories.services";
import { connectMongoDB } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { categoryId, categoryName, subCategories } = await request.json();
    console.log(subCategories);
    await connectMongoDB();
    const categories = await createCategoryService({
      categoryId,
      categoryName,
      subCategories,
    });
    return new NextResponse({
      status: 200,
      json: {
        message: "Categories added successfully",
        payload: { categories },
      },
    });
  } catch (error) {
    return new NextResponse({
      status: 400,
      json: {
        message: "Failed to add categories",
      },
    });
  }
};
