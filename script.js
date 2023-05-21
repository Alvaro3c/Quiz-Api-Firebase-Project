const questionContainer = document.querySelector('.question-container');


async function printQuestionsAndAnswers() {
    let response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
    let data = await response.json();
    let questions = data.results;

    for (let i = 0; i < questions.length; i++) {
        //Preguntas
        let h2 = document.createElement('h2');
        h2.innerHTML = questions[i].question;
        questionContainer.appendChild(h2);

        //respuesta correcta
        let correctAnswer = document.createElement('p');
        correctAnswer.innerHTML = questions[i].correct_answer;
        questionContainer.appendChild(correctAnswer);

        //Respuestas incorrectas
        let incorrectAnswers = questions[i].incorrect_answers
        console.log(incorrectAnswers)
    }
}

printQuestionsAndAnswers();

