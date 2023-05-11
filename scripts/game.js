const API_BASE_URL = "https://opentdb.com/api.php?";


// get number of questions and level values received in main.js
let typedNumberOfQuestions = localStorage.getItem("questions");
let selectedDifficulty = localStorage.getItem("level");


//set counter of correct answers to zero
let correctAnswersCounter = 0;
let correctAnswerEl;

// function to assign amswers to its elements on page
function assignAnswers(elementsArray, incorrectAnsArray, correct_answer, correctAnsIndex) {
    let indexCounter = 0;
    elementsArray.forEach((elem, index) => {
        if (index === correctAnsIndex) {
            elem.innerHTML = correct_answer;
            correctAnswerEl = elem;
            elem.classList.add("game__answer--correct")
        }
        else {
            elem.innerHTML = incorrectAnsArray[indexCounter];
            indexCounter++;
            console.log("indexCounter", indexCounter);
        }
    })


} 

// get random number from array 
function getRandomNum(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Maybe: 
//   - Create a variable in global scope
//   - Make sure it matches the time from startTimer
//   - Use it in the setTimeout below
let masterTime;

// screen timer function 
function startTimer(duration, display, answersArray) {
    var timer = duration, seconds;
    display.innerText = "0";
    var intervalId = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? seconds : seconds;

        // display time left on page
        display.innerText = `${seconds}`;

        if (--timer < 0) {
            timer = duration;
        }

        // stop timer if there's no time left
        if (seconds == 0) {
            display.innerText = `${seconds}`;
            clearInterval(intervalId);
        }
    }, 1000);

    // stop timer if user clicked on any answer
    answersArray.forEach((answerButton) => {
        answerButton.addEventListener('click', function () {
            display.innerText = `${seconds}`;
            clearInterval(intervalId);
        })
    });
}



// main quiz function to get questions from api and display them 
const getQuestions = () => {
  axios
    .get(
      `${API_BASE_URL}amount=${typedNumberOfQuestions}&category=11&difficulty=${selectedDifficulty}&type=multiple`
    )
    .then((response) => {
      let questionsArray = response.data.results;
      console.log(questionsArray);

      // set time for each question
      let answerDuration = 10;

      // loop for every question
      for (let i = 0; i < questionsArray.length; i++) {
        // set time for setTimeOut function
        let questionTime = answerDuration+1;

        setTimeout(() => {
          let overlayEl = document.querySelector(".overlay");
          overlayEl.classList.add("overlay--nodisplay");

          
          let selected = false;

          // get each question from questions array
          let question = questionsArray[i];

          // display question on page
          let questionEl = document.querySelector(".game__question");
          questionEl.innerHTML = question.question;

          // display all answers on the page

          // get all answers elements
          let answer1El = document.querySelector(".game__answer--1");
          answer1El.classList.remove("game__answer--green");
          answer1El.classList.remove("game__answer--red");
        //   answer1El.innerHTML = question.incorrect_answers[0];

          let answer2El = document.querySelector(".game__answer--2");
          answer2El.classList.remove("game__answer--green");
          answer2El.classList.remove("game__answer--red");
        //   answer2El.innerHTML = question.incorrect_answers[1];

          let answer3El = document.querySelector(".game__answer--3");
          answer3El.classList.remove("game__answer--green");
          answer3El.classList.remove("game__answer--red");
        //   answer3El.innerHTML = question.incorrect_answers[2];

          // correct answer (for now)
          let answer4El = document.querySelector(".game__answer--4");
          answer4El.classList.remove("game__answer--green");
          answer4El.classList.remove("game__answer--red");
        //   answer4El.classList.add("game__answer--correct");
        //   answer4El.innerHTML = question.correct_answer;

          // function to assign answers to its elements
          assignAnswers([answer1El, answer2El, answer3El, answer4El], question.incorrect_answers, question.correct_answer, getRandomNum([0, 1, 2, 3]));


          // display question count on the page
          let countEl = document.querySelector(".game__count");
          let totalQuestions = questionsArray.length;
          countEl.innerText = `${i + 1}/${questionsArray.length}`;

          // select timer element on the page
          let timerEl = document.querySelector(".timer");

          // get all answers into array
          let answers = [answer1El, answer2El, answer3El, answer4El];


          // start timer for the question
          startTimer(answerDuration, timerEl, answers);

          answers.forEach((answer) => {
            // when user clicks on any answer
            answer.addEventListener("click", () => {
                // if it is his first clicked answer
              if (!selected) {
                // if the answer is correct - highlight with green
                if (answer.classList.contains("game__answer--correct")) {
                  answer.classList.add("game__answer--green");
                  correctAnswersCounter++;
                } 
                // else - wrong answer - highlight with red
                else {
                  correctAnswerEl.classList.add("game__answer--green");
                  answer.classList.add("game__answer--red");
                }
              }
              


              // selected answer flag
              selected = true;

              // when user selected answer for the last question --- display 'get results' button
              if (i === questionsArray.length - 1 && selected) {
                let buttonEl = document.querySelector(".game__finish");
                buttonEl.classList.add("game__finish--display-button");

                // store total questions and total correct into memory, so we can use them on results page
                localStorage.setItem("totalQuestions", totalQuestions);
                localStorage.setItem("correctAnswers", correctAnswersCounter);

                // display 'get results' button
                buttonEl.innerText = "get results";
              }
        
            });
          });
        }, 1000 * i * questionTime); // Todo: This should use the time set via startTimer()
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

getQuestions();
