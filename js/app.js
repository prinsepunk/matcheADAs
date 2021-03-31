const grid = document.getElementById('container');
const information = document.getElementById('information');
const newGame = document.getElementById('newGame');
let gridJS = [];
let items = ["📱", "💻", "🖨", "📸", "📹", "⌚️"];
const squares = [];
let lv;
let welcomeModal = true;
let points = 0;
let time;

                    // GRID GENERATOR

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
    time = 30;
    gameTime(time);
    gridToHTML(lv);
    return lv;
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
    // square.classList.add("square");
    square.style.top = `${i * 50}px`;
    square.style.left = `${j * 50}px`;
    square.addEventListener('click', selectedItem)
    grid.appendChild(square);
}

                    // GAME FUNCTIONS

// Select each item
const selectedItem = (e) =>{
    let click = document.querySelector('.selected');
    if(click){
        if (adjacent(click, e.target)) {
            let resultVertical = checkVerticalMatches(gridJS);
            let resultHorizontal = checkHorizontalMatches(gridJS);

            swapElement(click, e.target);
            click.classList.remove('selected');

            if (resultHorizontal === false && resultVertical === false) {
                setTimeout(() => {
                  swapElement(click, e.target);
                }, 500);
            }

            if(resultVertical === true || resultHorizontal === true){
                checkVerticalMatches(gridJS);
                checkHorizontalMatches(gridJS);
                // dropVertical(rowsToDrop, columnsToReplace);
                // dropHorizontal(columnToDrop, rowsToReplace);
            } else{
                // console.log('sin punto')
            }
        } else{
            click.classList.remove('selected');
            e.target.classList.add('selected');
        }
    } else{
        e.target.classList.add('selected');
    }
}

// Check if they're adjacents
const adjacent = (square1, square2)=>{
    const datax1 = Number(square1.dataset.x);
    const datay1 = Number(square1.dataset.y);
    const datax2 = Number(square2.dataset.x);
    const datay2 = Number(square2.dataset.y);
    if(
        (datax1 === datax2 && datay1 === datay2 + 1) ||
        (datax1 === datax2 && datay1 === datay2 - 1) ||
        (datay1 === datay2 && datax1 === datax2 + 1) ||
        (datay1 === datay2 && datax1 === datax2 - 1)
    ){
        return true
    }else{
        return false
    }
}

// Swap items
const swapElement = (square1, square2) =>{
    const datax1 = Number(square1.dataset.x);
    const datay1 = Number(square1.dataset.y);
    const datax2 = Number(square2.dataset.x);
    const datay2 = Number(square2.dataset.y);

    let tempVar = gridJS[datax1][datay1];
    gridJS[datax1][datay1] = gridJS[datax2][datay2];
    gridJS[datax2][datay2] = tempVar;
    
    if(datax1 === datax2 && (datay1 === datay2 + 1 || datay1 === datay2 -1)){
        square1.innerHTML = gridJS[datax1][datay1];
        square2.innerHTML = gridJS[datax2][datay2];

    } else if(datay1 === datay2 && (datax1 === datax2 +1 || datax1 === datax2 -1)){
        square1.innerHTML = gridJS[datax1][datay1];
        square2.innerHTML = gridJS[datax2][datay2];
    }
}

// CHECK MATCHES

let columnsToDrop = 0;
let rowsToReplace = []

let rowsToDrop = 0;
let columnsToReplace = [];

// Look for horizontal matches and erase them
const checkHorizontalMatches = (gridJS) =>{
    let result = false;
    columnsToDrop = 0;
    rowsToReplace = [];
    for (let i = 0; i < gridJS.length; i++) {
        for (let j = 0; j < gridJS[i].length; j++) {
            if(gridJS[i][j] === gridJS[i][j+1] && gridJS[i][j] === gridJS[i][j+2] && gridJS[i][j] === gridJS[i][j+3] && gridJS[i][j] === gridJS[i][j+4]){
                result = true;
                gridJS[i][j] = '';
                gridJS[i][j+1] = '';
                gridJS[i][j+2] = '';
                gridJS[i][j+3] = '';
                gridJS[i][j+4] = '';
                columnsToDrop = i;
                rowsToReplace.push(j, j+1, j+2, j+3, j+4)
                setTimeout(() => {
                    fillGrid(gridJS);
                    gridToHTML(lv)
                }, 500);
            } else if(gridJS[i][j] === gridJS[i][j+1] && gridJS[i][j] === gridJS[i][j+2] && gridJS[i][j] === gridJS[i][j+3]){
                result = true;
                gridJS[i][j] = '';
                gridJS[i][j+1] = '';
                gridJS[i][j+2] = '';
                gridJS[i][j+3] = '';
                columnsToDrop = i;
                rowsToReplace.push(j, j+1, j+2, j+3)
                setTimeout(() => {
                    fillGrid(gridJS);
                    gridToHTML(lv)
                }, 500);
            }else if(gridJS[i][j] === gridJS[i][j+1] && gridJS[i][j] === gridJS[i][j+2]){
                result = true;
                gridJS[i][j] = '';
                gridJS[i][j+1] = '';
                gridJS[i][j+2] = '';
                columnsToDrop = i;
                rowsToReplace.push(j, j+1, j+2)
                setTimeout(() => {
                    fillGrid(gridJS);
                    gridToHTML(lv)
                }, 500);
            }
        }
    }
    console.log(`columnstodrop: ${columnsToDrop}, rowstoreplace: ${rowsToReplace}`)
    return result, columnsToDrop, rowsToReplace;
}

