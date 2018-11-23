import React from "react";
import ReactDOM from "react-dom";
import Score from "./components/Score/Score";
import Card from "./components/Card/Card";
import ScoreModal from "./components/ScoreModal/ScoreModal";
import { debounce } from "lodash";

import "./styles.css";

class App extends React.PureComponent {
  state = {
    isIn: false,
    isOut: false,
    questions: [],
    indexQuestion: 0,
    tasks: [],
    indexTask: 0,
    scoreA: 0,
    scoreB: 0,
    isTask: false,
    isTeamA: true,
    isTeamAGetScore: true
  };

  showResult = debounce(isFirstButton => {
    const { isIn, isOut } = this.state;
    this.setState({ isIn: true, isOut: false }, () => {
      setTimeout(() => {
        this.setState({ isIn: false, isOut: !isIn && !isOut });
      }, 1200);
    });
  }, 800);

  render() {
    const {
      isIn,
      isOut,
      questions,
      tasks,
      indexQuestion,
      indexTask,
      scoreA,
      scoreB,
      isTask,
      isTeamA,
      isTeamAGetScore
    } = this.state;

    const card = (isTask ? tasks[indexTask] : questions[indexQuestion]) || {};
    const { title, description, pic } = card;

    return (
      <div className="app">
        <Score scoreA={scoreA} scoreB={scoreB} isTeamA={isTeamA} />
        <Card
          title={title}
          description={description}
          pic={pic}
          showResult={this.showResult}
        />
        <ScoreModal
          count={1}
          isTeamA={isTeamAGetScore}
          isIn={isIn}
          isOut={isOut}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
