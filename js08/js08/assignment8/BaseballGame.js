var newButton = document.getElementById('new');
var keySpan = document.getElementById('key');
var guessSpan = document.getElementById('guess');
var tbodyStat = document.getElementById('tbody-stat');
var digitButtons = document.querySelectorAll('.digit');
var secretKey;

class BaseballGame {
    
    secretKey(){
    
        var digits = Array.from({ length: 10 }, (_, i) => i);

        for (var i = digits.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [digits[i], digits[j]] = [digits[j], digits[i]];
        }
        var secretKey = digits.slice(0, 3).join(',');

        return secretKey;

    }

    updateGuess(digit) {
        var currentGuess = guessSpan.textContent || '';
        if (currentGuess.length < 3) {
            guessSpan.textContent = currentGuess + digit ;
        }
    }

    clearGuess() {
        guessSpan.textContent = '';
    }

    clearTable() {
        tbodyStat.innerHTML = '';
    }

    updateTable() {
        var currentGuess = guessSpan.textContent;
        if (currentGuess.length === 3) {
            var newRow = document.createElement('tr');
            var guessCell = document.createElement('td');
            var ballsCell = document.createElement('td');
            var strikesCell = document.createElement('td');

            guessCell.textContent = currentGuess.split('').join(',');;
            ballsCell.textContent = game.getBalls(currentGuess);
            strikesCell.textContent = game.getStrikes(currentGuess);

            newRow.appendChild(guessCell);
            newRow.appendChild(ballsCell);
            newRow.appendChild(strikesCell);

            tbodyStat.appendChild(newRow);
            game.clearGuess();

            if (currentGuess === secretKey.replace(/,/g, '')) {
                alert(' Strike Out  ~~~ \n The key was ' + secretKey + '\n<new> to play again');
                game.enableDigitButtons();
            }

        }
    }

    getBalls(guess) {
        var secretKeyDigits = secretKey.split(',').map(Number);
        var guessDigits = guess.split('').map(Number);

        var balls = 0;
        for (var i = 0; i < guessDigits.length; i++) {
            if (secretKeyDigits.includes(guessDigits[i]) && secretKeyDigits[i] !== guessDigits[i]) {
                balls++;
            }
        }

        return balls;
    }

    getStrikes(guess) {
        var secretKeyDigits = secretKey.split(',').map(Number);
        var guessDigits = guess.split('').map(Number);

        var strikes = 0;

        for (var i = 0; i < guessDigits.length; i++) {
            if (secretKeyDigits[i] === guessDigits[i]) {
                strikes++;
            }
        }

        return strikes;
    }

    disableDigitButton(button) {
        button.disabled = true;
    }

    enableDigitButtons() {
        digitButtons.forEach(function (button) {
            button.disabled = false;
        });
    }

}