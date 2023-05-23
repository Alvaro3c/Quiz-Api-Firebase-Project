const questionContainer = document.querySelector('.question-container');
const buttonNext = document.querySelector('.button-next')
const inputs = document.querySelectorAll('input');
const article = document.querySelector('article');


async function printQuestionsAndAnswers() {
    let response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
    let data = await response.json();
    let questions = data.results;

    function randomArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        };
    };
    //Unir en un array la respuesta correcta y las incorrectas
    let arrayAllAnswers = [];
    for (let i = 0; i < questions.length; i++) {
        let arrayAnswers = []
        arrayAnswers.push(questions[i].correct_answer);

        for (let j = 0; j < 3; j++) {
            arrayAnswers.push(questions[i].incorrect_answers[j])

        }
        randomArray(arrayAnswers)//Esto retorna un array randomizado de COJONES 0P0
        arrayAllAnswers.push(arrayAnswers)
    }

    let print = ``

    // funcion para randomizar las respuestas. Eto no ze toca


}

printQuestionsAndAnswers();






