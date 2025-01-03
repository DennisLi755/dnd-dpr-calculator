// idx -> dice
// 0 -> d4
// 1 -> d6
// 2 -> d8
// 3 -> d10
// 4 -> d12

const dice = [
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
];

const diceTitles = ["d4", "d6", "d8", "d10", "d12"];

const diceAvg = dice.map(die => (die[0] + die[die.length - 1]) / 2);
const diceMin = 1;
const diceMax = [4, 6, 8, 10, 12];

export {diceAvg, dice, diceTitles, diceMin, diceMax};