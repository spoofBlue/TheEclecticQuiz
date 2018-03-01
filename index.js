// See bottom of document to start at event handlers.

let questionNumber = 0;
let questionsAnswered = 0;
let score = 0;

//////////// UNIVERSAL FUNCTIONS /////////////////////////////  

function displayQuizProgress() {
  // Displays current questionNumber, score, questionsAnswered in header.
  $(".quiz-progress-list").html(
  `<li>Question: <span class="current-question-counter">${questionNumber}</span>/${STORE.length}
  </li>
   <li>Correct: <span class="current-score-counter">${score}</span>/<span class="question-answered-counter">${questionsAnswered}</span>
   </li>`);
}

function makeSectionInvisible(section) {
  // Make section invisible to user by applying CSS class with display:none. Then empty() for purposes of storage (isn't essential).
  $(section).addClass("hidden");
  $(section).empty();
}

function makeSectionVisible(section) {
  // Makes section visible to user by removing class with display:none.
  $(section).removeClass("hidden");
}

function updateQuestionNumber() {
  // Increments the questionNumber. Displays updated quiz progress.
  questionNumber ++;
  displayQuizProgress()
}

function upDateQuestionsAnswered() {
  // Increments the questionsAnswered. Displays updated quiz progress.
  questionsAnswered ++;
  displayQuizProgress()
}

function updateScore() {
  // Increments the score.  Displays updated quiz progress.
  score ++;
  displayQuizProgress()
}

////////////// handleStartButton FUNCTIONS //////////////////////

function displayQuestion() {
  // Display HTML of question section.
  $(".questions-section").html(
    
    `<img src="${STORE[questionNumber - 1].icon}" alt="${STORE[questionNumber - 1].alt}" class="icon icon-quiz-left">
    <img src="${STORE[questionNumber - 1].icon}" alt="${STORE[questionNumber - 1].alt}" class="icon icon-quiz-right">
    
    <h2 class="question question${questionNumber}">
      Question : ${STORE[questionNumber - 1].question}
    </h2>
        
    <form class="submit-choice-form" role="form">
    
      <fieldset role="radiogroup">
        <label for="choice1" class="choice">
        <input type="radio" name="choice" id="choice1" value="choice1" role="radio" required> <span>${STORE[questionNumber - 1].choice1}</span>
        </label>
          
        <label for="choice2" class="choice">
        <input type="radio" name="choice" id="choice2" value="choice2" role="radio" required> <span>${STORE[questionNumber - 1].choice2}</span>
        </label>
          
        <label for="choice3" class="choice">
        <input type="radio" name="choice" id="choice3" value="choice3" role="radio" required><span>${STORE[questionNumber - 1].choice3}</span>
        </label>

        <label for="choice4" class="choice">
        <input type="radio" name="choice" id="choice4" value="choice4" role="radio" required> <span>${STORE[questionNumber - 1].choice4}</span>
        </label>
      </fieldset>
      
      <div class="button-container">
        <button type="submit" class="submit-choice-button" role="button">Submit Choice</button>
      </div>
      
    </form>`
    );
}

function runQuestion() {
  // Update question number, remove hidden question section and display question.
  updateQuestionNumber();
  makeSectionVisible(".questions-section")
  displayQuestion();
}

function handleStartButton() {
  // On start button click in intro section, hides the intro section and runs the question section.
  $(".intro-section").on("click", ".start-quiz-button", function() {
    makeSectionInvisible(".intro-section");
    runQuestion();
  });
}

////////////// handleSubmitButton FUNCTIONS //////////////////////

function getUserChoice() {
  // Obtain the users checked choice.
  const choiceAlias = $(".questions-section").find("input:checked").val();
  const userChoice = STORE[questionNumber - 1][choiceAlias];
  return userChoice.trim();
}

function getCorrectChoice() {
  // Obtain the correct choice for the question.
  const correctChoice = STORE[questionNumber - 1].answer;
  return correctChoice.trim();
}

function isChoiceCorrect() {
  // Compare users choice with the correct answer.
  const userChoice = getUserChoice();
  const correctChoice = getCorrectChoice();
  return userChoice === correctChoice;
}

