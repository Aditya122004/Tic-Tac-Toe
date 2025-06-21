let board=[];
let turn='X';
let gameOver=false;
let prevValue=0;
function toggleTurn(){
    if(turn==='X')turn='O';
    else turn='X';
    document.querySelector('h1').innerHTML=`Turn:${turn}`;
}
function checkWinner(){
    for(let i=0;i<prevValue;i++){
        if(rowCheck(i)||columnCheck(i)||diagonalCheck()){
            return true;
        }
    }return false;
}
function rowCheck(row){
    let start=board[row][0];
    if(start=='')return false;
    for(let i=1;i<prevValue;i++){
        if(board[row][i]!=start)return false;
    }
    return true;
}
function columnCheck(col){//fix
    let start=board[0][col];
    if(start=='')return false;
    for(let i=1;i<prevValue;i++){
        if(board[i][col]!=start)return false;
    }
    return true;
}
function diagonalCheck(){
    let start=board[0][0];
    let flag=true;
    if (start != "") {
      for (let i = 1; i < prevValue; i++) {
        if (board[i][i] != start) {
          flag = false;
          break;
        }
      }
      if (flag) return true;
    }
    start=board[0][prevValue-1];
    if (start != "") {
      for (let i = 1; i < prevValue; i++) {
        if (board[i][prevValue - i - 1] != start) {
          flag = false;
          break;
        }
      }if(flag)return true;
    }
    
    return false;
}
function drawCheck(){
    for(let i=0;i<prevValue;i++){
        for(let j=0;j<prevValue;j++){
            if(board[i][j]==''){
                return false;
            }
        }
    }
    return true;
}
function handleClick(row,col,id){
    if(gameOver)return;
    if(board[row][col]!='')return;
    board[row][col]=turn;
    document.getElementById(id).innerHTML=`<span class="turn">${turn}</span>`;
    if(checkWinner()){
        gameOver=true;
        if(gameOver)showInputSection()
        document.querySelector('h1').innerHTML=`The winner is ${turn}`;
        return;
    }
    if(drawCheck()){
        gameOver=true;
        if(gameOver)showInputSection()
        document.querySelector('h1').innerHTML='Draw';
        return;
    }
    toggleTurn();
}
function createBoard(){
    const n=document.querySelector('input').value;
    const root=document.querySelector('.root');
    const PrevBoard=document.querySelector(`.board${prevValue}`);
    if(PrevBoard){
        root.removeChild(PrevBoard);
    }
    turn='X';
    document.querySelector('h1').innerHTML=`Turn:${turn}`;
    gameOver=false;
    prevValue=n;
    let count=0;
    for (let i = 0; i < n; i++) {
      board[i] = [];
      for (let j = 0; j < n; j++) {
        board[i][j] = "";
      }
    }
    const boardDiv=document.createElement('div');
    boardDiv.setAttribute('class',`board${n}`);
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            const block=document.createElement('div');
            block.setAttribute('id',count);
            block.setAttribute('class','block');
            block.setAttribute('onClick',`handleClick(${i},${j},${count})`);
            count++;
            boardDiv.appendChild(block);
        }
    }
    root.appendChild(boardDiv);
    document.querySelector('h1').removeAttribute('hidden');
    document.querySelector('.input-section').setAttribute('hidden','');
}

function showInputSection(){
    const inputSection=document.querySelector('.input-section');
    inputSection.removeAttribute('hidden');
}
