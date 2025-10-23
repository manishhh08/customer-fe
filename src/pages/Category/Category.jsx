import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategoryProductsAction } from "../../features/category/categoryAction";
import { useEffect } from "react";
import { useState } from "react";

const Category = () => {
  const { slug } = useParams();
  const { subCategories } = useSelector((state) => state.categoryStore);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const foundCategory = subCategories.find((cat) => cat.slug === slug);
    setCategory(foundCategory);
    const getProducts = async () => {
      const result = await fetchCategoryProductsAction(slug);
      setProducts(result.products);
    };
    getProducts();
  }, []);

  return (
    <div>
      <h1>{category}</h1>
    </div>
  );
};
export default Category;
