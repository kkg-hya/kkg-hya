import React from "react";
import classnames from "classnames";
import "./Score.scss";

const Score = ({ scoreA, scoreB, isTeamA }) => (
  <div className="score">
    <div
      className={classnames(
        "score__team-a",
        isTeamA && "score__team-a--active"
      )}
    >
      {scoreA}
    </div>
    <div
      className={classnames(
        "score__team-b",
        !isTeamA && "score__team-b--active"
      )}
    >
      {scoreB}
    </div>
  </div>
);

export default Score;
