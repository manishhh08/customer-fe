import React from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { slug } = useParams(); //Shows the sub-category, replaces the useParams with the sub-categories: Laptop, Wearables etc. etc.

  const filteredProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );
  console.log(filteredProducts);

  return (
    <div>
      <h1>{categoryName}</h1>
    </div>
  );
};
export default Category;
