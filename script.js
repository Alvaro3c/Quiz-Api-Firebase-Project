const questionContainer = document.querySelector('.question-container');
const inputs = document.querySelectorAll('.answer')
const buttonNext = document.querySelector('.button-next')

async function printQuestionsAndAnswers() {
    let response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
    let data = await response.json();
    let questions = data.results
    console.log(questions);

    //Questions
    let h2 = document.createElement('h2');
    h2.innerHTML = questions[0].question;
    questionContainer.appendChild(h2);

    //inputs from correct answers
    let inputCorrect = document.createElement('input');
    inputCorrect.setAttribute('type', 'radio');
    inputCorrect.setAttribute('value', 'correct');
    questionContainer.appendChild(inputCorrect);

    //Correct answer
    let correctAnswer = document.createElement('label');
    correctAnswer.innerHTML = questions[0].correct_answer;
    questionContainer.appendChild(correctAnswer);

    //incorrect answers
    let incorrectAnswers = questions[0].incorrect_answers;
    for (let incorrectAnswer of incorrectAnswers) {
        //inputs for incorrect answers
        let inputIncorrect = document.createElement('input');
        inputIncorrect.setAttribute('type', 'radio');
        questionContainer.appendChild(inputIncorrect);

        //Incorrect answers printed
        let pOfIncorrectAnswers = document.createElement('label');
        pOfIncorrectAnswers.innerText = incorrectAnswer;
        pOfIncorrectAnswers.setAttribute('value', 'incorrect');
        questionContainer.appendChild(pOfIncorrectAnswers);
    };

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
    };

    //BUTTON NEXT
    let indexOfQuestionsArray = 1
    buttonNext.addEventListener('click', () => {
        let counter = indexOfQuestionsArray++

        //Input correct answer
        let inputCorrect = document.createElement('input');
        inputCorrect.setAttribute('type', 'radio');
        inputCorrect.setAttribute('value', 'correct');
        questionContainer.appendChild(inputCorrect);

        //next question
        let h2 = document.createElement('h2');
        h2.innerHTML = questions[counter].question;
        questionContainer.appendChild(h2);

        //next correct answer
        let correctAnswer = document.createElement('label');
        correctAnswer.innerHTML = questions[counter].correct_answer;
        questionContainer.appendChild(correctAnswer);

        //next incorrect answers
        let incorrectAnswers = questions[counter].incorrect_answers;
        for (let incorrectAnswer of incorrectAnswers) {
            //inputs for incorrect answers
            let inputIncorrect = document.createElement('input');
            inputIncorrect.setAttribute('type', 'radio');
            questionContainer.appendChild(inputIncorrect);

            //Incorrect answers printed
            let pOfIncorrectAnswers = document.createElement('label');
            pOfIncorrectAnswers.innerText = incorrectAnswer;
            pOfIncorrectAnswers.setAttribute('value', 'incorrect');
            questionContainer.appendChild(pOfIncorrectAnswers);
        };

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
        };
    });
};
printQuestionsAndAnswers();






