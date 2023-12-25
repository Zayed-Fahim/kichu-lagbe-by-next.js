import "server-only";

const getCategoriesData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/categories", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error fetching categories data");
    const categories = await res.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Rethrow the error so it can be caught by the caller
  }
};

export default getCategoriesData;
