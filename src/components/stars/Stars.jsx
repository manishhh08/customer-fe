import React, { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const maxRating = 5; //Defining the maximum rating

export const Stars = ({
  stars = 0,
  totalReviews,
  // To make the toggle interactive
  editable = false,
  // callback for parent component
  onChange = () => {},
}) => {
  const [hover, setHover] = useState(0);
  const [currentRating, setCurrentRating] = useState(stars);

  // show hover state if interactive, otherwise show given stars
  const displayRating = editable ? hover || currentRating : stars;

  const halfStar = !Number.isInteger(displayRating);
  const fullRating = Math.floor(displayRating);
  const emptyRating = maxRating - fullRating - (halfStar ? 1 : 0);

  const handleClick = (value) => {
    if (!editable) return;
    setCurrentRating(value);
    onChange(value); // send value to parent
  };

  const starsArray = [];

  for (let i = 0; i < maxRating; i++) {
    const value = i + 1;
    starsArray.push(
      <span
        key={value}
        onClick={() => handleClick(value)}
        onMouseEnter={() => editable && setHover(value)}
        onMouseLeave={() => editable && setHover(0)}
        style={{
          cursor: editable ? "pointer" : "default",
          transition: "transform 0.2s ease",
        }}
      >
        {displayRating >= value ? (
          <FaStar className="text-warning" />
        ) : (
          <FaRegStar className="text-secondary" />
        )}
      </span>
    );
  }

  return (
    <div className="fs-3 d-flex align-items-center gap-1">
      {starsArray}
      {totalReviews && !editable && (
        <span className="fs-6 ms-2 text-white-50">
          ({stars.toFixed(1)}/{totalReviews})
        </span>
      )}
    </div>
  );
};

export const ShowStars = ({ averageRating }) => {
  const halfStar = !Number.isInteger(averageRating);
  const fullStar = Math.floor(averageRating);
  const emptyStar = maxRating - fullStar - halfStar;
  const starArray = [];
  for (let i = 0; i < fullStar; i++) {
    starArray.push(<FaStar key={`full-${i}`} className="text-warning" />);
  }
  if (halfStar)
    starArray.push(<FaStarHalfAlt key="half" className="text-warning" />);
  for (let i = 0; i < emptyStar; i++) {
    starArray.push(<FaStar key={`empty-${i}`} className="text-secondary" />);
  }
  return <div>{starArray}</div>;
};
