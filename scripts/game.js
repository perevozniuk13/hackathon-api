const API_BASE_URL = "https://opentdb.com/api.php?";

let typedNumberOfQuestions = localStorage.getItem("questions");
let selectedDifficulty = localStorage.getItem("level");

let correctAnswersCounter = 0; // ?? scope

const getQuestions = () => {
  axios
    .get(
      `${API_BASE_URL}amount=${typedNumberOfQuestions}&category=11&difficulty=${selectedDifficulty}&type=multiple`
    )
    .then((response) => {
      let questionsArray = response.data.results;
      console.log(questionsArray);
      let timerFunc;

      for (let i = 0; i < questionsArray.length; i++) {
        let time = 1000 * i * 5;

        setTimeout(() => {
          //     //timer
          //     let timerEl = document.querySelector(".timer");
          //     let timerFunc = () => {
          //         let j = 4;
          //         setInterval(() => {
          //         timerEl.innerText = j;
          //         j--;
          //         if (j === 0) {
          //             clearInterval(timerFunc);
          //         }
          //     }, 1000);
          // }

          //   timerFunc();

          let selected = false;
          console.log("time: ", time / 1000);

          let question = questionsArray[i];

          let questionEl = document.querySelector(".game__question");
          questionEl.innerHTML = question.question;

          let answer1El = document.querySelector(".game__answer--1");
          answer1El.classList.remove("game__answer--green");
          answer1El.classList.remove("game__answer--red");
          answer1El.innerHTML = question.incorrect_answers[0];

          let answer2El = document.querySelector(".game__answer--2");
          answer2El.classList.remove("game__answer--green");
          answer2El.classList.remove("game__answer--red");
          answer2El.innerHTML = question.incorrect_answers[1];

          let answer3El = document.querySelector(".game__answer--3");
          answer3El.classList.remove("game__answer--green");
          answer3El.classList.remove("game__answer--red");
          answer3El.innerHTML = question.incorrect_answers[2];

          let answer4El = document.querySelector(".game__answer--4");
          answer4El.classList.remove("game__answer--green");
          answer4El.classList.remove("game__answer--red");
          answer4El.classList.add("game__answer--correct");
          answer4El.innerHTML = question.correct_answer;

          let countEl = document.querySelector(".game__count");
          let totalQuestions = questionsArray.length;
          countEl.innerText = `${i + 1}/${questionsArray.length}`;

          // if user clicked on the answer
          let answers = [answer1El, answer2El, answer3El, answer4El];
          answers.forEach((answer) => {
            // when user clicks on any answer
            answer.addEventListener("click", () => {
              if (!selected) {
                if (answer.classList.contains("game__answer--correct")) {
                  answer.classList.add("game__answer--green");
                  correctAnswersCounter++;
                } else {
                  answer4El.classList.add("game__answer--green");
                  answer.classList.add("game__answer--red");
                }
              }
              selected = true;

              // when show the last question display finish button
              if (i === questionsArray.length - 1 && selected) {
                console.log("s", selected);
                let buttonEl = document.querySelector(".game__finish");
                localStorage.setItem("totalQuestions", totalQuestions);
                localStorage.setItem("correctAnswers", correctAnswersCounter);
                buttonEl.classList.add("game__finish--display-button");
                // timer stop
                // if (selected || j === 0) {
                //     console.log("worked");
                //     clearInterval(timerFunc);
                // }
              }
            });
          });
        }, time);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

getQuestions();
