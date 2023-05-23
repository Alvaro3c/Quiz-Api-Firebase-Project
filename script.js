

async function printQuestionsAndAnswers() {

    try {
        let response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple');
        let data = await response.json();
        let objQuestions = data.results;

        // let correctCheck = [];
        // for (let i = 0; i < objQuestions.length; i++){
        //   correctCheck.push(question[i].correct_answer)
        // }

        let getInfo = objQuestions.map(question => ({
          question: question.question,
          correctAnswer: question.correct_answer,
          incorrectAnswers: question.incorrect_answers
        }));

        // let storeData = {
        //   correctCheck,
        //   getInfo
        // }
        
        localStorage.setItem('questionsData', JSON.stringify(getInfo)); //Aqui iria storeData, pero no funciona

        let article = document.querySelector('.question');

        let print = '';
        getInfo.forEach((question, index) => {
          print +=  `<h2>${question.question}</h2>
          <input type="radio" id="answer_${index}_correct" name="answer_${index}" value="${question.correctAnswer}">
          <label for="answer_${index}_correct" >${question.correctAnswer}</label>
          <input type="radio" id="answer_${index}_incorrect1" name="answer_${index}" value="${question.incorrectAnswers[0]}">
          <label for="answer_${index}_incorrect1" >${question.incorrectAnswers[0]}</label>
          <input type="radio" id="answer_${index}_incorrect2" name="answer_${index}" value="${question.incorrectAnswers[1]}">
          <label for="answer_${index}_incorrect2" >${question.incorrectAnswers[1]}</label>
          <input type="radio" id="answer_${index}_incorrect3" name="answer_${index}" value="${question.incorrectAnswers[2]}">
          <label for="answer_${index}_correct3" >${question.incorrectAnswers[2]}</label>`;
        });
        article.innerHTML = print;
      }
      catch (error) {
        console.error(error)
      }

}
  printQuestionsAndAnswers();

 