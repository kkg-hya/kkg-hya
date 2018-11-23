import React from "react";
import classnames from "classnames";
import "./ScoreModal.scss";

const ScoreModal = ({ count, isTeamA, isIn, isOut }) => {
  return (
    <div
      className={classnames(
        "score-modal",
        isIn && "score-modal--animate-in",
        isOut && "score-modal--animate-out",
        isTeamA ? "score-modal--team-a" : "score-modal--team-b"
      )}
    >
      <span>+{count}</span>
    </div>
  );
};

export default ScoreModal;
