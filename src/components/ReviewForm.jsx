import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CustomInput } from "../components/custominput/CustomInput";
import { CustomModal } from "../components/custommodal/CustomModal";
import { createReviewAction } from "../features/review/reviewAction";

const ReviewForm = ({ show, onHide, product }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    rating: "",
    comment: "",
    productId: "",
  });

  useEffect(() => {
    if (product?._id) {
      setForm((prev) => ({ ...prev, productId: product._id }));
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReviewAction(form));
    onHide(); // close modal after submission
    setForm({ title: "", rating: "", comment: "", productId: "" });
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
        <CustomInput
          label="Rating"
          name="rating"
          type="select"
          value={form.rating}
          onChange={handleChange}
          options={[
            { label: "1 - Poor", value: "1" },
            { label: "2 - Fair", value: "2" },
            { label: "3 - Good", value: "3" },
            { label: "4 - Very Good", value: "4" },
            { label: "5 - Excellent", value: "5" },
          ]}
        />
        <CustomInput
          label="Comment"
          name="comment"
          type="text"
          value={form.comment}
          onChange={handleChange}
          placeholder="Write your feedback..."
        />
        <div className="d-flex justify-content-end">
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
