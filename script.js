let getInfo;
let isResultsStored = false;
// Traer de la API la información que queremos

async function fetchQuestions() {
    try {
        let response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
        let data = await response.json();
        let objQuestions = data.results;
        console.log(objQuestions);
        getInfo = objQuestions.map(question => ({
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

//Randomizar las respuestas

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


//Si hay respuestas en LocalStorage, que no se actualice

function getQuestionsFromLocalStorage() {
    let questionsData = localStorage.getItem('questionsData');
    if (questionsData) {
        return JSON.parse(questionsData);
    }
    return null;
}

//Mostrar la primera pregunta
function showQuestion(question, index) {
    let section = document.querySelector('.question-container');
    let article = document.createElement('article');
    article.classList.add('question');
    let arrTemplateString = [
        `
    <input type="radio" id="answer_${index}_correct" name="answer_${index}" value="${question.correctAnswer}">
    <label for="answer_${index}_correct">${question.correctAnswer}</label>
    `,
        `
    <input type="radio" id="answer_${index}_incorrect1" name="answer_${index}" value="${question.incorrectAnswers[0]}">
    <label for="answer_${index}_incorrect1">${question.incorrectAnswers[0]}</label>
    `,
        `
    <input type="radio" id="answer_${index}_incorrect2" name="answer_${index}" value="${question.incorrectAnswers[1]}">
    <label for="answer_${index}_incorrect2">${question.incorrectAnswers[1]}</label>
    `,
        `
    <input type="radio" id="answer_${index}_incorrect3" name="answer_${index}" value="${question.incorrectAnswers[2]}">
    <label for="answer_${index}_incorrect3">${question.incorrectAnswers[2]}</label>
    `
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

//Mostrar la siguiente pregunta
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




    //Comprobar si el usuario ha seleccionado una opcion y si es la correcta que se sume al marcador
    let score = 0;

    function handleNextButtonClick() {
        const selectedAnswer = questions[currentIndex].querySelector(`input[name="answer_${currentIndex}"]:checked`);

        if (!selectedAnswer) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Giving up already? Select an answer, you bastard',
                color: '#0AA88E',
                confirmButtonColor: '#0AA88E',
            })
            return;
        }

        const userAnswer = selectedAnswer.value;
        const correctAnswer = getInfo[currentIndex].correctAnswer;
        const isAnswerCorrect = userAnswer === correctAnswer;

        if (isAnswerCorrect) {
            score++;
        }


        console.log(score);

        currentIndex++;
        if (currentIndex < questions.length) {
            showQuestionAtIndex(currentIndex);
        } else {
            window.location.href('results.html');
        }
    }
    //Que la ultima pregunta vaya a la página de resultados
    function handleLastQuestion() {
        nextButton.innerHTML = `<a href="results.html">Show Results</a>`;
        nextButton.removeEventListener('click', handleNextButtonClick);

        if (!isResultsStored) {
            const currentDate = new Date().toLocaleDateString();
            const gameData = {
                score,
                date: currentDate
            };

            // localStorage.setItem('gameData', JSON.stringify(gameData)); 

            let scoresData = [];
            if (localStorage.getItem('gameData')) {
                scoresData = JSON.parse(localStorage.getItem('gameData'));
            }

            scoresData.push(gameData);
            localStorage.setItem('gameData', JSON.stringify(scoresData));
            isResultsStored = true;
        }
    }

    let nextButton = document.querySelector('.button-next');
    nextButton.addEventListener('click', () => {
        if (currentIndex < questions.length - 1) {
            handleNextButtonClick()
        }
        else {
            handleLastQuestion()
        }
    });
    showQuestionAtIndex(currentIndex);

}

function getQuestionsFromLocalStorage() {
    let questionsData = localStorage.getItem('gameData');
    if (questionsData) {
        return JSON.parse(questionsData);
    }
    return [];
}

async function printQuestionsAndAnswers() {
    getInfo = await fetchQuestions();
    if (getInfo) {
        getInfo.forEach((question, index) => {
            showQuestion(question, index);
        });
        showNextQuestion();
    }
}
printQuestionsAndAnswers();
let obj = {
    value1: '1',
    value2: 'h'
}


//Chartist
const getData = JSON.parse(localStorage.getItem('gameData'));
console.log(getData)
const dates = getData.map(gameData => gameData.date);
console.log(dates)
const scores = getData.map(gameData => gameData.score);
console.log(scores)

var data = {
    labels: dates,
    series: [scores]
};

var options = {
    width: 1200,
    height: 800,
    high: 10,
    low: 0,
    axisY: {
        onlyInteger: true,
        offset: 20
    }
};

var responsiveOptions = [
    ['screen and (min-width: 641px) and (max-width: 1024px)', {
        showPoint: false,
        axisX: {
            labelInterpolationFnc: function (value) {
                // Will return Mon, Tue, Wed etc. on medium screens
                return value.slice(0, 3);
            }
        }
    }],
    ['screen and (max-width: 640px)', {
        showLine: false,
        axisX: {
            labelInterpolationFnc: function (value) {
                // Will return M, T, W etc. on small screens
                return value[0];
            }
        }
    }]
];

var defaultOptions = {
    // Options for X-Axis
    axisX: {
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        // If labels should be shown or not
        showLabel: true,
        // If the axis grid should be drawn or not
        showGrid: false,
    },

    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: '50%',
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: '50%',
    // If the line should be drawn or not
    showLine: true,
    // If dots should be drawn or not
    showPoint: true,
    // The base for the area chart that will be used to close the area shape (is normally 0)
    areaBase: 0,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {
        top: 150,
        right: 15,
        bottom: 5,
        left: 10
    },

    // Override the class names that get used to generate the SVG structure of the chart
    classNames: {
        chart: 'ct-chart-line',
    }
}


new Chartist.Line('.ct-chart', data, options, null, responsiveOptions, defaultOptions);









