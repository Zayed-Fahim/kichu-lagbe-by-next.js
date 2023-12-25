import getCategoriesData from "@/utils/getCategoriesData";
import React from "react";
import Category from "../Category/Category";

const Categories = async () => {
  const categories = await getCategoriesData();
  return (
    <div className="container mx-auto flex flex-col gap-10">
      <h1 className="text-3xl font-bold">Categories</h1>
      <Category categories={categories} />
    </div>
  );
};

export default Categories;
