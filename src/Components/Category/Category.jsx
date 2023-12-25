import React from "react";

const Category = ({ categories }) => {
  return (
    <div className="grid grid-cols-5 gap-x-8 gap-y-10 pb-10">
      {categories.payload &&
        categories.payload?.map((category) => (
          <div
            key={category.categoryId}
            className="border min-h-[300px] max-h-[400] rounded-2xl font-semibold text-2xl text-center flex flex-col justify-between p-10"
          >
            <div>{category.categoryId}</div>
            <div>{category.categoryName}</div>
          </div>
        ))}
    </div>
  );
};

export default Category;
