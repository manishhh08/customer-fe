import React, { useEffect, useState } from "react";
<<<<<<< HEAD
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
=======
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import {
  fetchProductsBySubCategoryAction,
  fetchAllProductsAction,
} from "../../features/product/productAction";

const Category = () => {
  const { categorySlug, subCategorySlug } = useParams();
  const dispatch = useDispatch();
  const [view, setView] = useState("grid");

  const { products, loading } = useSelector((store) => store.productStore);

  useEffect(() => {
    if (categorySlug && subCategorySlug) {
      // fetch products by sub-category
      dispatch(fetchProductsBySubCategoryAction(categorySlug, subCategorySlug));
    } else {
      // fetch all active products
      dispatch(fetchAllProductsAction());
    }
  }, [dispatch, categorySlug, subCategorySlug]);
  useEffect(() => {
    console.log("Params:", { categorySlug, subCategorySlug });
  }, [categorySlug, subCategorySlug]);

  if (loading) return <p className="text-center my-5">Loading products...</p>;

  return (
    <section className="py-5">
      <Container>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-capitalize">
            {subCategorySlug || categorySlug}
          </h2>

          <ToggleButtonGroup
            type="radio"
            name="viewOptions"
            value={view}
            onChange={(val) => setView(val)}
          >
            <ToggleButton id="grid-view" value="grid" variant="outline-primary">
              Grid
            </ToggleButton>
            <ToggleButton id="list-view" value="list" variant="outline-primary">
              List
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* No Products Found */}
        {products?.length === 0 && (
          <p className="text-center text-muted">No products found.</p>
        )}

        {/* Grid View */}
        {view === "grid" && (
          <Row className="g-4">
            {products?.map((p) => (
              <Col xs={12} sm={6} md={4} lg={3} key={p._id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={p.thumbnail || p.images || "/placeholder.jpg"}
                    alt={p.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Text>${p.price}</Card.Text>
                    <Button
                      size="lg"
                      bsPrefix="neo"
                      className="btn-neo rounded-4 px-4 d-inline-flex align-items-center gap-2"
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="d-flex flex-column gap-3">
            {products?.map((p) => (
              <Card key={p._id} className="shadow-sm border-0">
                <Card.Body className="d-flex align-items-center">
                  <img
                    src={p.thumbnail || p.images || "/placeholder.jpg"}
                    alt={p.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "20px",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="flex-grow-1">
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Text>${p.price}</Card.Text>
                  </div>
                  <Button
                    size="lg"
                    bsPrefix="neo"
                    className="btn-neo rounded-4 px-4 d-inline-flex align-items-center gap-2"
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
>>>>>>> 48e17d64d5adb19a6fe63a47a03a8d776e31ce05
  );
};

export default Category;
