import React from "react";
import ReactDOM from "react-dom";
import Score from "./components/Score/Score";
import Card from "./components/Card/Card";
import Dice from "./components/Dice/Dice";
import ScoreModal from "./components/ScoreModal/ScoreModal";
import Modal from './components/Modal/Modal';
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

const gameScore = 10;

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
    gameEnded: false,
    isTeamAWin: false,
    showDice: true,
  };

  showResult = debounce(isFirstButton => {
    const { isIn, isOut, gameEnded } = this.state;
    this.checkResult(isFirstButton, () => {
      this.setState({ isIn: true, isOut: false }, () => {
        setTimeout(() => {

          this.changeTeam();
          this.generateQuestion();
          this.setState({ isIn: false, isOut: !isIn && !isOut }, () => {
            if (!gameEnded) {
              this.showDices();
            }
          });
        }, 1200);
      });
    });
  }, 500);

  showDices = () => {
    this.setState({
      showDice: true,
    })
  }

  hideDices = () => {
    this.setState({
      showDice: false,
    })
  }

  changeTeam = () => {
    this.setState(({
      isTeamA,
    }) => ({
      isTeamA: !isTeamA,
    }));
  }

  checkResult = (isFirstButton, cb = emptyFunc) => {
    const { mode, scoreA, scoreB } = this.state;
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
      default:
        return null
    }
    if (scoreA >= gameScore || scoreB >= gameScore) {
      this.endGame();
    }
  }

  endGame = () => {
    this.setState(({ scoreA, scoreB }) => ({
      gameEnded: true,
      isTeamAWin: scoreA > scoreB,
    }));
  }

  generateQuestion = (isTask) => {
    const { tasks, indexTask, indexQuestion, questions } = this.state;

    if (!tasks[indexTask+1] && !questions[indexQuestion+1]) {
      this.endGame();
      return;
    }

    if (isTask) {
      const newIndex = indexTask + 1;

      const task = tasks[newIndex];
      if (task) {
        this.setState({
          indexTask: newIndex,
          mode: getModeOfCard(task),
        })
      } else {
        this.generateQuestion(false);
      }
    } else {
      const newIndex = indexQuestion + 1;

      const task = questions[newIndex];
      if (task) {
        this.setState({
          indexQuestion: newIndex,
          mode: getModeOfCard(task),
        })
      } else {

      }
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

  resultCall = (value) => {
    this.generateQuestion(value[1][0] > 4);
    setTimeout(() => {
      this.hideDices();
    }, 400);
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
      showDice,
      gameEnded,
      isTeamAWin,
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
        { showDice && <Dice resultCall={this.resultCall} /> }
        { (showDice || gameEnded) && <Modal showDice={showDice} gameEnded={gameEnded} isTeamAWin={isTeamAWin} isTeamA={isTeamA} /> }
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
