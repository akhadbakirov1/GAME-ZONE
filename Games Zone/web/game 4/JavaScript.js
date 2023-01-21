var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var allowMove = true;
var shah = false;
var checkShahbBool = false;
//количество полей
var num = 8;
//цвет выбранного поля
var color;
//цвет хода - true черный, false ,белый
var team = false;
//выбранное поле
var choiceField;
//поле-ход
var newField;
//координаты поля-хода по x
var temp_x;
//координаты поля-хода по y
var temp_y;
//координаты поля выбранной фигуры по x
var new_x;
//координаты поля выбранной фигуры по y
var new_y;
//флаг выбранной фигуры
var choice;
//матрица-показатель какая фигура на каком поле нахдится
var boardState;

function NewGame(){
    $("input").remove();
    $("img").remove();
    team = false;
    boardState = [[-5, -4, -3, -10, -11, -3, -4, -5],
             [-1, -1, -1, -1, -1, -1, -1, -1],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [1, 1, 1, 1, 1, 1, 1, 1],
             [5, 4, 3, 10, 11, 3, 4, 5]];
    choice = false;
    document.getElementById('board').innerHTML = '';
    document.getElementById('board').style.width = num * 80;
    for (var i = num - 1; i >= 0; i--) {
        for (var j = 0; j < num; j++) {
            if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
                $("#board").append('<div class="DarkField" x = "' + j.toString() + '" y = "' + i.toString() + '" onclick = "ClickField(this);"></div>');
            }
            else {
                $("#board").append('<div class="LightField" x = "' + j.toString() + '" y = "' + i.toString() + '" onclick = "ClickField(this);"></div>');
            }
        }
    }
    $("div").slice(1, 2).append('<img src="DarkRook.png">');
    $("div").slice(8, 9).append('<img src="DarkRook.png">');
    $("div").slice(2, 3).append('<img src="DarkHorse.png">');
    $("div").slice(7, 8).append('<img src="DarkHorse.png">');
    $("div").slice(3, 4).append('<img src="DarkElefant.png">');
    $("div").slice(6, 7).append('<img src="DarkElefant.png">');
    $("div").slice(4, 5).append('<img src="DarkFerz.png">');
    $("div").slice(5, 6).append('<img src="DarkKing.png">');
    for (var i = 9; i < 17; i++){
        $("div").slice(i, i + 1).append('<img src="DarkPown.png">');
    }

    $("div").slice(57, 58).append('<img src="LightRook.png">');
    $("div").slice(64, 65).append('<img src="LightRook.png">');
    $("div").slice(58, 59).append('<img src="LightHorse.png">');
    $("div").slice(63, 64).append('<img src="LightHorse.png">');
    $("div").slice(59, 60).append('<img src="LightElefant.png">');
    $("div").slice(62, 63).append('<img src="LightElefant.png">');
    $("div").slice(60, 61).append('<img src="LightFerz.png">');
    $("div").slice(61, 62).append('<img src="LightKing.png">');
    for (var i = 49; i < 57; i++){
        $("div").slice(i, i + 1).append('<img src="LightPown.png">');
    }
}
function ClickField(field){
    if (choice)DoStep(field);
    else ChoiceField(field);
}
function ChoiceField(field){
    choiceField = field;
    temp_x = parseInt($(choiceField).attr("y"));
    temp_y = parseInt($(choiceField).attr("x"));
    if (boardState[temp_x][temp_y] !== 0){
        if (team && boardState[temp_x][temp_y] > 0 || !team && boardState[temp_x][temp_y] < 0){
            color = $(choiceField).css("background-color");
            $(choiceField).css("background-color", "#9D3772");
            choice = true;
        }
    }
}

function DoStep(field) {
    if (!checkShahbBool){
        newField = field;
        new_x = parseInt($(newField).attr("y"));
        new_y = parseInt($(newField).attr("x"));
        if (temp_x === new_x && temp_y === new_y) {
            $(choiceField).css("background-color", color);
            choice = false;
            return;
        }
    }
    switch(boardState[temp_x][temp_y]){
        case -5:
        case 5:
            GoRook();
        break;
        case -4:
        case 4:
            GoHorse();
        break;
        case -3:
        case 3:
            GoElefant();
        break;
        case -1:
        case 1:
            GoPown();
        break;
        case -10:
        case 10:
            GoFerz();
        break;
        case -11:
        case 11:
            GoKing();
        break;
    }
}

function GoPown(){
    if (boardState[temp_x][temp_y] < 0){
        if (boardState[new_x][new_y] === 0){
            if (new_x - temp_x === 1 && new_y - temp_y === 0) {
                if (!checkShahbBool)
                    ChangePlace();
                else
                    shah = true;
            }
            if (new_x - temp_x === 2 && new_y - temp_y === 0 && temp_x === 1 && boardState[new_x - 1][new_y] === 0) {
                if (!checkShahbBool)
                    ChangePlace();
            }
        }
        else{
            if (boardState[new_x][new_y] > 0 && (new_y - temp_y === 1 || new_y - temp_y === -1) && new_x - temp_x === 1) {
                if (!checkShahbBool)
                    ChangePlace();
                else
                    shah = true;
            }
        }        
    }
    else{
        if (boardState[new_x][new_y] === 0){
            if (new_x - temp_x === -1 && new_y - temp_y === 0) {
                if (!checkShahbBool)
                    ChangePlace();
                else
                    shah = true;
            }
            if (new_x - temp_x === -2 && new_y - temp_y === 0 && temp_x === 6 && boardState[new_x + 1][new_y] === 0) {
                if (!checkShahbBool)
                    ChangePlace();
                else
                    shah = true;
            }
        }
        else{
            if (boardState[new_x][new_y] < 0 && (new_y - temp_y === 1 || new_y - temp_y === -1) && new_x - temp_x === -1) {
                if (!checkShahbBool)
                    ChangePlace();
                else
                    shah = true;
            }
        }        
    }
}

