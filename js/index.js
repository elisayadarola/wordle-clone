//aqui pongo un event listener para q el html imprima lo q digo en JS
document.addEventListener("DOMContentLoaded", () => {
  createSquares();
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
      //aqui agrego un id al elemento
      square.setAttribute("id", index + 1);
      //aqui agarro la variable donde almacené el div con ID de board y le hago un hijo con la variable donde almacené las iteraciones del bucle y los atributos que decidí
      gameBoard.appendChild(square);
    }
  }
});
