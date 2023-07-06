const scoreOfX = document.querySelector("#user-x");
const scoreOfO = document.querySelector("#user-o");
const box = document.querySelectorAll(".box");
const restartBtn = document.querySelector(".restart");
const newGameBtn = document.querySelector(".new-game");
const card = document.querySelector(".user-input");



let inputTurn = "X";
const turnIndicator = ()=>{
    if(inputTurn === "X"){
        scoreOfO.parentNode.classList.remove("turn");
        scoreOfX.parentNode.classList.add("turn");
    }else{
        scoreOfX.parentNode.classList.remove("turn");
        scoreOfO.parentNode.classList.add("turn");
    }
}
turnIndicator();
const winningPattern = [[0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]]


let inputTrack = ["", "", "", "", "", "", "", "", ""];

const changeScore = (player)=>{
    (player === "X") ? scoreOfX.value++ : scoreOfO.value++;
}
const swapPlayer = () =>{
    (inputTurn === "O") ? inputTurn = "X" : inputTurn = "O";
    turnIndicator()
}

let gameOver = false;
const isMatchTie = ()=>{
    let tieCount = 0;
    inputTrack.forEach((element)=>{
        if(element){
            tieCount++;
        }
    })
    return (tieCount === inputTrack.length && !gameOver)? 1: 0; 
}

const isGameOver = () =>{
    winningPattern.forEach((pattern)=>{
        if( inputTrack[pattern[0]] === inputTurn && inputTrack[pattern[1]] === inputTurn && inputTrack[pattern[2]] === inputTurn){

            gameOver = true;
            pattern.forEach((element)=>{
                box[element].classList.add("winner");
                box[element].style.color = "#000";
                box.forEach((inpBox)=>{
                    inpBox.style.pointerEvents = "none";
                })
                restartBtn.style.display = "none";
            })
            changeScore(inputTurn);
        }
    })
}


const gameInit = ()=>{
    box.forEach((element, index)=>{
        element.addEventListener('click', ()=>{
            if(!element.textContent){
                
                element.style.color = (inputTurn === "X") ? "#DD58D6" : "#F0A04B";
                element.style.textShadow = `${(inputTurn === "X") ? "#DD58D6" : "#F0A04B"} 1px 0 6px`;
                element.textContent = inputTurn;
                element.style.pointerEvents = "none";
                inputTrack[index] = inputTurn;
                isGameOver();
                swapPlayer();
                if(isMatchTie()){
                    card.classList.add("match-tie");
                    restartBtn.style.display = "none";
                }
                
                
            }
        })
    })
}

const restart = ()=>{
    box.forEach((element, index)=>{
        element.textContent = inputTrack[index] = "";
        element.style.pointerEvents = "all";
        inputTurn = "X";
        card.classList.remove("match-tie");
        turnIndicator();

    })
}

const newGame = ()=>{
    box.forEach((element, index)=>{
        element.textContent = inputTrack[index] = "";
        element.style.pointerEvents = "all";
        element.classList.remove("winner");
        restartBtn.style.display = "flex";
        inputTurn = "X";
        card.classList.remove("match-tie");
        turnIndicator();
    })
}



gameInit();

restartBtn.addEventListener('click', restart);
newGameBtn.addEventListener('click', newGame);
