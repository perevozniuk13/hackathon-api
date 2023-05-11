const resultsEl = document.querySelector(".results__text");
const resultsTitleEl = document.querySelector(".results__title");

// get total number of questions and correct answers received in game.js
let correctAnswers = localStorage.getItem("correctAnswers");
let totalQuestions = localStorage.getItem("totalQuestions");

resultsTitleEl.innerText = `Result: ${correctAnswers}/${totalQuestions}`;

if (correctAnswers >= totalQuestions / 2) {
    resultsEl.innerText = `Great Job!`;
}
else  {

    resultsEl.innerHTML = `Nice try! <br> Consider watching more movies before your next trivia`;
}
