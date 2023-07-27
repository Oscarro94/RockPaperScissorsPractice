function getComputerChoice() {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        imgResult.src="./img/roca.png";
        updateImg();
        return "rock";
    } else if (randomValue < 0.67) {
        imgResult.src="https://img.icons8.com/ios/100/000000/matt-paper.png";
                updateImg();
                return "paper";
    } else {
        imgResult.src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/96/000000/external-cut-command-in-shape-of-scissor-for-computing-text-bold-tal-revivo.png";
                updateImg();
                return "scissor";
    }
  };

function game(playerSelection) {
    computerSelection=getComputerChoice();
    
    if (playerSelection.toLowerCase()===computerSelection){
        removeTransition();
        textResult.textContent="It's a tie";
    }
    else if(playerSelection.toLowerCase()!="scissor"&&playerSelection.toLowerCase()!="rock"&&playerSelection.toLowerCase()!="paper"){
        return("Enter appropriate value!!!");
    }
    else if ((playerSelection.toLowerCase()==="scissor" && computerSelection==="rock") || (playerSelection.toLowerCase()==="rock" && computerSelection==="paper") || (playerSelection.toLowerCase()==="paper"&&computerSelection==="scissor")) {
        cPoint+=1;
        lostTransition();
        textResult.textContent="You lose!";
    }
    else{
        pPoint+=1;
        wonTransition();
        textResult.textContent="You won!";
    }
    if(cPoint===5 || pPoint===5){
        if(cPoint===5){
            overlay(0);
        }
        else{
            overlay(1);
        }
    }
}

let count=5;
let cPoint;
let pPoint;

const textResult = document.querySelector('.start-text');

let imgSelect = document.createElement("img");
imgSelect.setAttribute('style','height:100px; width:100px;')
const pblock = document.querySelector('.person-box');

let imgResult = document.createElement("img");
imgResult.setAttribute('style','height:100px; width:100px;')
const block = document.querySelector('.computer-box');

const startBtn = document.querySelector('.btn-1');
startBtn.addEventListener('click',restart)

function restart(){
    cPoint=0;
    pPoint=0;
    startBtn.textContent = "Restart";
    updateScore();
    removeTransition();
    resetImg();
    resetSelect();
    gamelisten();
};

const popup = document.querySelector('.overlay');



function gamelisten(){
    const ops = document.querySelectorAll('.option')
    ops.forEach(opt => opt.addEventListener('click',test));
}

function test(e){
    if(cPoint===5 || pPoint===5){
        return;
    }
    const name = e.target.classList[0];
    updateSelect(name);
    game(name);
    updateScore();
}

function updateScore() {
    const pS = document.querySelector('.Person-Score');
    const cS = document.querySelector('.Computer-Score');
    pS.textContent = pPoint;
    cS.textContent = cPoint;
}

function wonTransition(){
    const cntr = document.querySelector('.container');
    cntr.classList.remove('lost');
    cntr.classList.add('won');
}
function lostTransition(){
    const cntr = document.querySelector('.container');
    cntr.classList.remove('won');
    cntr.classList.add('lost');
}
function removeTransition(){
    const cntr = document.querySelector('.container');
    cntr.classList.remove('won');
    cntr.classList.remove('lost');
}

function updateImg(){
    block.removeChild(block.childNodes[0]);
    block.appendChild(imgResult);
}
function resetImg(){
    block.removeChild(block.firstElementChild);
    imgResult.src="./img/lucha.png";
    block.appendChild(imgResult);
    textResult.textContent='Make a move!';
}

function updateSelect(name){
    if(name==="rock"){
        imgSelect.src="./img/roca.png";
    }
    else if(name==="paper"){
        imgSelect.src="https://img.icons8.com/ios/100/000000/matt-paper.png";
    }
    else if(name==="scissor"){
        imgSelect.src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/96/000000/external-cut-command-in-shape-of-scissor-for-computing-text-bold-tal-revivo.png";
    }
    pblock.removeChild(pblock.childNodes[0]);
    pblock.appendChild(imgSelect);
}
function resetSelect(){
    pblock.removeChild(pblock.firstElementChild);
    imgSelect.src="./img/lucha.png";
    pblock.appendChild(imgSelect);
}

function overlay(time){
    popup.classList.add('overlayAct');
    const poptext = document.querySelector('.poptext');
    if(time) poptext.textContent="Congrats!   You won the game! You Just killed it";
    else poptext.textContent="Oh nooo! You lost:( Try again! You can do better next time!!";
    const popbtn = document.querySelector('.popbtn')
    popbtn.addEventListener('click',resetAll);
}

function resetAll(){
    popup.classList.remove('overlayAct');
    restart();
}
