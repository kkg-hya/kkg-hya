import React from "react";
import main from "./js/main";

// Don't delete useles import. Without it don't work
/* eslint-disable */
import three from "three";
import cannon from "cannon";
import * as dice from "./js/dice";
import teal from "./js/teal";
import "./Dice.scss";
/* eslint-enable */

class Dice extends React.Component {

    componentDidMount() {
        main(document.getElementById('DiceContainer'), this.props.resultCall);
    }

    render(props) {
        return (
            <div id="DiceContainer" className="zeroMargin" >
                <div className="control_panel">
                  <p id="loading_text">Loading libraries, please wait a bit...</p>
              </div>
                <div id="info_div" className="innerDisplay">
                  <div className="center_field">
                      <span id="label"></span>
                  </div>
                  <div className="center_field">
                      <div className="bottom_field">
                          <span id="labelhelp">click to continue or tap and drag again</span>
                      </div>
                  </div>
              </div>
              <div id="selector_div" className="innerDisplay">
                  <div className="center_field">
                      <div id="sethelp">
                          choose your dice set by clicking the dices or by direct input of notation,<br/>
                          tap and drag on free space of screen or hit throw button to roll
                      </div>
                  </div>
                  <div className="center_field">
                      <input type="text" id="set" value="1d6"></input><br/>
                      <button id="clear">clear</button>
                      <button className="marginLeft" id="throw">throw</button>
                  </div>
              </div>
              <div id="canvas"></div>
            </div>
        );
    }
};

export default Dice;
