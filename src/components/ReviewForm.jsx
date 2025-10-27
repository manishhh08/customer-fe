import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CustomInput } from "./custominput/CustomInput";
import { CustomModal } from "./custommodal/CustomModal";
import { createReviewAction } from "../features/review/reviewAction";
import { Stars } from "./stars/Stars";

const ReviewForm = ({ show, onHide, product }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    rating: "",
    comment: "",
  });

  useEffect(() => {
    if (product) {
      // ✅ Use productId if available, otherwise fall back to _id
      const correctId = product.productId || product._id;
      if (correctId) {
        setForm((prev) => ({ ...prev, productId: correctId }));
      }
    }
  }, [product]);

  console.log("PRoduct passed to review form", product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting review form", form); // ✅ Add this
    dispatch(createReviewAction(form));
    onHide();
    setForm({ productId: "", title: "", rating: "", comment: "" });
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
          type="text"
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