function displayFeedback(isUserCorrect) {
  // Display HTML of feedback section., using boolean isUserCorrect to alter text accordingly.
  $(".feedback-section").html(`
    <img src="${STORE[questionNumber - 1].icon}" alt="${STORE[questionNumber - 1].alt}" class="icon icon-quiz-left">
    <img src="${STORE[questionNumber - 1].icon}" alt="${STORE[questionNumber - 1].alt}" class="icon icon-quiz-right">
    
    <h2 class="choice-dependent-text">
    ${isUserCorrect ? `Correct :D` : `Wrong Answer :(`}
    </h2>
    
    <p> The question : ${STORE[questionNumber - 1].question} </p>
    
    <p class="correct-answer"> The correct answer : ${STORE[questionNumber - 1].answer}</p>
    
    <div class="button-container">
      <button class="next-question-button" role="button">
      ${ questionsAnswered !== STORE.length ? "Next Question" : "See Results"}
      </button>
    </div>`
    );
}

function runFeedback(isUserCorrect) {
  // Update questionsAnswered and (depending on boolean isUserCorrect) the score, removes hidden class from feedback section and displays feedback.
  upDateQuestionsAnswered();
  if (isUserCorrect) {
    updateScore();
  }
  makeSectionVisible(".feedback-section")
  displayFeedback(isUserCorrect);
}

function handleSubmitButton() {
  // On submission of a choice in question section, stores the choice chosen and hides the question section. Then runs the feedback section.
  $(".questions-section").on("submit", function(event) {
    event.preventDefault();
    const isUserCorrect = isChoiceCorrect();
    makeSectionInvisible(".questions-section");
    runFeedback(isUserCorrect);
  });
}

////////////// handleNextButton FUNCTIONS //////////////////////

function displayResults() {
  // Display HTML of results section.
  $(".results-section").html(
    `<h2 class="results-dependent-text">
      ${score < 4 ? "Uhh, better luck next time." : ( score >= 4 && score < 7 ? "Well done, you're pretty good, huh?" : "Wow!! You did amazing!") 
      }
    </h2>
    <p>You got <span class="results-score-display">${score} out of ${STORE.length}</span> questions correct! ${score < 4 ? "It's okay, I'm sure it was just an off day." : ( score >= 4 && score < 7 ? "Pretty good stuff, you're well on your way to becoming a genius!" : "You are a master of all disciplines!")}</p>
    <p>Thank you for taking the Eclectic Quiz.  I hope you've enjoyed yourself!</p>
    <div class="button-container">
      <button class="restart-quiz-button" role="button">Restart the Quiz!</button>
    </div>`);
}

function runResults() {
  // Removes hidden class from results section and displays results.
  makeSectionVisible(".results-section");
  displayResults();
}

function handleNextButton() {
  // On button click in feedback section, removes feedback section, then moves to next question if available, moves to result page otherwise.
  $(".feedback-section").on("click", ".next-question-button", function() {
    makeSectionInvisible(".feedback-section");
    if (questionsAnswered !== STORE.length) {
      runQuestion();
    } else {
      runResults();
    }
  });
}

////////////// handleRestartButton FUNCTIONS //////////////////////

function resetProgress() {
  //Reset global values to initial state and displays them.
  questionNumber = 0;
  questionsAnswered = 0;
  score = 0;
  displayQuizProgress();
}

function displayIntro() {
  // Display HTML of intro section.
  $(".intro-section").html(
    `<h2>
      Hello, and welcome to the Eclectic Quiz!!
    </h2>
    
    <p> Test your knowledge on a variety of topics and learn something along the way! 
    </p>
    
    <p>
      You'll be given multiple choice questions; each choice has a set of answers. Only one set of answers is correct, and the remaining choices are not even partially correct.  Best of luck!!
    </p>
    
    <div class="button-container">
      <button class="start-quiz-button" role="button" >Let's Start!</button>
    </div>`
  );
}

function runIntro() {
  // Removes hidden class from intro section and displays intro.
  resetProgress();
  makeSectionVisible(".intro-section");
  displayIntro();
}

function handleRestartButton() {
  // On button click in results section, hides the results section, moves back to intro section. Resets globals.
  $(".results-section").on("click", ".restart-quiz-button", function() {
    makeSectionInvisible(".results-section");
    runIntro();
  })
}

////////////////////////////////////////////////
// Event handlers initialized here. Children functions located above their respective event handler.  Except runIntro(), see handleRestartButton() functions.

function handleQuiz() {
  runIntro();
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

$(handleQuiz);

console.log("hello");