// Look for vertical matches and erase them
const checkVerticalMatches = (gridJS) =>{
    let result = false;
    rowsToDrop = 0;
    columnsToReplace = [];
    for (let i = 3; i < gridJS.length; i++) {
        for (let j = 0; j < gridJS[i].length; j++) {
            if(gridJS[i][j] === gridJS[i-1][j] && gridJS[i][j] === gridJS[i-2][j] && gridJS[i][j] === gridJS[i-3][j]){
                result = true;
                gridJS[i][j] = '';
                gridJS[i-1][j] = '';
                gridJS[i-2][j] = '';
                gridJS[i-3][j] = '';
                rowsToDrop = j;
                columnsToReplace.push(i, i-1, i-2, i-3);
                setTimeout(() => {
                    fillGrid(gridJS);
                    gridToHTML(lv)
                }, 500);
            }else if(gridJS[i][j] === gridJS[i-1][j] && gridJS[i][j] === gridJS[i-2][j]){
                result = true;
                gridJS[i][j] = '';
                gridJS[i-1][j] = '';
                gridJS[i-2][j] = '';
                rowsToDrop = j;
                columnsToReplace.push(i, i-1, i-2);
                setTimeout(() => {
                    fillGrid(gridJS);
                    gridToHTML(lv)
                }, 500);
            }
        }
    }
    // fillGrid(gridJS);
    console.log(`rowstodrop: ${rowsToDrop}, columnstoreplace: ${columnsToReplace}`)
    return result, rowsToDrop, columnsToReplace;
}

// Fill blank spaces

const fillGrid = (gridJS) =>{
    for (let i = 0; i < gridJS.length; i++) {
        for (let j = 0; j < gridJS[i].length; j++) {
            if(gridJS[i][j] === ''){
                console.log('rellenando espacios')
                gridJS[i][j] = getItemRandom(items);
                // gridToHTML(lv)
            }
        }
    }
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
                checkVerticalMatches(gridJS);
                checkHorizontalMatches(gridJS);
                // dropVertical(rowsToDrop, columnsToReplace);
                // dropHorizontal(columnToDrop, rowsToReplace);
                gridToHTML(lv)
                break;
       
            case "normal":
                lv = 8;
                createBoard(lv);
                checkVerticalMatches(gridJS);
                checkHorizontalMatches(gridJS);
                // dropVertical(rowToDrop, columnsToReplace);
                // dropHorizontal(columnToDrop, rowsToReplace);
                gridToHTML(lv)
                break;
                
       
            case "difficult":
                lv = 7;
                createBoard(lv);
                checkVerticalMatches(gridJS);
                checkHorizontalMatches(gridJS);
                // dropVertical(rowToDrop, columnsToReplace);
                // dropHorizontal(columnToDrop, rowsToReplace);
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
    timeStop();
    welcomeModal = false;
    welcome();
})

// New Game button modal
newGame.addEventListener('click', ()=>{
    timeStop();
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

                    // TIMER
let stop;
// Start timer
const gameTime = () => {
    stop = setInterval(() => {
        if (time > 9) {
            timer.innerHTML = `0:${time}`
            time--
        } else if(time > -1){
            timer.innerHTML = `0:0${time}`
            time--
        }else{
            finishGameModal();
        }
    }, 1000);
}

// Stop timer
const timeStop = () =>{
    clearInterval(stop);
}





// Drop new random emojis in array

// const dropHorizontal = (columnsToDrop, rowsToReplace) => {
//     for (let i = columnToDrop; i >= 0; i--) {
//       rowsToReplace.forEach((el) => {
//         gridJS[i][el] =
//           i !== 0 ? gridJS[i - 1][el] : getItemRandom(items);
//       });
//     }
//     dropHorizontalHTML(columnsToDrop, rowsToReplace);
// };
  
// const dropVertical = (rowsToDrop, ...columnsToReplace) => {
//     const restReverse = columnsToReplace.reverse();
//     for (let i = restReverse[0]; i >= 0; i--) {
//     //   console.log();
//       restReverse.forEach((el) => {
//         gridJS[el][rowsToDrop] =
//           i !== 0 ? gridJS[i - 1][rowsToDrop] : getItemRandom(items);
//       });
//     }
//     dropVertical(rowsToDrop, columnsToReplace);
//     return gridJS;
// };

// // Print new emoji in HTML
// const printNewEmoji = (j, slot) => {
//     slot.innerHTML = gridJS[0][j];
//     return slot.innerHTML;
// };

// // Clean deleted emojis 

// const cleanEmojis = (x, rest) => {
//     rest.forEach((y) => {
//     //   points += 100;
//       let toClean = grid.querySelector(`.square[data-x= "${x}"][data-y= "${y}"]`);
//       toClean.innerHTML = "";
//     //   pointsCounter.innerHTML = `${points}`;
//     });
//     // return points;
// };

// // Drop new emojis in HTML

// const dropHorizontalHTML = (columnsToDrop, rowsToReplace) => {
//     cleanEmojis(columnToDrop, rowsToReplace);
//     setTimeout(() => {
//       for (let i = columnToDrop; i >= 0; i--) {
//         rest.forEach((el) => {
//           let empty = grid.querySelector(
//             `.square[data-x= "${i}"][data-y= "${el}"]`
//           );
//           let full = grid.querySelector(
//             `.square[data-x= "${i - 1}"][data-y= "${el}"]`
//           );
//           empty.innerHTML = i !== 0 ? full.innerHTML : printNewEmoji(el, empty);
//         });
//       }
//     }, 800);
// };

// const dropVerticalHTML = (x, rest) =>{

// }