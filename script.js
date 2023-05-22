const questionContainer = document.querySelector('.question-container');
const inputs = document.getElementsByTagName('input')

async function printQuestionsAndAnswers() {
    let response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
    let data = await response.json();
    let questions = data.results;

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

printQuestionsAndAnswers();

//lo siguiente es conseguir el resultado. El resultado va a ser el numero de inputs en estado checked que tengan el value true. antes de nada hay que meterle un atributo value a las respuesta correctas de true, y a las incorrectas un valor de false


console.log(inputs)

console.log(inputs)