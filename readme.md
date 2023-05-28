# Quiz App
Una aplicación web de entretenimiento en la que tendremos que acertar las preguntas dadas

## Tecnologías 
- HTML
- CSS
- Javascript
- Chartlist
## funcionalidad
La aplicación empieza con la primera pregunta. Una vez respondida podremos pasar a la siguiente pregunta. Despues de responder a las 10 preguntas, podremos acceder a la pagina de resultados donde veremos cuantas preguntas hemos acertado y una gráfica con los resultados de los anteriores quiz que hayamos realizado.  

Estas Son todas las funciones que estan en el script.js:

- fetchQuestions()  
Recupera preguntas y respuestas de la API opentdb y sube las preguntas a local storage ya que cada vez que se refresca la pagina, las preguntas se actualizan.

- randomArray()  
Genera un array de numeros del 1 al 4 en orden aleatorio.

- getQuestionsFromLocalStorage()  
Recoge las preguntas y respuestas de local storage que previamente hemos subido con fetchQuestions.

- showQuestion()  
Imprime mediante template string las preguntas y respuestas. Las respuestas se pintan de forma aleatoria. Recibe como parametro las preguntas y el indice de las preguntas.

- showNextQuestion()  
Esta función contiene varias funciones que todas ellas trabajan para enseñar la siguiente pregunta. Contiene las siguientes funciones:  
    - showQuestionAtIndex()  
        Muestra la pregunta actual que estamos respondiendo, y esconde el resto de las preguntas.  
    - handleNextButtonClick()  
        Se encarga de que el usuario responda a todas las preguntas y de pasar a la siguiente pregunta. Esta funcion es llamada dentro del addEventListener del boton next.
    - handleLastQuestion()  
        Se encarga de cambiar el nombre del boton next a show results y de llevarnos a la pagina de resultados. También sube la puntuación conseguida a local storage.
- showResult()  
Imprime el resultado de las preguntas acertadas del quiz una vez terminado.

- getQuestionsFromLocalStorage()  
Retorna el resultado de todas las partidas jugadas que se han guradado en local storage

- printQuestionsAndAnswers()  
Imprime todas las preguntas y respuetas.

## links
Githubpages
## Screenshots
Fotos
## Objetivos

- El Quiz constará de 10 preguntas. Cada pregunta tendrá 4 opciones y sólo una de ellas será la correcta.
- Podrán ser preguntas nuestras y preguntas que vengan de https://opentdb.com/
- La aplicación tendrá que ser una SPA (single-page application). Sólo una pregunta cada vez en pantalla.

## Requirements

- Manipulación dinámica del DOM
- Crear una página SPA para las preguntas
- Manejo de ES6
- Asincronía. Usar API de preguntas https://opentdb.com/
- APIs HTML5: Uso de Local storage y gráficas, etc...
- Sin frameworks ni librerias externas en la medida de lo posible
- Gestión del proyecto en Github desde el principio. Uso de - ramas, fork, pull request, etc...
- Código limpio, buenas prácticas

