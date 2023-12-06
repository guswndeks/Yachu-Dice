function dw(str){
    document.write(str);
}
function br(){
    document.write("<br>");
}

let throw_dice;

let dice_rolled;
let rolled = new Array;
let r = new Array(5);
let rollcnt = 3;

let dice_selected;
let selected = new Array;
let s = new Array(5);

let b = new Array(16);
let bint = new Array(16);

let restart_button;

onload = function () {
    throw_dice = document.getElementById("throw_dice");
    dice_rolled = document.getElementById("dice_rolled");
    dice_selected = document.getElementById("dice_selected");
    restart_button = document.getElementById("restart_button");
    
    throw_dice.setAttribute("value", "주사위 던지기 (남은 횟수 : " + (rollcnt) + ")");

    for (i = 0; i < 5; i++) {
        r[i] = document.getElementById("r" + i);
        s[i] = document.getElementById("s" + i);
    }

    for (i = 0; i < 16; i++) {
        b[i] = document.getElementById("b" + i);
    }
    bint.fill(0);
}

function setDices() {
    for (i = 0; i < 5; i++) {
        r[i].setAttribute("style", "display:none");
        s[i].setAttribute("style", "display:none");
    }

    for (i = 0; i < rolled.length; i++) {
        r[i].setAttribute("src", "imgs/dice_" + rolled[i] + ".jpg");
        r[i].setAttribute("style", "display:block");
    }
    for (i = 0; i < selected.length; i++) {
        s[i].setAttribute("src", "imgs/dice_" + selected[i] + ".jpg");
        s[i].setAttribute("style", "display:block");
    }
}

function rollDice() {
    if (rollcnt == 0) {
        return;
    }
    else {
        rollcnt--;
        throw_dice.setAttribute("value", "주사위 던지기 (남은 횟수 : " + (rollcnt) + ")");
        
        rolled.length = 0;
        for (i = 0; i < 5 - selected.length; i++) {
            let ran = Math.floor(Math.random()*6);
            rolled.push(ran);
        }
        setDices();
    }
}

function diceSelect(clicked_id) {
    let clicked_num = Number(clicked_id[1]); //r?
    let clicked_element = document.getElementById(clicked_id);
    let clicked_img = clicked_element.getAttribute("src");

    selected.push(clicked_img[10]); // imgs/dice_?.jpg
    
    rolled.splice(clicked_num, 1);

    setDices();
    setScores();
}

function diceUnSelect(clicked_id) {
    let clicked_num = Number(clicked_id[1]); //s?
    let clicked_element = document.getElementById(clicked_id);
    let clicked_img = clicked_element.getAttribute("src");

    rolled.push(clicked_img[10]); // imgs/dice_?.jpg

    selected.splice(clicked_num, 1);

    setDices();
    setScores();
}
/*
r0 r1 r2 r3
s1
*/

