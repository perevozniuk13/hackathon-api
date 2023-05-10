const API_BASE_URL = "https://opentdb.com/api.php?";


// get html form element
const formEl = document.querySelector(".form");

// when user clicks start - get the data and redirect to game page
formEl.addEventListener("submit", (event) => {
    // event.preventDefault();
    const typedNumberOfQuestions =  event.target.questionsNumber.value;
    const selectedDifficulty = event.target.chooseDifficulty.value;
});





