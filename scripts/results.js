const resultsEl = document.querySelector(".results__text");

let correctAnswers = localStorage.getItem("correctAnswers");
let totalQuestions = localStorage.getItem("totalQuestions");

resultsEl.innerText = `${correctAnswers}/${totalQuestions}`;