function setScores() {
    let selected_dice_cnts = new Array(6);
    selected_dice_cnts.fill(0);

    for (i = 0; i < selected.length; i++) {
        selected_dice_cnts[selected[i]]++;
    }

    for (i = 1; i < 16; i++) {
        if (b[i].getAttribute("style") == "color:black") continue;
        b[i].setAttribute("style", "color:gray");
        b[i].innerHTML = "0";
        bint[i] = 0;
    }

    //Aces
    if (selected_dice_cnts[0] && b[1].getAttribute("style") != "color:black") {
        bint[1] = b[1].innerHTML = (selected_dice_cnts[0] * 1);
    }

    //Duces
    if (selected_dice_cnts[1] && b[2].getAttribute("style") != "color:black") {
        bint[2] = b[2].innerHTML = (selected_dice_cnts[1] * 2);
    }

    //Threes
    if (selected_dice_cnts[2] && b[3].getAttribute("style") != "color:black") {
        bint[3] = b[3].innerHTML = (selected_dice_cnts[2] * 3);
    }

    //Fours
    if (selected_dice_cnts[3] && b[4].getAttribute("style") != "color:black") {
        bint[4] = b[4].innerHTML = (selected_dice_cnts[3] * 4);
    }

    //Fives
    if (selected_dice_cnts[4] && b[5].getAttribute("style") != "color:black") {
        bint[5] = b[5].innerHTML = (selected_dice_cnts[4] * 5);
    }
    
    //Sixes
    if (selected_dice_cnts[5] && b[6].getAttribute("style") != "color:black") {
        bint[6] = b[6].innerHTML = (selected_dice_cnts[5] * 6);
    }
    
    //Mission
    b[7].innerHTML = bint[7] + "/63";
    
    //Bonus
    b[8].innerHTML = bint[8];
    
    //Chance
    if (b[9].getAttribute("style") != "color:black") {
        let sum = 0;
        for (i = 0; i < 6; i++) {
            if (selected_dice_cnts[i]) sum += selected_dice_cnts[i] * (i + 1);
        }
        if (sum) bint[9] = b[9].innerHTML = sum;
    }
    
    //Four of a kind
    if (b[10].getAttribute("style") != "color:black") {
        let tmp1 = 0, tmp4 = false;
        for (i = 0; i < 6; i++) {
            if (selected_dice_cnts[i] == 1) tmp1 = i + 1;

            if (selected_dice_cnts[i] == 4) {
                tmp4 = (i + 1) * 4;
            }
            if (selected_dice_cnts[i] == 5) {
                tmp4 = (i + 1) * 5;
            }
        }
        if (tmp4) bint[10] = b[10].innerHTML = tmp4 + tmp1;
    }
    
    //Full House
    let ispair = 0, istriple = 0;
    if (b[11].getAttribute("style") != "color:black") {
        for (i = 0; i < 6; i++) {
            if (selected_dice_cnts[i] == 2) ispair = i + 1;
            if (selected_dice_cnts[i] == 3) istriple = i + 1;
        }
        if(ispair && istriple) bint[11] = b[11].innerHTML = ispair * 2 + istriple * 3;
    }
    
    //Small Straight
    if (b[12].getAttribute("style") != "color:black") {
        if (selected_dice_cnts[0] && selected_dice_cnts[1] && selected_dice_cnts[2] && selected_dice_cnts[3] && selected_dice_cnts[4])
            bint[12] = b[12].innerHTML = 30;
    }
    //Large Straight
    if (b[13].getAttribute("style") != "color:black") {
        if (selected_dice_cnts[1] && selected_dice_cnts[2] && selected_dice_cnts[3] && selected_dice_cnts[4] && selected_dice_cnts[5])
            bint[13] = b[13].innerHTML = 40;
    }
    //Yacht
    if (b[14].getAttribute("style") != "color:black") {
        for (i = 0; i < 6; i++) {
            if (selected_dice_cnts[i] == 5) bint[14] = b[14].innerHTML = 50;
        }
    }

    //Total Score
    b[15].innerHTML = bint[15];
}

function addScore(clicked_id) {
    let clicked_num = Number(clicked_id.substr(1));
    let clicked_element = document.getElementById(clicked_id);

    if (clicked_element.getAttribute("style") == "color:black") return;

    if (1 <= clicked_num && clicked_num <= 6 && b[clicked_num].innerHTML != "") {
        bint[7] += bint[clicked_num];
        b[7].innerHTML = bint[7] + "/63";

        bint[15] += bint[clicked_num];
        b[15].innerHTML = bint[15];

        if (bint[7] >= 63 && bint[8] == 0) {
            bint[8] = b[8].innerHTML = 35;

            bint[15] += bint[8];
            b[15].innerHTML = bint[15];
        }
    }

    else if (9 <= clicked_num && clicked_num <= 14 && b[clicked_num].innerHTML != "") {
        bint[15] += bint[clicked_num];
        b[15].innerHTML = bint[15];
    }

    clicked_element.setAttribute("style", "color:black");
    resetDiceBoard();
}

function resetDiceBoard() {
    let isend = true;
    for (i = 1; i < 16; i++) {
        if (b[i].getAttribute("style") == "color:black") continue;
        b[i].setAttribute("style", "color:gray");
        b[i].innerHTML = "";
        isend = false;
    }
    
    for (i = 0; i < 5; i++) {
        r[i].setAttribute("style", "display:none");
        s[i].setAttribute("style", "display:none");
    }
    rolled.length = 0;
    selected.length = 0;

    rollcnt = 3;

    if (isend) {
        /*
        멀티플레이 구현시 작동할 부분.
        현재는 플레이어가 수동으로 재시작 버튼 눌러야함.
        */
    }
}

function restartGame() {
    alert("게임이 끝났습니다. 점수 : " + bint[15]);
    location.reload();
}