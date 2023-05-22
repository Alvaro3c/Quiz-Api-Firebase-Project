const questionContainer = document.querySelector('.question-container');
const inputs = document.getElementsByTagName('input')
let questions = [];

async function printQuestionsAndAnswers() {
    let response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
    let data = await response.json();
    let questions = data.results;
    console.log(questions);

    for (let i = 0; i < questions.length; i++) {
        //Questions
        let h2 = document.createElement('h2');
        h2.innerHTML = questions[i].question;
        questionContainer.appendChild(h2);

        //inputs from correct answers
        let inputCorrect = document.createElement('input');
        inputCorrect.setAttribute('type', 'radio');
        inputCorrect.setAttribute('value', 'correct')
        questionContainer.appendChild(inputCorrect);

        //Correct answer
        let correctAnswer = document.createElement('label');
        correctAnswer.innerHTML = questions[i].correct_answer;
        questionContainer.appendChild(correctAnswer);

        //incorrect answers
        let incorrectAnswers = questions[i].incorrect_answers;
        //esto es un bucle for of, la primera variable es cada elemento, y la segunda es el array completo
        for (let incorrectAnswer of incorrectAnswers) {
            //inputs for incorrect answers
            let inputIncorrect = document.createElement('input');
            inputIncorrect.setAttribute('type', 'radio');
            questionContainer.appendChild(inputIncorrect)

            //Incorrect answers printed
            let pOfIncorrectAnswers = document.createElement('label');
            pOfIncorrectAnswers.innerText = incorrectAnswer;
            pOfIncorrectAnswers.setAttribute('value', 'incorrect')
            questionContainer.appendChild(pOfIncorrectAnswers)
        }
    }

    // Crear id/for/name a los inputs/label    
    const inputs = document.querySelectorAll('input');
    const labels = document.querySelectorAll('label');
    
    for (let i = 0; i < inputs.length; i++) {
      const id = (i + 1).toString();
      const input = inputs[i];
      const label = labels[i];
      
      input.name = 'respuesta';
      input.id = id;
      label.setAttribute('for', id);
    }
}
console.log(inputs);
printQuestionsAndAnswers();

//Comprobar seleccion usuario

// Función para obtener las respuestas seleccionadas por el usuario y las respuestas correctas
function getSelectedAnswers() {
    const selectedAnswers = [];
    const inputs = document.querySelectorAll('input[type="radio"]:checked');
  
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const questionIndex = parseInt(input.getAttribute('name').split('_')[1]);
      const answer = input.value;
  
      selectedAnswers.push({
        questionIndex: questionIndex,
        answer: answer
      });
    }
  
    return selectedAnswers;
  }

 
  // Función para comprobar las respuestas seleccionadas por el usuario y las respuestas correctas
  function checkUserAnswers() {
    const selectedAnswers = getSelectedAnswers();
    const userResults = [];
    let score = 0;
  
    for (let i = 0; i < selectedAnswers.length; i++) {
      const selectedAnswer = selectedAnswers[i];
      const question = questions[selectedAnswer.questionIndex];
  
      if (question) {
        const correctAnswer = question.correct_answer;
  
        const isCorrect = selectedAnswer.answer === correctAnswer;
  
        userResults.push({
          questionIndex: selectedAnswer.questionIndex,
          userAnswer: selectedAnswer.answer,
          correctAnswer: correctAnswer,
          isCorrect: isCorrect
        });
  
        if (isCorrect) {
          score++;
        }
      }
    }
  
    console.log(score);
    console.log(userResults);
  }
  
  // Ejecutar la función para comprobar las respuestas cuando sea necesario, por ejemplo, cuando el usuario haga clic en un botón "Comprobar respuestas"
  const checkButton = document.querySelector('.button-next');
  checkButton.addEventListener('click', checkUserAnswers);