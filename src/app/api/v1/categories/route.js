import Categories from "@/models/Categories";
import {
  createCategoryService,
  getCategoryService,
} from "@/services/categories.services";
import { connectMongoDB } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    if (request.method !== "POST") {
      throw new Error("Method not allowed");
    }
    const { categoryId, categoryName } = await request.json();
    await connectMongoDB();
    const categoryAlreadyExists = await Categories.exists({
      $and: [{ categoryId: categoryId, categoryName: categoryName }],
    });
    if (categoryAlreadyExists) {
      return NextResponse.json(
        { status: 409 },
        {
          message: "Already exists",
        }
      );
    }
    const categories = await createCategoryService({
      categoryId,
      categoryName,
    });
    return NextResponse.json(
      { status: 200 },
      {
        message: "Categories added successfully",
      }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 400 },
      {
        message: "Failed to create category",
      }
    );
  }
};

export const GET = async (request) => {
  try {
    if (request.method !== "GET") {
      throw new Error("Method not allowed");
    }
    await connectMongoDB();
    const categories = await getCategoryService();
    return NextResponse.json({
      status: 200,
      message: "Here are all categories data",
      payload: categories,
    });
  } catch (error) {
    return NextResponse.json(
      { status: 404 },
      {
        message: "No category data found",
        error: error.message,
      }
    );
  }
};
