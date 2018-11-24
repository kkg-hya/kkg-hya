import React from "react";
import classnames from 'classnames';
import "./Card.scss";

const firstButtonModes = {
  me: 'Себе +',
  enemy: 'Им +',
  random: 'Да, рандом',
  choose: 'Нам',
};

const secondButtonModes = {
  me: 'Не сейчас',
  enemy: 'Не в нашу смену',
  random: 'Нет, рандом',
  choose: 'Им',
};

const buttonClasses = {
  me: ['', 'card__button--red'],
  enemy: ['', 'card__button--red'],
  random: ['card__button--yellow','card__button--yellow'],
  choose: ['card__button--blue', 'card__button--red'],
};

const generateClassName = (mode, isFirst, isTeamA) => {
  const index = isTeamA ? +!isFirst : +isFirst;
  return buttonClasses[mode][index];
}

const Card = ({ pic, title, description, showResult, mode, isTeamA }) => {
  return (
    <div className="card">
      <div className="card__image-container">
        <img src={pic} alt="No pic" className="card__image" />
      </div>
      <h2 className="card__title">{title}</h2>
      <p className="card__description">{description}</p>
      <button className={classnames('card__button',generateClassName(mode, true, isTeamA))} onClick={() => showResult(true)}>
        { firstButtonModes[mode] }
      </button>
      <button className={classnames('card__button',generateClassName(mode, false, isTeamA))} onClick={() => showResult(false)}>
        { secondButtonModes[mode] }
      </button>
    </div>
  );
};

export default Card;
