const grid = document.getElementById('container');
const information = document.getElementById('information');
const newGame = document.getElementById('newGame');
let welcomeModal = true;



                    // GRID GENERATOR

let gridJS = [];
let items = ["📱", "💻", "🖨", "📸", "📹", "⌚️"];

const getRandom = (items) => Math.floor(Math.random() * items.length);
const getItemRandom = (items) => items[getRandom(items)];

// Create array of items in JS
const createBoard = (lv) =>{
    gridJS = [];
    for (let i = 0; i < lv; i++) {
        gridJS[i] = [];
        for (let j = 0; j < lv; j++) {
            gridJS[i][j] = getItemRandom(items);
        }
    }
}

// Print array into HTML
const gridToHTML = (lv) =>{
    const widthGrid = 50 * lv +27;
    grid.style.width = `${widthGrid}px`;
    grid.style.height = `${widthGrid}px`;
    grid.innerHTML = '';
    for (let i = 0; i < gridJS.length; i++) {
        for (let j = 0; j < gridJS[i].length; j++) {
            squareGenerator(i, j)
        }
    }
}

// Generate each element in the HTML grid
const squareGenerator = (i, j) =>{
    const square = document.createElement('div');
    square.dataset.x = i;
    square.dataset.y = j;
    square.innerText = gridJS[i][j];
    square.style.top = `${i * 50}px`;
    square.style.left = `${j * 50}px`;
    // square.addEventListener('click', selectedItem)
    grid.appendChild(square);
}

                     // FUNCTIONS: MODALES

// Information and start game modal
const welcome = () =>{
    swal({
        title: "¡Bienvenida!",
        text: "En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar. \n Si se forma un grupo, esos ítems se eliminarán y ganarás puntos. ¡Sigue armando grupos de tres o más antes de que se acabe el tiempo! \n Controles \n Click izquierdo: selección \n Entero o espacio: selección \n Flechas o WASD: movimiento e intercambio",
        button: "A jugar",
        closeOnClickOutside: false,
        closeOnEsc: false,
    })
    .then(() =>{
        if(welcomeModal === true){
            playAgain();
            welcomeModal === false;
        } else{
            gameTime();
            return
        }
    })
}

// Difficulty selector modal
const playAgain = () =>{
    welcomeModal = false;
    swal("Nuevo Juego", "Selecciona una dificultad", {
        buttons: {
            easy: {
                text: "Fácil",
                value: "easy",
            },
            normal: {
                text: "Normal",
                value: "normal",
            },
            difficult: {
                text: "Difícil",
                value: "difficult",
            },
    },
    closeOnClickOutside: false,
    closeOnEsc: false,})
    .then((value) => {
        switch (value) {
       
            case "easy":
                lv = 9;
                createBoard(lv);
                gridToHTML(lv)
                break;
       
            case "normal":
                lv = 8;
                createBoard(lv);
                gridToHTML(lv)
                break;
                
       
            case "difficult":
                lv = 7;
                createBoard(lv);
                gridToHTML(lv)
                break;
        }
      });
}

                   // CALL DE MODALES

// Start game
welcome();

// Information button modal
information.addEventListener('click', () =>{
    // timeStop();
    welcomeModal = false;
    welcome();
})

// New Game button modal
newGame.addEventListener('click', ()=>{
    // timeStop();
    swal("¿Reiniciar juego?", "¡Perderás todo tu puntaje acumulado!", {
        buttons: {
            cancel: "Cancelar",

            new: {
                text: "Nuevo Juego",
                value: "new",
            },
    },
    closeOnClickOutside: false,
    closeOnEsc: false,})
    .then((value) => {
        switch (value) {

            case null:
                gameTime();
                break;

            case "new":
                playAgain();
                break;
        }
      });
})

// Finish game modal
const finishGameModal = () =>{
timeStop();
    swal("¡Juego terminado!", `Puntaje final: ${points}`, {
                buttons: {
                    new: {
                        text: "Nuevo Juego",
                        value: "new",
                    },
                    reload: {
                        text: "Reiniciar",
                        value: "reload",
                    },
            },
            closeOnClickOutside: false,
            closeOnEsc: false,})
            .then((value) => {
                switch (value) {
        
                    case "new":
                        playAgain();
                        break;
        
                    case "reload":
                        createBoard(lv);
                        gridToHTML(lv)
                        break;
                }
            });
}