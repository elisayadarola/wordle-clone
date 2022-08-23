//aqui pongo un event listener para q el html imprima lo q digo en JS
document.addEventListener("DOMContentLoaded", () => {
  createSquares();
  let guessedWords = [[]];
  let availableSpace = 1;
  let word;
  let guessedWordCount = 0;

  //aqui tengo que crear esta función para que JS sepa cuando el user hace click o toca una letra. empiezo por decirle que busque la clase keyboard-row y los botones y almacene ese valor en la variable 'keys'
  const keys = document.querySelectorAll(".keyboard-row button");

  //DIFERENCIA: KEYS = la variable donde almacené el valor de los attr. clase y tag del HTML
  //KEY: el nombre de la otra variable donde almaceno el attr. data-key
  function getNewWord() {
    fetch(
      `https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key": "<YOUR_KEY_GOES_HERE>",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        word = res.json;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCurrentWordArray() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  //nueva funcion que me permite actualizar las teclas seleccionadas
  function updateGuessedWords(letter) {
    const currentWordArray = getCurrentWordArray();
    //la funcion no me imprimia las letras ni siquiera como elemento oculto, el problema era que el .lenght no correcpondia a una funcion propia de JS sino habia seleccionado otro método
    if (currentWordArray && currentWordArray.length < 5) {
      currentWordArray.push(letter);
      const availableSpaceEl = document.getElementById(String(availableSpace));
      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
  }
  function getTileColor(letter, index) {
    const isCorrectLetter = word.includes(letter);
    if (!isCorrectLetter) {
      return "rgb(58, 58, 60)";
    }
    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;
    if (isCorrectPosition) {
      return "rgb(83, 141, 78)";
    }
    return "rgb(181, 159, 59)";
  }
  function handleSubmitWord() {
    const currentWordArray = getCurrentWordArr();
    if (currentWordArr.length !== 5) {
      window.alert("Word must be 5 letters");
    }

    const currentWord = currentWordArray.join("");

    fetch(`https://wordsapiv1.p.rapidapi.com/words/${currentWord}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "61c5e3986dmsh20c1bee95c2230dp18d1efjsn4668bbcfc1b3",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArray.forEach((letter, index) => {
          setTimeout(() => {
            const tileColor = getTileColor(letter, index);

            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);
            letterEl.classList.add("animate__flipInX");
            letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
          }, interval * index);
        });

        guessedWordCount += 1;

        if (currentWord === word) {
          window.alert("Congratulations!");
        }

        if (guessedWords.length === 6) {
          window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
        }

        guessedWords.push([]);
      })
      .catch(() => {
        window.alert("Word is not recognised!");
      });
  }
  //creo una funcion con el nombre que quiero y los pasos que sigo son:
  //en la variable gameboard almaceno el valor de 'conseguir' un elemnto atraves del id 'board' que puse en HTML
  function createSquares() {
    const gameBoard = document.getElementById("board");
    //aqui creo un for-loop que iterará 30 veces sobre el ID de board en HTML y creará uno más hasta llegar a 30
    for (let index = 0; index < 30; index++) {
      //aqui almaceno en square cada elemento que se va creando hasta llegar a 30
      let square = document.createElement("div");
      //aqui le agrego una clase a ese elemento
      square.classList.add("square");
      square.classList.add("animate_animated");
      //aqui agrego un id al elemento
      square.setAttribute("id", index + 1);
      //aqui agarro la variable donde almacené el div con ID de board y le hago un hijo con la variable donde almacené las iteraciones del bucle y los atributos que decidí
      gameBoard.appendChild(square);
    }
  }
  function handleDeleteletter() {
    const currentWordArray = getCurrentWordArray();
    const removedLetter = currentWordArray.pop();
    guessedWords[guessedWords.length - 1] = currentWordArray;
    const lastLetterEl = document.getElementById(String(availableSpace - 1));
    lastLetterEl.textContent = "";
    availableSpace = availableSpace - 1;
  }
  //creo el bucle que significa: comienza aqui en el indice 0, llega a la extension/lenght de 'keys'(la variable q creé justo antes) y agrega la proxima tecla en que se haga click
  for (let i = 0; i < keys.length; i++) {
    //al hacer click en la tecla/key en el indice que corresponda, 'apunta' y haz lo siguiente: busca el atributo presente en data-key (que en este caso corresponde a la letra), almacenalo en la variable 'key' e imprime el atributo en la consola
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");
      if (letter === "enter") {
        handleSubmitWord();
        return;
      }
      if (letter === "del") {
        handleDeleteletter();
        return;
      }
      updateGuessedWords(letter);
    };
  }
});
