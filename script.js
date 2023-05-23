
async function fetchQuestions() {
  try {
    let response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
    let data = await response.json();
    let objQuestions = data.results;
    let getInfo = objQuestions.map(question => ({
      question: question.question,
      correctAnswer: question.correct_answer,
      incorrectAnswers: question.incorrect_answers
    }));
    
    localStorage.setItem('questionsData', JSON.stringify(getInfo));

    return getInfo;

  } catch (error) {
    console.log(error);
  }
}


function showQuestion(question, index) {
  let section = document.querySelector('.question-container');
  let article = document.createElement('article');
  article.classList.add('question');

  let print = `<h2>${question.question}</h2>
    <input type="radio" id="answer_${index}_correct" name="answer_${index}" value="${question.correctAnswer}">
    <label for="answer_${index}_correct">${question.correctAnswer}</label>
    <input type="radio" id="answer_${index}_incorrect1" name="answer_${index}" value="${question.incorrectAnswers[0]}">
    <label for="answer_${index}_incorrect1">${question.incorrectAnswers[0]}</label>
    <input type="radio" id="answer_${index}_incorrect2" name="answer_${index}" value="${question.incorrectAnswers[1]}">
    <label for="answer_${index}_incorrect2">${question.incorrectAnswers[1]}</label>
    <input type="radio" id="answer_${index}_incorrect3" name="answer_${index}" value="${question.incorrectAnswers[2]}">
    <label for="answer_${index}_correct3">${question.incorrectAnswers[2]}</label>`;

  article.innerHTML = print;
  section.appendChild(article);
}


function showNextQuestion() {
  let section = document.querySelector('.question-container');
  let questions = section.querySelectorAll('.question');
  let currentIndex = 0;

  function showQuestionAtIndex(index) {
    questions.forEach((question, i) => {
      if (i === index) {
        question.style.display = 'block';
      } else {
        question.style.display = 'none';
      }
    });
  }

  function handleNextButtonClick() {
    let selectedAnswer = questions[currentIndex].querySelector(`input[name="answer_${currentIndex}"]:checked`);
    if (selectedAnswer) {
      currentIndex++;
      if (currentIndex < questions.length) {
        showQuestionAtIndex(currentIndex);
      } else {
        section.innerHTML = "¡Todas las preguntas han sido respondidas!";
      }
    } else {
      alert("Selecciona una respuesta antes de pasar a la siguiente pregunta.");
    }
  }

  let nextButton = document.querySelector('.button-next');
  nextButton.addEventListener('click', handleNextButtonClick);

  showQuestionAtIndex(currentIndex);
}


async function printQuestionsAndAnswers() {
  let getInfo = await fetchQuestions();
  if (getInfo) {
    getInfo.forEach((question, index) => {
      showQuestion(question, index);
    });

    
    showNextQuestion();
  }
}

printQuestionsAndAnswers();

