
async function fetchQuestions() {
    try {
        let response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
        let data = await response.json();
        let objQuestions = data.results;
        console.log(objQuestions);
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

function randomArray() {
    let topNum = 4;
    let numQuestions = 4;
    let questionNumbers = [];
    while (questionNumbers.length != numQuestions) {
        let num = Math.floor(Math.random() * topNum);
        if (!questionNumbers.includes(num)) {
            questionNumbers.push(num);
        }
    }
    return questionNumbers
}



function showQuestion(question, index) {
    let section = document.querySelector('.question-container');
    let article = document.createElement('article');
    article.classList.add('question');




    let arrTemplateString = [
        `<div class${index}" id="2">
    <input type="radio" id="answer_${index}_correct" name="answer_${index}" value="${question.correctAnswer}">
    <label for="answer_${index}_correct">${question.correctAnswer}</label>
    </div>`,
        `<div class${index}" id="3">
    <input type="radio" id="answer_${index}_incorrect1" name="answer_${index}" value="${question.incorrectAnswers[0]}">
    <label for="answer_${index}_incorrect1">${question.incorrectAnswers[0]}</label>
    </div>`,
        `<div class${index}" id="4">
    <input type="radio" id="answer_${index}_incorrect2" name="answer_${index}" value="${question.incorrectAnswers[1]}">
    <label for="answer_${index}_incorrect2">${question.incorrectAnswers[1]}</label>
    </div>`,
        `<div class${index}" id="1">
    <input type="radio" id="answer_${index}_incorrect3" name="answer_${index}" value="${question.incorrectAnswers[2]}">
    <label for="answer_${index}_incorrect3">${question.incorrectAnswers[2]}</label>
    </div>`
    ]

    let arrRandom = randomArray()
    let print = `<h2>${question.question}</h2>
        ${arrTemplateString[arrRandom[0]]}
        ${arrTemplateString[arrRandom[1]]}
        ${arrTemplateString[arrRandom[2]]}
        ${arrTemplateString[arrRandom[3]]}`;

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
                console.log(currentIndex)


            } else {
                section.innerHTML = "¡Todas las preguntas han sido respondidas!";
            }
        } else {
            alert("Selecciona una respuesta antes de pasar a la siguiente pregunta.");
        }
    }

    function handleLastQuestion() {
        nextButton.innerHTML = '<a href="results.html">Show results</a>'
        section.innerHTML = "¡Todas las preguntas han sido respondidas!";
    }
    //BUTTON NEXT
    let nextButton = document.querySelector('.button-next');

    nextButton.addEventListener('click', () => {
        if (currentIndex < questions.length - 1) {
            handleNextButtonClick()
        } else {
            handleLastQuestion()
        }
    });
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