function GoRook(){
    var flag = false;
    var count_x = temp_x-new_x;
    var count_y = temp_y-new_y;
    if (count_x !== 0 && count_y === 0){
        if (count_x > 0){
            for (var i = new_x+1; i < temp_x; i++){
                if (boardState[i][new_y] !== 0){
                    flag = true;
                    break;
                }
            }
        }
        else{
            for (var i = temp_x+1; i < new_x; i++){
                if (boardState[i][new_y] !== 0){
                    flag = true;
                    break;
                }
            }
        }
    }
    else{
        if (count_x === 0 && count_y !== 0){
            if (count_y > 0){
                for (var i = new_y+1; i < temp_y; i++){
                    if (boardState[new_x][i] !== 0){
                        flag = true;
                        break;
                    }
                }
            }
            else{
                for (var i = temp_y+1; i < new_y; i++){
                    if (boardState[new_x][i] !== 0){
                        flag = true;
                        break;
                    }
                }
            }
        }
        if (count_x !== 0 && count_y !== 0){
            flag = true;
        }
    }
    if (!flag &&  (boardState[new_x][new_y] === 0 || boardState[new_x][new_y] > 0 && boardState[temp_x][temp_y] < 0 || boardState[new_x][new_y] < 0 && boardState[temp_x][temp_y] > 0)){
        if (boardState[temp_x][temp_y] === 5 || boardState[temp_x][temp_y] === -5){
            if (!checkShahbBool)
                ChangePlace();
            else
                shah = true;
        }
        return true;
    }
    else{
        return false;
    }
}

function GoHorse(){
    var count_x = new_x - temp_x;
    var count_y = new_y - temp_y;
    if (boardState[new_x][new_y] === 0 || boardState[new_x][new_y] > 0 && boardState[temp_x][temp_y] < 0 || boardState[new_x][new_y] < 0 && boardState[temp_x][temp_y] > 0){
        if ((count_x === 2 || count_x === -2) && (count_y === 1 || count_y === -1) || (count_x === 1 || count_x === -1) && (count_y === 2 || count_y === -2)) {
            if (!checkShahbBool)
                ChangePlace();
            else
                shah = true;
        }
    }
}

function GoElefant()
{
    var flag = false;
    var count_x = new_x - temp_x;
    var count_y = new_y - temp_y;
    var coord_x;
    var coord_y;
    if (Math.abs(count_x) === Math.abs(count_y)){
        for (var i = 1; i < Math.abs(count_x); i++){
            if (count_x > 0) coord_x = i;
            else coord_x = -i;
            if (count_y > 0) coord_y = i;
            else coord_y = -i;
            if (boardState[temp_x+coord_x][temp_y+coord_y] !== 0)
            {
                flag = true;
                break;
            }
        }
        if (!flag &&  (boardState[new_x][new_y] === 0 || boardState[new_x][new_y] > 0 && boardState[temp_x][temp_y] < 0 || boardState[new_x][new_y] < 0 && boardState[temp_x][temp_y] > 0)){
            if (boardState[temp_x][temp_y] === 3 || boardState[temp_x][temp_y] === -3){
                if (!checkShahbBool)
                    ChangePlace();
                else
                    shah = true;
            }
            return true;
        }
        else{
            return false;
        }
    }
}

function GoFerz(){
    if (GoRook() || GoElefant()) {
        if (!checkShahbBool)
            ChangePlace();
        else
            shah = true;
    }
}

function GoKing(){
    var count_x = temp_x-new_x;
    var count_y = temp_y-new_y;
    if (GoRook() || GoElefant()){
        if ((count_x === 1 || count_x === 0 || count_x === -1) && (count_y === 1 || count_y === 0 || count_y === -1)){
            if (!checkShahbBool)
                ChangePlace();
            else
                shah = true;
        }
    }    
}

function IsShah(){
    var new_temp_x = new_x;
    var new_temp_y = new_y;
    for (var i = 0; i < num; i++) {
        for (var j = 0; j < num; j++) {
            if (boardState [i][j] !== 0){
                checkShahbBool = true;
                temp_x = i;
                temp_y = j;
                if (DoStepToCheck()) return true;
            }
        }
    }
}
 
function DoStepToCheck()
{
    for (var i = 0; i < num; i++) {
        for (var j = 0; j < num; j++) {
            if (boardState[i][j] === 11 && boardState[temp_x][temp_y] < 0 || boardState[i][j] === -11 && boardState[temp_x][temp_y] > 0) {
                new_x = i;
                new_y = j;
                DoStep(i);
                if (shah) {
                    //if (boardState === -11 && team || boardState === 11 && !team)
                    //{
                    //    allowMove = false;
                    //}
                    shah = true;
                    return true;
                }
            }
        }
    }
}

function IsMat()
{
    
}

function ChangePlace()
{
    //if (allowMove){
        boardState[new_x][new_y] = boardState[temp_x][temp_y];
        boardState[temp_x][temp_y] = 0;
        $(choiceField).css("background-color", color);
        $(newField).empty();
        $(newField).append($(choiceField).find("img"));
        $(choiceField).empty();
        team = !team;
        choice = false;
        if (IsShah()) {
            alert("ШАХ!");
            IsMat();
        }
        checkShahbBool = false;
        shah = false;
    //}
    //else {
    //    alert("Ход не может быть выполнен!");
    //    return;
    //}
}
