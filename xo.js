// --- PHẦN 1: BỘ ĐẾM THỜI GIAN ---
let seconds = 0;
let timerInterval = null;
let isGameStart = false;
let curentPlayer = "X";
const timeElement = document.getElementById("time");

function startTimer() {
    if (timerInterval !== null) return; 
    isGameStart = true;

    timerInterval = setInterval(function() {
        seconds++;
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;
        
        let formattedMins = mins < 10 ? "0" + mins : mins;
        let formattedSecs = secs < 10 ? "0" + secs : secs;
        
        timeElement.textContent = formattedMins + ":" + formattedSecs;
    }, 1000);
}


// --- PHẦN 2: LƯỢT CHƠI XO SO LE ---
let currentPlayer = "X";

function makeMove(cell){
    if(!isGameStart){
        alert("Vui lòng bấm nút 'Bắt đầu' để chơi");
        return;
    }
    if (isGameOver || cell.textContent !== "") return;
    cell.textContent = currentPlayer;
    checkwin();

    if(!isGameOver)
    currentPlayer = currentPlayer === "X" ? "O" : "X"
}

const winningCombinations = [
    [1,2,0],[4,5,3],[7,8,6],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
let isGameOver = false;

function checkwin(){
    const cells = document.querySelectorAll(".xo div");

    for(let combo of winningCombinations){
        let a = cells[combo[0]].textContent;
        let b = cells[combo[1]].textContent;
        let c = cells[combo[2]].textContent;

        if (a ==="") continue;

        if (a === b && b ===c){
            isGameOver = true;
            const msgElement = document.getElementById("winner-message");
            msgElement.textContent = "Người chơi " + a + " đã chiến thắng !";
            msgElement.style.display = "block";

            setTimeout(function(){
                location.reload();
            },3000);
            return;
        }
    }

    let isDraw = true;
    for (let cell of cells ){
        if (cell.textContent === ""){
            isDraw = false;
            break;
        }
    }
    if (isDraw){
        isGameOver = true;
        const msgElement = document.getElementById("winner-message");
        msgElement.textContent = "Trận đấu hòa !";
        msgElement.style.display = "block";

        setTimeout(function(){
            location.reload();
        },3000)
    }
    return;
}
