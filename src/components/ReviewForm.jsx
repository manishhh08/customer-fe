import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CustomInput } from "./custominput/CustomInput";
import { CustomModal } from "./custommodal/CustomModal";
import { createReviewAction } from "../features/review/reviewAction";
import { Stars } from "./stars/Stars";

const ReviewForm = ({ show, onHide, product, onReviewSuccess }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    productId: "",
    orderId: "",
    title: "",
    rating: "",
    comment: "",
  });

  useEffect(() => {
    if (product) {
      const correctId = product.productId || product._id;
      if (correctId) {
        setForm((prev) => ({
          ...prev,
          productId: correctId,
          orderId: product.orderId || "",
          itemId: product.itemId,
        }));
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(createReviewAction(form));

      if (result?.status === "success" && onReviewSuccess) {
        onReviewSuccess?.(form.itemId, form.orderId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      onHide();
      setForm({
        productId: "",
        orderId: "",
        title: "",
        rating: "",
        comment: "",
      });
    }
  };

  return (
    <CustomModal
      title={`Review: ${product?.productName || ""}`}
      show={show}
      onHide={onHide}
    >
      <Form onSubmit={handleSubmit}>
        <CustomInput
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter review title"
        />

        {/* Interactive Stars Component */}
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <Stars
            editable
            stars={form.rating}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                rating: value,
              }))
            }
          />
        </div>

        <CustomInput
          label="Comment"
          name="comment"
          as="textarea"
          rows={4}
          value={form.comment}
          onChange={handleChange}
          placeholder="Write your feedback..."
        />

        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" onClick={onHide} className="me-2">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};

export default ReviewForm;
