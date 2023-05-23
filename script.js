const questionContainer = document.querySelector('.question-container');
const buttonNext = document.querySelector('.button-next')
const inputs = document.querySelectorAll('input');
const article = document.querySelector('article');


async function printQuestionsAndAnswers() {

    try {
        let response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
        let data = await response.json();
        let objQuestions = data.results;
        for 
        let questions = data.results.question;
            let correctAnswer = objQuestions[0].correct_answer;
        let incorrectAnswer = objQuestions[0][incorrect_answers];
        console.log(questions);
        console.log(correctAnswer);
        console.log(incorrectAnswer);

        // let objectDePutaMadre = [{
        //     correctAnswer: `${questions[correct_answer]}`,
        //     incorrectAnswert: `${questions[incorrect_answers]}`,
        //     question: `${questions.question}`
        // }];

        // console.log(objectDePutaMadre);







    }
    catch (error) {
        console.error(error)
    }
    //Unir en un array la respuesta correcta y las incorrectas


}

printQuestionsAndAnswers();






