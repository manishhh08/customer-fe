import { fetchAllProducts } from "./productAPI";
import { setProducts } from "./productSlice";


export const fetchAllProductsAction = () => async (dispatch) => {
    try {
        const response = await fetchAllProducts();
        if (response.status === "success") {
            dispatch(setProducts(response.products));
        }
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
};