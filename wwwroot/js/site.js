var player_picks = [];
var lucky_dip = [];
var game_picks = [];
var ball_bag = [];

let balls = 6;
let matches = 0;

const scores = document.getElementById('scores');

let playerScore = 0;

const test_picks1 = [3, 12, 25, 34, 45, 56];
const test_picks2 = [3, 12, 22, 34, 45, 56];

const minNumber = 1;
const maxNumber = 59;
const count = 6;

$('.lucky-dip').on('click', function () {

	$('.player-lottery').empty();

	lucky_dip = [];

	lucky_dip = lotteryPicker(1, 59, 6);

	for (i = 0; i < balls; i++) {

		$('.player-lottery').append('<li class="player-lottery-ball">' + lucky_dip[i] + '</li>');
	}
});

$('.manual-picks').on('click', function () {

	$('.player-lottery').empty();

	player_picks = [];

	var input1 = document.getElementById('number1').value;
	var input2 = document.getElementById('number2').value;
	var input3 = document.getElementById('number3').value;
	var input4 = document.getElementById('number4').value;
	var input5 = document.getElementById('number5').value;
	var input6 = document.getElementById('number6').value;

	player_picks.push(input1, input2, input3, input4, input5, input6);

	for (i = 0; i < balls; i++) {

		$('.player-lottery').append('<li class="player-lottery-ball">' + player_picks[i] + '</li>');
	}
});

//lucky_dip = test_picks1;
//game_picks = test_picks2;

$('.start-game').on('click', function () {

	game_picks = [];

	$('.draw-lottery').empty();

	game_picks = lotteryPicker(1, 59, 6);

	for (i = 0; i < balls; i++) {

		$('.draw-lottery').append('<li class="draw-lottery-ball">' + game_picks[i] + '</li>');
	}

	matches = countMatchingElements(player_picks, game_picks);

	switch (+matches) {

		case 1:
			playerScore = playerScore + 0;
			updateScore();
			break;
		case 2:
			playerScore = playerScore + 0;
			updateScore();
			break;
		case 3:
			playerScore = playerScore + 50;
			updateScore();
			break;
		case 4:
			playerScore = playerScore + 100;
			updateScore();
			break;
		case 5:
			playerScore = playerScore + 200;
			updateScore();
			break;
		case 6:
			playerScore = playerScore + 500;
			updateScore();
			break;
		default:
			playerScore = playerScore + 0;
			updateScore();
			break;
	}

	document.querySelector('.start-game').textContent = "Roll Again!";
});

$('.reset-game').on('click', function () {

	matches = 0;

	$('.player-lottery').empty();
	$('.draw-lottery').empty();

	playerScore = 0;
	updateScore();

	document.querySelector('.start-game').textContent = "Start Game";
});

function countMatchingElements(arr1, arr2) {
	return arr1.reduce((count, item) => {
		if (arr2.includes(item)) {
			return count + 1;
		}
		return count;
	}, 0);
}

function updateScore() {
	const playerScorePara = document.getElementById("playerScore");

	playerScorePara.textContent = `Player: ${playerScore}`;
}

function checkValue() {

	var input1 = document.getElementById('number1').value;
	var input2 = document.getElementById('number2').value;
	var input3 = document.getElementById('number3').value;
	var input4 = document.getElementById('number4').value;
	var input5 = document.getElementById('number5').value;
	var input6 = document.getElementById('number6').value;

	if (input1.value != null || input1 >= 1 || input1 <= 59 && input2.value != null || input2 >= 1 || input2 <= 59 && input3.value != null || input3 >= 1 || input3 <= 59 &&
		input4.value != null || input4 >= 1 || input4 <= 59 && input5.value != null || input5 >= 1 || input5 <= 59 && input6.value != null || input6 >= 1 || input6 <= 59) {

		document.querySelector('.manual-picks').disabled = false;
	}
}

function lotteryPicker(minNumber, maxNumber, count) {

	game_picks = [];
	lucky_dip = [];
	player_picks = [];

	if (maxNumber - minNumber + 1 < count) {
		throw new Error("The range is not large enough to pick " + count + " unique numbers.");
	}

	const pickedNumbers = new Set();

	while (pickedNumbers.size < count) {
		const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
		pickedNumbers.add(randomNumber);
	}

	return Array.from(pickedNumbers);
}

try {

	player_picks = lotteryPicker(minNumber, maxNumber, count);
	console.log("Lottery numbers: ", player_picks);
} catch (error) {
	console.error(error.message);
}

for (i = 0; i < 6; i++) {

	$('.player-lottery').append('<li class="player-lottery-ball">' + player_picks[i] + '</li>');

}

document.querySelector('.manual-picks').disabled = true;