import React from "react";
import "./Card.scss";

const Card = ({ pic, title, description, showResult }) => {
  return (
    <div className="card">
      <div className="card__image-container">
        <img src={pic} alt="No pic" className="card__image" />
      </div>
      <h2 className="card__title">{title}</h2>
      <p className="card__description">{description}</p>
      <button className="card__button" onClick={showResult}>
        Yes
      </button>
      <button className="card__button" onClick={showResult}>
        No
      </button>
    </div>
  );
};

export default Card;
