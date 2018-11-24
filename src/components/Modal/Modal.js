import React from 'react';
import './Modal.scss';

const Modal = ({ showDice, gameEnded, isTeamAWin, isTeamA }) => <div className="modal">
  { showDice && !gameEnded && <span className={isTeamA ? 'modal--blue' : 'modal--red' }>Ход {isTeamA ? 'синей' : 'красной' } команды <br />(для броска костей проведите по экрану)</span> }
  { gameEnded && <span className={isTeamAWin ? 'modal--blue' : 'modal--red' }>Поздравляем {isTeamAWin ? 'синюю' : 'красную' } команду с победой</span> }
</div>

export default Modal;
