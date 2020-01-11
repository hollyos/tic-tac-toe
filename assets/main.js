window.onload = function() {
  const WinConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  let firstPlayer = true;
  let player1 = [];
  let player2 = [];

  /**
   * Check if the player has a win condition.
   *
   * @prop {[number]} winCondition The win condition to compare against the player.
   * @prop {[number]} player The chosen positions by the current player.
   * @return {boolean} Returns if the current player is a winner.
   */
  const checker = (winCondition, player) => {
    let winner = [];

    for (let index = 0; index < winCondition.length; index++) {
      const value = winCondition[index];

      if (!player.includes(value)) {
        winner = [];
        break;
      }

      winner.push(true);

      if (winner.length === 3) {
        return true;
      }
    }

    return false;
  };

  /**
   * Show the winner message in the DOM.
   */
  const showWinner = () => {
    const winner = (firstPlayer) ? 1 : 2;
    document.querySelector('.ttt-board').classList.add('ttt-win');

    document.querySelector('.ttt-win-message').innerHTML = `Winner!</p><p>Player ${winner}`;
  }

  /**
   * When the game board is clicked update the tiles and check for a win condition.
   *
   * @prop {object} event DOM onClick event object.
   */
  const clickHandler = (event) => {
    const { target } = event;
    const { position } = target.dataset;

    if (!target.childNodes.length) {
      target.innerHTML = `<span>${firstPlayer ? 'X' : 'O'}</span>`;

      if (firstPlayer) {
        player1.push(Number(position));
      } else {
        player2.push(Number(position));
      }

      WinConditions.forEach((winCondition) => {
        if ((player1.length && checker(winCondition, player1)) || (player2.length && checker(winCondition, player2))) {
          document.querySelector('.ttt-board').removeEventListener('click', clickHandler);
          showWinner();
        }
      })

      firstPlayer = !firstPlayer;
    }
  };

  /**
   * Reset the game conditions.
   */
  const reset = () => {
    document.querySelectorAll('.ttt-tile').forEach((tile) => {
      tile.innerHTML = '';
    });

    const board = document.querySelector('.ttt-board');

    board.className = 'ttt-board';
    board.removeEventListener('click', clickHandler);

    document.querySelector('.ttt-button').removeEventListener('click', reset);

    document.querySelector('.ttt-win-message').innerHTML = '';

    init();
  }

  /**
   * Initialize the game, connect the click handlers.
   */
  const init = () => {
    firstPlayer = true;
    player1 = [];
    player2 = [];

    document.querySelector('.ttt-board').addEventListener('click', clickHandler);
    document.querySelector('.ttt-button').addEventListener('click', reset);
  };

  init();
}