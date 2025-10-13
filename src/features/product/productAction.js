import { fetchActiveProducts, fetchAllProducts } from "./productAPI";
import { setProducts } from "./productSlice";


export const fetchAllProductsAction = () => async (dispatch) => {
    try {
        const response = await fetchAllProducts();
        if (response.status === 200) {
            dispatch(setProducts(response.data.data));
        }
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
};

export const fetchActiveProductsAction = () => async (dispatch) => {
    try {
        const response = await fetchActiveProducts();
        if (response.status === 200) {
            dispatch(setProducts(response.data.data));
        }
    } catch (error) {
        console.error("Failed to fetch active products:", error);
    }
};