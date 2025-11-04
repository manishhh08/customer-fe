import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup, Button } from "react-bootstrap";

const flat = (v) => {
  if (v == null) return "";
  if (typeof v === "string") return v.toLowerCase();
  if (Array.isArray(v)) return v.map(flat).join(" ");
  if (typeof v === "object") return Object.values(v).map(flat).join(" ");
  return String(v).toLowerCase();
};

export default function HeaderSearch({ placeholder = "Search products…" }) {
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.productStore);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const val = q.trim().toLowerCase();
    if (!val) {
      setResults([]);
      return;
    }

    const safeProducts = Array.isArray(products) ? products : [];
    const filtered = safeProducts.filter((p) => {
      const name = flat(p?.name);
      const desc = flat(p?.description);
      const cat = flat(
        p?.category || p?.categoryName || p?.categorySlug || p?.tags
      );
      return name.includes(val) || desc.includes(val) || cat.includes(val);
    });

    setResults(filtered.slice(0, 8)); // show up to 8 items
  }, [q, products]);

  const goToProduct = (p) => {
    const path = p?.slug ? `/product/${p.slug}` : `/product/${p._id}`;
    setOpen(false);
    setQ("");
    navigate(path);
  };

  const goToResults = () => {
    const term = q.trim();
    if (!term) return;
    navigate(`/products?search=${encodeURIComponent(term)}`);
    setOpen(false);
  };

  return (
    <div className="header-search position-relative">
      <InputGroup>
        <Form.Control
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          placeholder={placeholder}
          className="rounded-start-4 header-search-input"
        />
        <Button
          bsPrefix="neo"
          className="btn-neo rounded-end-4 header-search-btn"
          onMouseDown={(e) => e.preventDefault()}
          onClick={goToResults}
          disabled={!q.trim()}
          title="Search"
        >
          Search
        </Button>
      </InputGroup>

      {open && q.trim() && results.length > 0 && (
        <div className="header-search-popover card-neo rounded-4">
          {results.map((p) => (
            <button
              key={p._id}
              type="button"
              className="header-search-item"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => goToProduct(p)}
              title={p.name}
            >
              <img
                src={
                  p.images[0] ||
                  p.image[0] ||
                  "https://via.placeholder.com/40x40?text=🛒"
                }
                alt=""
                className="header-search-thumb"
              />
              <div className="header-search-text">
                <div className="title">{p.name}</div>
                <div className="muted">${Number(p.price || 0).toFixed(2)}</div>
              </div>
            </button>
          ))}
          <button
            type="button"
            className="header-search-item see-all"
            onMouseDown={(e) => e.preventDefault()}
            onClick={goToResults}
          >
            See all results for “{q.trim()}”
          </button>
        </div>
      )}
    </div>
  );
}
