// get html form element

const formEl = document.querySelector(".form");
console.log(formEl);

let typedNumberOfQuestions;
let selectedDifficulty;

// when user clicks start - get the data and redirect to game page
formEl.addEventListener("submit", (event) => {
  //   event.preventDefault();
  typedNumberOfQuestions = event.target.questionsNumber.value;
  selectedDifficulty = event.target.chooseDifficulty.value;
  localStorage.setItem("questions", typedNumberOfQuestions);
  localStorage.setItem("level", selectedDifficulty);

  if (location.pathname === "/pages/game.html") {
    removeEventListener();
  }
});
