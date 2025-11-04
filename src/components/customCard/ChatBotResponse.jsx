import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChatBotResponse = ({ text, products }) => {
  const navigate = useNavigate();

  if (!products?.length)
    return <span style={{ whiteSpace: "pre-wrap" }}>{text}</span>;

  return (
    <div className="d-flex flex-column gap-2">
      {products.map((p) => (
        <Card
          key={p._id}
          className="border-0 shadow-sm"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          <Card.Body className="d-flex justify-content-between align-items-center p-2">
            <Card.Title as="h6" className="mb-0 text-dark">
              {p.name}
            </Card.Title>
            <span className="fw-bold text-success">${p.price}</span>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
export default ChatBotResponse;
