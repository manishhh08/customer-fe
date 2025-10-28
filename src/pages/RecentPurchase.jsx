import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Table,
  Badge,
  Form,
  Button,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { retrieveAllOrder } from "../features/order/orderAPI";
import { fetchAllProductsAction } from "../features/product/productAction";
import DashboardSidebar from "../components/DashboardSidebar";

const statusVariant = (s) => {
  const v = String(s || "").toLowerCase();
  if (v.includes("delivered")) return "success";
  if (v.includes("shipped") || v.includes("in transit")) return "warning";
  if (v.includes("processing") || v.includes("received")) return "primary";
  return "secondary";
};
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "—");

// ---- page ----
export default function RecentPurchase() {
  const dispatch = useDispatch();
  const { customer } = useSelector((store) => store.customerStore);
  const { products } = useSelector((store) => store.productStore);
  const storeOrders = useSelector(
    (s) => (s.orderStore && s.orderStore.orders) || []
  );

  const [orders, setOrders] = useState(storeOrders || []);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const firstImage = (p) =>
    Array.isArray(p?.images)
      ? p.images[0] || p.image
      : typeof p?.images === "string"
      ? p.images
      : p?.image || p?.thumbnail;

  const productById = useMemo(() => {
    const m = new Map();
    (products || []).forEach((p) => p?._id && m.set(String(p._id), p));
    return m;
  }, [products]);

  useEffect(() => setOrders(storeOrders || []), [storeOrders]);

  useEffect(() => {
    // ensure products are around for detail views etc.
    dispatch(fetchAllProductsAction());
    (async () => {
      if (
        (!Array.isArray(storeOrders) || storeOrders.length === 0) &&
        customer?._id
      ) {
        try {
          const res = await retrieveAllOrder(customer._id);
          if (res?.status === "success" && Array.isArray(res.orders))
            setOrders(res.orders);
        } catch {
          /* ignore */
        }
      }
    })();
  }, [dispatch, customer?._id]);

  const sorted = useMemo(
    () =>
      [...(orders || [])].sort(
        (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
      ),
    [orders]
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const view = sorted.slice((page - 1) * perPage, page * perPage);

  const getOrderCover = (order) => {
    const items = Array.isArray(order?.items) ? order.items : [];
    for (const it of items) {
      const pid = String(
        it?.productId || it?.product?._id || it?.product || ""
      );
      if (pid && productById.has(pid)) return firstImage(productById.get(pid));
      if (it?.product && (it.product.images || it.product.image))
        return firstImage(it.product);
      if (it?.images || it?.image || it?.thumbnail) return firstImage(it);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [q, status]);

  return (
    <section
      className="py-5 h-100 text-white with-customer-sidebar"
      style={{
        background: "linear-gradient(180deg,var(--neo-d1),var(--neo-d2))",
      }}
    >
      <DashboardSidebar />
      <Container className="px-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold m-0">Recent purchases</h2>
          <small>
            Review your latest orders, track status, and download invoices.
          </small>
        </div>

        <Row className="g-3 mb-3">
          <Col
            md={12}
            className="text-md-end d-flex gap-2 justify-content-md-end"
          >
            <div className="text-white-50 align-self-center">
              {sorted.length} {sorted.length === 1 ? "order" : "orders"}
            </div>
          </Col>
        </Row>

        {/* Table */}
        <div className="card-neo rounded-4 p-3">
          {view.length === 0 ? (
            <div className="text-white-50 py-5 text-center">
              No orders match your filters.
            </div>
          ) : (
            <Table
              responsive
              hover
              borderless
              className="mb-0 table-transparent"
            >
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Image</th>
                  <th className="text-center">Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {view.map((o) => {
                  return (
                    <tr key={o._id}>
                      <td>#{String(o._id).slice(-6)}</td>
                      <td>{fmtDate(o.createdAt)}</td>
                      <td>
                        <div
                          className="rounded-3 overflow-hidden"
                          style={{
                            width: 48,
                            height: 48,
                            background: "rgba(255,255,255,.06)",
                          }}
                        >
                          <img
                            src={getOrderCover(o)}
                            alt="Item"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </div>
                      </td>
                      <td className="text-center">{o.items?.length ?? 0}</td>
                      <td>${Number(o.total || 0).toFixed(2)}</td>
                      <td>
                        <Badge
                          bg={statusVariant(o.status)}
                          className="text-capitalize"
                        >
                          {o.status || "—"}
                        </Badge>
                      </td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <Link
                            to="/orders"
                            className="btn-ghost neo rounded-4"
                          >
                            Details
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-end mt-3">
            <Pagination className="mb-0">
              <Pagination.Prev
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              />
              {Array.from({ length: totalPages }).map((_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === page}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              />
            </Pagination>
          </div>
        )}
      </Container>
    </section>
  );
}
