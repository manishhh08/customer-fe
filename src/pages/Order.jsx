import { useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Badge,
  Spinner,
  Alert,
  Button,
  Container,
  Pagination, // ✅ added
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { retrieveAllOrder } from "../features/order/orderAPI";
import { BsCartX } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import DashboardSidebar from "../components/DashboardSidebar";
import DownloadReceiptButton from "../components/receipt/DownloadReceiptButton";

const PAGE_SIZE = 10; // ✅ show 10 orders per page

const Order = () => {
  const { customer } = useSelector((store) => store.customerStore);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeKey, setActiveKey] = useState(null); // now using orderId as key
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ pagination
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const preSelectedOrderId = params.get("orderId");

  const toggleAccordion = (key) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };

  const getStatusVariant = (status) => {
    if (!status) return "secondary";
    switch (status.trim().toLowerCase()) {
      case "order received":
        return "primary";
      case "shipped":
        return "warning";
      case "delivered":
        return "success";
      default:
        return "secondary";
    }
  };

  const handleReviewSuccess = (itemId, orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item._id === itemId ? { ...item, isReviewed: true } : item
              ),
            }
          : order
      )
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customer?._id) return;
      try {
        setLoading(true);
        const { status, orders } = await retrieveAllOrder(customer._id);
        if (status === "success") {
          setOrders(orders);
        } else {
          setError("Failed to load orders");
        }
      } catch (err) {
        setError(err.message || "Internal Server Error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [customer?._id]);

  // ✅ When orders arrive and there's an orderId in query, open that order
  // and jump to the page that contains it
  useEffect(() => {
    if (orders.length > 0 && preSelectedOrderId) {
      const idx = orders.findIndex((o) => o._id === preSelectedOrderId);
      if (idx >= 0) {
        setActiveKey(preSelectedOrderId);
        const page = Math.floor(idx / PAGE_SIZE) + 1;
        setCurrentPage(page);
      }
    }
  }, [orders, preSelectedOrderId]);

  // ✅ keep currentPage valid if number of orders changes
  const totalPages = Math.ceil(orders.length / PAGE_SIZE) || 1;
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (orders.length === 0)
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{ minHeight: "80vh" }}
      >
        <BsCartX size={80} className="text-muted mb-3" />
        <h3 className="text-secondary fw-light mb-2">No orders found</h3>
        <p className="text-muted mb-4">
          Looks like you haven’t placed any orders yet.
        </p>
        <Link to="/products" className="rounded-pill px-4 py-2 shadow-sm">
          Shop Now
        </Link>
      </div>
    );

  // ✅ slice orders for current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedOrders = orders.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <section
      className="py-5 text-white h-100 with-customer-sidebar"
      style={{
        background: "linear-gradient(180deg,var(--neo-d1),var(--neo-d2))",
      }}
    >
      <DashboardSidebar />
      <Container className="px-4">
        <div className="mb-4">
          <h2 className="fw-bold m-0">Order History</h2>
          <small className="text-white-50">
            Track recent orders, view details, and manage deliveries.
          </small>
        </div>

        <Accordion activeKey={activeKey}>
          {paginatedOrders.map((order) => (
            <Card key={order._id} className="mb-3 shadow-sm border-0">
              <Accordion.Item eventKey={order._id}>
                <Accordion.Header onClick={() => toggleAccordion(order._id)}>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <div>
                      <strong>Order #{order._id.slice(-6)}</strong> —{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="d-flex align-items-center gap-2 me-2">
                      <strong>${order.total?.toFixed(2)}</strong>
                      <Badge
                        bg={getStatusVariant(order.status)}
                        className="text-capitalize"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  <h6>Items Ordered</h6>
                  <ul className="mb-3 list-unstyled">
                    {order.items?.map((item, idx) => (
                      <li key={idx} className="mb-3">
                        <div className="d-flex justify-content-between align-items-center p-2 border rounded">
                          {item.productName} × {item.quantity} — $
                          {item.price?.toFixed(2)}
                          {item.status?.toLowerCase() === "delivered" ||
                          order.status?.toLowerCase() === "delivered" ? (
                            <Button
                              variant={
                                item.isReviewed ? "secondary" : "primary"
                              }
                              size="sm"
                              disabled={item.isReviewed}
                              onClick={() => {
                                if (!item.isReviewed) {
                                  setSelectedProduct({
                                    ...item,
                                    orderId: order._id,
                                    itemId: item._id,
                                  });
                                  setShowModal(true);
                                }
                              }}
                            >
                              {item.isReviewed ? "Already Reviewed" : "Review"}
                            </Button>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <h6>Shipping Address</h6>
                  <p className="mb-3">{order.address || "N/A"}</p>

                  <h5>Payment Details</h5>
                  <p>
                    Method: {order.paymentMethod || "Card"} <br />
                    Total: <strong>${order.total?.toFixed(2)}</strong>
                  </p>
                  <DownloadReceiptButton order={order} customer={customer} />
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          ))}
        </Accordion>

        {/* ✅ Pagination controls */}
        {totalPages > 1 && (
          <Pagination className="justify-content-end mt-4">
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            />
          </Pagination>
        )}

        {selectedProduct && (
          <ReviewForm
            show={showModal}
            onHide={() => setShowModal(false)}
            product={selectedProduct}
            onReviewSuccess={handleReviewSuccess}
          />
        )}
      </Container>
    </section>
  );
};

export default Order;
