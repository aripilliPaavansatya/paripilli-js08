const game = new BaseballGame();
document.addEventListener('DOMContentLoaded', function () {   

    newButton.addEventListener('click', function () {
        secretKey = game.secretKey();
        keySpan.textContent = secretKey;
        game.clearGuess();
        game.clearTable();
        game.enableDigitButtons();
    });

    digitButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var digit = button.textContent;
            game.updateGuess(digit);
            game.disableDigitButton(button);
            game.updateTable();

            if (guessSpan.textContent.length % 3 === 0) {
                game.enableDigitButtons();
            }
        });
    });

});

