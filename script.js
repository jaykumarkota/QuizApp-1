const questions = [
  {
    question: "What is the largest animal in the world?",
    answers: [
      { option: "Elephant", correct: false },
      { option: "Blue Whale", correct: true },
      { option: "T Rex", correct: false },
      { option: "Human", correct: false },
    ],
  },
  {
    question: "Which is the only metal that is liquid at room temperature?",
    answers: [
      { option: "Mercury", correct: true },
      { option: "Iron", correct: false },
      { option: "Gold", correct: false },
      { option: "Silver", correct: false },
    ],
  },
  {
    question: "Which planet has the most moons?",
    answers: [
      { option: "Earth", correct: false },
      { option: "Jupiter", correct: false },
      { option: "Saturn", correct: true },
      { option: "Mars", correct: false },
    ],
  },
  {
    question: "What is the only mammal capable of true flight?",
    answers: [
      { option: "Flying Squirrel", correct: false },
      { option: "Bat", correct: true },
      { option: "Eagle", correct: false },
      { option: "Pigeon", correct: false },
    ],
  },
  {
    question: "What is the strongest muscle in the human body by weight?",
    answers: [
      { option: "Biceps", correct: false },
      { option: "Heart", correct: false },
      { option: "Jaw (Masseter)", correct: true },
      { option: "Leg Muscles", correct: false },
    ],
  },
];
const nextBtn = document.getElementById("next-btn");
const questionElm = document.querySelector(".question");
const options = document.querySelector(".options");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestions();
}

function showQuestions() {
  resetQuestions();
  let currQuestion = questions[currentQuestionIndex];
  let questionNum = currentQuestionIndex + 1;
  questionElm.innerHTML = `${questionNum}. ${currQuestion.question}`;

  currQuestion.answers.forEach((option) => {
    const button = document.createElement("button");
    button.innerHTML = option.option;
    button.classList.add("option");
    options.appendChild(button);
    if (option.correct) {
      button.dataset.correct = option.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
  nextBtn.style.display = "none";
}

function resetQuestions() {
  nextBtn.style.display = "none";
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
}

function selectAnswer(e) {
  let selectedOption = e.target;
  let isCorrect = selectedOption.dataset.correct === "true";
  if (isCorrect) {
    selectedOption.classList.add("correct");
    score++;
  } else {
    selectedOption.classList.add("incorrect");
  }
  Array.from(options.children).forEach((option) => {
    if (option.dataset.correct === "true") {
      option.classList.add("correct");
    }
    option.disabled = true;
  });
  nextBtn.style.display = "Block";
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    resetQuestions();
    showScore();
  }
}
function showScore() {
  questionElm.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again!";
  nextBtn.style.display = "block";
}

startQuiz();
