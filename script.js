const questionContainer = document.querySelector('.question-container');
const buttonNext = document.querySelector('.button-next')
const inputs = document.querySelectorAll('input');
const article = document.querySelector('article');
console.log(article)

async function printQuestionsAndAnswers() {
    let response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
    let data = await response.json();
    let questions = data.results
    console.log(questions);

    let answersOfOneQuestion = []

    answersOfOneQuestion.push(questions[0].correct_answer)
    console.log(questions[0].incorrect_answers) //array de preguntas incorrectas

    //array de preguntas incorrectas iterandose
    for (let i = 0; i < questions[0].incorrect_answers.length; i++) {
        /*         let h2 = document.createElement('h2');
                h2.innerText = questions[i].question;
                article.appendChild(h2); */
        answersOfOneQuestion.push(questions[0].incorrect_answers[i])
    }

    console.log(answersOfOneQuestion);

    function randomArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];

        }
    }
    randomArray(answersOfOneQuestion)
    console.log(answersOfOneQuestion);

}


//BUTTON NEXT


printQuestionsAndAnswers();






