import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategoryProductsAction } from "../../features/category/categoryAction";
import CustomCard from "../../components/customCard/CustomCard";

const Category = () => {
  const { subCategory } = useParams();
  const { subCategories } = useSelector((state) => state.categoryStore);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const foundCategory = subCategories.find((cat) => cat.slug === subCategory);
    setCategory(foundCategory);
    const getProducts = async () => {
      const result = await fetchCategoryProductsAction(subCategory);
      // console.log(222, result);
      setProducts(result.products);
    };
    getProducts();
  }, []);

  return (
    <div>
      <h1>{category}</h1>
      {/* {products?.map((product) => (
        <CustomCard />
      ))} */}
    </div>
  );
};
export default Category;
