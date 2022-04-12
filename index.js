//// PASAPALABRA 3 OPCIONES ////

const nextWordGame = () => {
  const questions = [
    {
      letter: "a",
      answer: "abducir",
      status: 0,
      question:
        "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien",
      variableQuestion() {
        num = Math.floor(Math.random() * 3);
        if (num === 0) {
          this.answer = "abducir";
          this.question =
            "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien";
        } else if (num === 1) {
          this.answer = "alirón";
          this.question =
            "CON LA A. Se celebra cuando un equipo de futbol vasco gana la liga de futbol profesional.";
        } else {
          this.answer = "árbol";
          this.question = "CON LA A. Crece en los bosques.";
        }
      },
    },

    {
      letter: "b",
      answer: "bingo",
      status: 0,
      question:
        "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso",
      variableQuestion() {
        index = Math.floor(Math.random() * 3);
        if (index === 0) {
          this.answer = "bingo";
          this.question =
            "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso";
        } else if (index === 1) {
          this.answer = "biberón";
          this.question = "CON LA B. Lo utilizan los bebés para beber.";
        } else {
          this.answer = "bocina";
          this.question =
            "CON LA B. Lo utilizamos en el coche cuando queremos avisar a otro conductor.";
        }
      },
    },

    {
      letter: "c",
      answer: "churumbel",
      status: 0,
      question: "CON LA C. Niño, crío, bebé",
      variableQuestion() {
        index = Math.floor(Math.random() * 3);
        if (index === 0) {
          this.answer = "churumbel";
          this.question = "CON LA C. Niño, crío, bebé";
        } else if (index === 1) {
          this.answer = "comida";
          this.question =
            "CON LA C. Nos lo llevamos a la boca típicamente de 3 a 5 veces al día.";
        } else {
          this.answer = "cocinero";
          this.question =
            "CON LA C. Persona que trabaja en los restaurantes preparando comida.";
        }
      },
    },

    {
      letter: "d",
      answer: "diarrea",
      status: 0,
      question:
        "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida",
      variableQuestion() {
        index = Math.floor(Math.random() * 3);
        if (this.status === 0) {
          this.answer = "diarrea";
          return "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida";
        } else if (index === 1) {
          this.answer = "dedo";
          return "CON LA D. Parte hecha de carne y huesos que tenemos los humanos en la mano.";
        } else {
          this.answer = "dinosaurio";
          return "CON LA D. Animales que poblaron la tierra hace millones de años.";
        }
      },
    },
  ];

  const questionsLeft = [...questions];
  let playersScore = [
    { name: "William", score: 15 },
    { name: "Joel", score: 14 },
    { name: "Miquel", score: 10 },
    { name: "Thomas", score: 18 },
  ];
  let countScore = 0;

  const checkQuestionsLeft = () => {
    clearInput();
    if (questionsLeft.length === 0) {
      return endGame();
    } else {
      setTimeout(function () {
        const feedback = document.querySelector("#user-feedback");
        feedback.value = "Siguiente pregunta...";
      }, 2000);
      return askQuestion();
    }
  };

  const updateLetterStatus = (index) => {
    const letter = document.querySelector(`#${questions[index].letter}`);
    if (questions[index].status === 1) {
      letter.style.backgroundColor = "green";
    }
    if (questions[index].status === 2) {
      letter.style.backgroundColor = "#e63946";
    }
    if (questions[index].status === 3) {
      letter.style.backgroundColor = "orange";
    }
  };

  const pasapalabra = (index) => {
    questions[index].status = 3;
    updateLetterStatus(index);
    clearInput();
    const feedback = document.querySelector("#user-feedback");
    feedback.value = "De acuerdo...";

    if (questionsLeft.length > 1) {
      const question = questionsLeft.shift();
      questionsLeft.push(question);
      return askQuestion();
    } else {
      return askQuestion();
    }
  };

  const correctWord = (index) => {
    questions[index].status = 1;
    questionsLeft.shift();
    countScore++;
    const counter = document.querySelector("#counter");
    let currentCount = Number(counter.value) - 1;
    counter.value = `${currentCount}`;

    const feedback = document.querySelector("#user-feedback");
    feedback.value = "Respuesta correcta!";

    updateLetterStatus(index);
    checkQuestionsLeft();
  };

  const notCorrectWord = (index) => {
    questions[index].status = 2;
    questionsLeft.shift();
    const correctAnswer = questions[index].answer;
    const counter = document.querySelector("#counter");
    let currentCount = Number(counter.value) - 1;
    counter.value = `${currentCount}`;

    const feedback = document.querySelector("#user-feedback");
    feedback.value = `Respuesta incorrecta. Lo siento.\nLa respuesta correcta era: ${correctAnswer}`;
    updateLetterStatus(index);
    checkQuestionsLeft();
  };

  const updateStatus = (letter, word) => {
    const index = questions.findIndex((object) => {
      return object.letter === letter;
    });
    if (word === "pasapalabra" || word === "pasa palabra") {
      return pasapalabra(index);
    }
    if (questions[index].answer === word) {
      return correctWord(index);
    } else {
      return notCorrectWord(index);
    }
  };

  const checkValidAnswer = () => {
    if (!answer) {
      return askQuestion();
    } else {
      return updateStatus(questionsLeft[0].letter, answer.toLowerCase());
    }
  };

  const getAnswer = () => {
    const submitButton = document.querySelector("#submit-button");
    submitButton.addEventListener(
      "click",
      function () {
        userAnswer = document.querySelector("#text-input");
        answer = userAnswer.value;
        checkValidAnswer(answer);
      },
      { once: true }
    );
  };

  const askQuestion = () => {
    const index = questions.findIndex((object) => {
      return object.letter === questionsLeft[0].letter;
    });

    if (questions[index].status === 0) {
      questionsLeft[0].variableQuestion();
    }
    const aleatoryQuestion = questionsLeft[0].question;
    questions[index].status = 4; //4= "ya formulada" to avoid asking a different question if there is no answer.
    const textOutput = document.querySelector("#text-output");
    textOutput.value = aleatoryQuestion;
    getAnswer();
  };

  const endGame = () => {
    clearCounterAndTimer();
    const gameSection = document.querySelector("#game-section");
    gameSection.innerHTML = `
        <p id="results-title">TERMINASTE LA PARTIDA! Gracias por jugar! <p>
        <br>
        <p>${playerName}, has completado el juego del "Pasapalabra" con una puntuación de ${countScore} puntos.</p>
        <p>Clasificación: <p>
        <br>
        <ol id="score-list">
        </ol>
    `;
    const gamePanel = document.querySelector("#game-section");
    gamePanel.style.height = "400px";

    const playButton = document.querySelector("#play-button");
    playButton.style.transform = "translate(750px, 500px)";

    let newScore = { name: playerName, score: countScore };
    playersScore.push(newScore);
    playersScore.sort((a, b) => (a.score < b.score ? 1 : -1));

    playersScore.forEach((player) => {
      const newItem = document.createElement("li");
      newItem.innerHTML = `${player.name}. Score: ${player.score}`;
      const orderedList = document.querySelector("#score-list");
      orderedList.appendChild(newItem);
    });

    //playButton.addEventListener("click", nextWordGame, { once: true });  --------->>>>>>>>>>/////////////
  };

  const startTimer = () => {
    everyOneSecond = setInterval(function () {
      const timer = document.querySelector("#timer");
      if (timer.value !== "0") {
        let number = Number(timer.value) - 1;
        timer.value = `${number}`;
      } else {
        clearInterval(everyOneSecond);
        timer.style.backgroundColor = "#e63946";
        const textOutput = document.querySelector("#text-output");
        textOutput.value = `${playerName}, se ha terminado el tiempo!`;
        endGame();
      }
    }, 1000);
  };

  const startGame = () => {
    alert("El temporizador empezará cuando cierre esta ventana!");
    startTimer();
    askQuestion();
  };

  const clearInput = () => {
    const textInput = document.querySelector("#text-input");
    textInput.value = "";
  };

  const clearCounterAndTimer = () => {
    const counter = document.querySelector("#counter");
    counter.value = "25";
    const timer = document.querySelector("#timer");
    timer.value = "150";
    clearInterval(everyOneSecond);
  };

  const getName = () => {
    const newName = document.querySelector("#text-input");
    playerName = newName.value;
    if (!playerName) {
      return askPlayerName();
    }
    const textOutput = document.querySelector("#text-output");
    textOutput.value = `Bienvenido, ${playerName}! Preparate, el juego va a empezar!`;
    clearInput();
    setTimeout(startGame, 1000);
  };

  const askPlayerName = () => {
    const gameInstructions = document.querySelector("#game-instructions");
    gameInstructions.innerHTML = "";
    const gameSection = document.querySelector("#game-section");
    gameSection.innerHTML = `
        <output class="text-output" id="text-output">Definition</output>
        <br>
        <input type="text" class="text-input" id="text-input" name="answer-text"><button type="submit" class="submit-button" id="submit-button">Enviar</button>
        <br>
        <output class="feedback" id="user-feedback"></output>
    `;
    const newLink = document.createElement("link");
    newLink.rel = "stylesheet";
    newLink.href = "style2.css";
    document.head.appendChild(newLink);

    const textOutput = document.querySelector("#text-output");
    textOutput.value = "Cómo te llamas?";

    const submitButton = document.querySelector("#submit-button");
    submitButton.addEventListener("click", getName, { once: true });
  };

  let playerName;
  let everyOneSecond;

  const playButton = document.querySelector("#play-button");
  playButton.addEventListener("click", askPlayerName, { once: true });
};
nextWordGame();
