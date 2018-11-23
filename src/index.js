import React from "react";
import ReactDOM from "react-dom";
import Score from "./components/Score/Score";
import Card from "./components/Card/Card";
import ScoreModal from "./components/ScoreModal/ScoreModal";
import reachDescription from './generator/decriptionGenerator';

import { debounce } from "lodash";
import { tasks, questions } from './mock';

import "./styles.css";

const getModeOfCard = ({ forMe, forEnemy, forRandom, isForComand }) => {
  if (forMe) {
    return 'me';
  }
  if (forEnemy) {
    return 'enemy';
  }
  if (forRandom) {
    return 'random';
  }
  if (isForComand) {
    return 'choose';
  }
  return '';
}

const emptyFunc = () => {};

class App extends React.PureComponent {
  state = {
    isIn: false,
    isOut: false,
    questions,
    indexQuestion: -1,
    tasks,
    indexTask: -1,
    scoreA: 0,
    scoreB: 0,
    count: 0,
    isTask: false,
    isTeamA: true,
    isTeamAGetScore: true,
    mode: 'me',
  };

  showResult = debounce(isFirstButton => {
    const { isIn, isOut } = this.state;
    this.checkResult(isFirstButton, () => {
      this.setState({ isIn: true, isOut: false }, () => {
        setTimeout(() => {

          this.changeTeam();
          this.generateQuestion();
          this.setState({ isIn: false, isOut: !isIn && !isOut });
        }, 1200);
      });
    });
  }, 500);

  changeTeam = () => {
    this.setState(({
      isTeamA,
    }) => ({
      isTeamA: !isTeamA,
    }));
  }

  checkResult = (isFirstButton, cb = emptyFunc) => {
    const { mode } = this.state;
    switch (mode) {
      case 'me':
        this.setState({ count: 0 }, () => {
          isFirstButton ? this.addPointToMe(cb) : cb();
        });
        break;
      case 'enemy':
        this.setState({ count: 0 }, () => {
          isFirstButton ? this.addPointToEnemy(cb) : cb();
        });
        break;
      case 'random':
        const isWe = Math.random() < 0.5;
        this.setState({ count: 0 }, () => {
          isWe ? this.addPointToMe(cb) : this.addPointToEnemy(cb);
        });
        break;
      case 'choose':
        this.setState({ count: 0 }, () => {
          isFirstButton ? this.addPointToMe(cb) : this.addPointToEnemy(cb);
        });
        break;
    }
  }

  generateQuestion = (isTask) => {
    if (isTask) {
      const newIndex = this.state.indexTask + 1;

      const task = this.state.tasks[newIndex];
      this.setState({
        indexTask: newIndex,
        mode: getModeOfCard(task),
      })
    } else {
      const newIndex = this.state.indexQuestion + 1;

      const task = this.state.questions[newIndex];
      this.setState({
        indexQuestion: newIndex,
        mode: getModeOfCard(task),
      })
    }
  }

  componentDidMount() {
    this.generateQuestion();
  }

  addPointToMe = (cb) => {
    const { isTeamA } = this.state;

    if (isTeamA) {
      this.setState(({ scoreA }) => ({
        scoreA: scoreA + 1,
        isTeamAGetScore: true,
        count: 1,
      }), cb)
    } else {
      this.setState(({ scoreB }) => ({
        scoreB: scoreB + 1,
        isTeamAGetScore: false,
        count: 1,
      }), cb)
    }
  }

  addPointToEnemy = (cb) => {
    const { isTeamA } = this.state;

    if (isTeamA) {
      this.setState(({ scoreB }) => ({
        scoreB: scoreB + 1,
        isTeamAGetScore: false,
        count: 1,
      }), cb)
    } else {
      this.setState(({ scoreA }) => ({
        scoreA: scoreA + 1,
        isTeamAGetScore: true,
        count: 1,
      }), cb)
    }
  }


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
      isTeamAGetScore,
      mode,
      count,
    } = this.state;

    const card = (isTask ? tasks[indexTask] : questions[indexQuestion]) || {};
    const { title, description, pic } = card;

    return (
      <div className="app">
        <Score scoreA={scoreA} scoreB={scoreB} isTeamA={isTeamA} />
        <Card
          title={title}
          description={reachDescription(description)}
          pic={pic}
          showResult={this.showResult}
          mode={mode}
          isTeamA={isTeamA}
        />
        <ScoreModal
          count={count}
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
