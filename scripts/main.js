// get html form element
const formEl = document.querySelector(".form");
console.log(formEl);

let typedNumberOfQuestions;
let selectedDifficulty;

// when user clicks start - get the data and redirect to game page
formEl.addEventListener("submit", (event) => {
  // get level and number of questions values from user
  typedNumberOfQuestions = event.target.questionsNumber.value;
  selectedDifficulty = event.target.chooseDifficulty.value;

  // save these values in computer memory, so we can use them in game.js
  localStorage.setItem("questions", typedNumberOfQuestions);
  localStorage.setItem("level", selectedDifficulty);
});
