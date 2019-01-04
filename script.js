var size = 4;
document.getElementsByTagName("BUTTON")[0].onclick = function() {restart(size)};
document.getElementsByTagName("SELECT")[0].onchange  = function() {
    size = select();
    console.log(size);
    drawGrid(size);
    restart(size);
} ;




function select(){
    var x =  document.getElementsByTagName("SELECT")[0].value;
    var nbr = parseInt(x);
    return nbr;
}


function color(){
    var i;
    var j;
    for(i = 0; i < 4; i++){
        for(j = 0; j < 4; j++){
            var id = $("#"+i+"-"+j+"")
            var valId = parseInt(id.text());
            // if(valId == 0){
            //     id.removeClass();
            //     id.addClass("beige");  
            // }
            // else if(valId == 2) {
            //     id.removeClass();
            //     id.addClass("blue");  
            // }

            switch (valId) {
                case 0:
                id.removeClass();
                id.addClass("beige");
                break;
                case 2:
                id.removeClass();
                id.addClass("blue");  
                break;
                case 2:
                id.removeClass();
                id.addClass("blue");  
                    break;

            }
        }
    }
}




// créer la grille
function drawGrid(size){
var i;
var j;
var x = 10;
var y = 10;
$(".myBlock").empty();
for (i = 0; i < size; i++){
    for(j = 0; j < size; j++){
        var carre = "<div class = 'block1' id="+i+"-"+j+" style='margin-top:"+x+"px; margin-left: "+y+"px; position:absolute'></div>";
        var z = $(".myBlock").append(carre);
        y = y + 75 + 10;
    }
    x = x + 75 + 10; // 75 taille en largeur et longueur de mon carré, 10 nombre de pixel en margin
    y = 10;
}
}
// ______________________________________________________Boutton restart______________________________________________________________//

function restart(size){
    randomCase(size);
}
// ______________________________________________________end Boutton restart______________________________________________________________//





// ______________________________________________________Random case when refresh____________________________________________________________//
function random(){
    var x = Math.floor((Math.random() * 100) + 0);
    if(x <= 10){
     x = 4;
     return x;
   }else{
     x = 2;
     return x;
   };
}

function randomCase(size){
    var mynumber = "<p class ='numero'>0</p>";
    var zero = $(".block1").html(mynumber);
    var premier_rand_number = $("#"+Math.floor((Math.random() * size) + 0) +"-"+Math.floor((Math.random() * size) + 0)+"");
    var deux_rand_number = $("#"+Math.floor((Math.random() * size) + 0) +"-"+Math.floor((Math.random() * size) + 0)+"");
    while(premier_rand_number === deux_rand_number){
        deux_rand_number = $("#"+Math.floor((Math.random() * size) + 0) +"-"+Math.floor((Math.random() * size) + 0)+"");
    }
    var randcase = premier_rand_number.html("<p class ='numero'>"+random()+"</p>");   
    var randcase1 = deux_rand_number.html("<p class ='numero'>"+random()+"</p>");   
}

function searchCaseAvailable(size){
    var tab = [];
    for (i = 0; i < size; i++){
        for(j = 0; j < size; j++){
            var cases = $("#"+i+"-"+j+"");
            var cases0 = parseInt(cases.text());
            if(cases0 == 0){
                tab.push("#"+i+"-"+j);
            }
        }
    }
    return tab;
}



function drawCell(size){
    var caseAvailable = searchCaseAvailable(size);
    var randomCase = Math.floor(Math.random() * caseAvailable.length) + 0; 
    var new_case = caseAvailable[randomCase];
    $(new_case).html("<p class ='numero beige'>"+random()+"</p>");

}
// ______________________________________________________end Random case when refresh_________________________________________________________//


// ______________________________________________________stock valeurs_________________________________________________________//



function stockValue(size){
    var bigTab = [];
    for(i = 0; i < size; i++){
        for(j = 0; j < size; j++){
            var case1 = $("#"+i+"-"+j+"");
            var number1 = parseInt(case1.text());
            bigTab.push(number1);
        }
    }
    return bigTab;
}

function arrayIsEqual(size, array1, array2){
    var i;
    for(i = 0; i < size * size; i++){
        if(array1[i] != array2[i]){
                return false;
        }
    }
    return true;
}
// ______________________________________________________end stock valeurs_________________________________________________________//



// ______________________________________________________Action when Keydown______________________________________________________________//
$("body").keydown(function(e) {
    var old_tab = stockValue(size);
    if(e.keyCode == 37) { // left
        moveLeft(size);
    }
    else if(e.keyCode == 39) { // right
        moveRight(size);
    }

    else if(e.keyCode == 38) { // up
        moveUp(size);
    }
    else if(e.keyCode == 40) { // down
        moveDown(size);
    }

    var new_tab = stockValue(size);

    if(!arrayIsEqual(size, old_tab, new_tab)){
        searchCaseAvailable(size);
        drawCell(size);
    } 
    color();
        
    
});
// ______________________________________________________Action when Keydown______________________________________________________________//



// _______________________________________________________________move Down_____________________________________________________________//
function moveDown(size){
    moveAllDown(size);
    sameNumberDown(size);
    moveAllDown(size);
}

function moveAllDown(size) {
    var i;
    var j;
    var l;

    for (l = 0; l < size - 1; l++) {
        for(i = 0 ; i < size ; i++){
            for(j = 0; j < size ; j++){
                var compteur1 = i + 1; 
                if(compteur1 < size){
                    var case1 = $("#"+i+"-"+j+"");
                    var number1 = parseInt(case1.text());
                    var case2 = $("#"+compteur1+"-"+j+"");
                    var number2 = parseInt(case2.text());
                        if(number2 == 0){
                            case1 = case1.html("<p class ='numero'>0</p>");
                            case2 = case2.html("<p class ='numero'>"+number1+"</p>");
                        }
                } 
            }
        }
    }
}

function sameNumberDown(size){
    for(i = 0 ; i < size ; i++){
        for(j = 0; j < size ; j++){
        var compteur1 = i + 1; 
        if(compteur1 < size){
            var case1 = $("#"+i+"-"+j+"");
            var case2 = $("#"+compteur1+"-"+j+"")

            var add = parseInt(case1.text());
            var add1 = parseInt(case2.text());
            var addition = add + add1;
                if(add == add1){
                    case2 = case2.html("<p class ='numero'>"+addition+"</p>");
                    case1 = case1.html("<p class ='numero'>0</p>"); 
                }
            }
        }
    }
}
// ____________________________________________________________end move Down_____________________________________________________________//





// _______________________________________________________________move Up_____________________________________________________________//
function moveUp(size){
    moveAllUp(size);
    sameNumberUp(size);
    moveAllUp(size);
}

function moveAllUp(size) {
    var i;
    var j;
    var l;

    for (l = 0; l < size - 1; l++) {
        for(i = 0 ; i < size ; i++){
            for(j = 0; j < size ; j++){
                var compteur1 = i - 1; 
                if(compteur1 >= 0){
                    var case1 = $("#"+compteur1+"-"+j+"");
                    var number1 = parseInt(case1.text());
                    var case2 = $("#"+i+"-"+j+"");
                    var number2 = parseInt(case2.text());
                        if(number1 == 0){
                            case1 = case1.html("<p class ='numero'>"+number2+"</p>");
                            case2 = case2.html("<p class ='numero'>0</p>");
                        }
                } 
            }
        }
    }
}

function sameNumberUp(size){ 
    var i;
    var j;
    for(i = 0 ; i < size ; i++){
        for(j = 0; j < size ; j++){
        var compteur1 = i - 1; 
        if(compteur1 >= 0){
            var case1 = $("#"+i+"-"+j+"");
            var case2 = $("#"+compteur1+"-"+j+"")

            var add = parseInt(case1.text());
            var add1 = parseInt(case2.text());
            var addition = add + add1;
                if(add == add1){
                    case2 = case2.html("<p class ='numero'>"+addition+"</p>");
                    case1 = case1.html("<p class ='numero'>0</p>"); 
                }
            }
        }
    }
}
// ___________________________________________________________end move Up_____________________________________________________________//






// _______________________________________________________________move Right_____________________________________________________________//

function moveRight(size){
    moveAllRight(size);
    sameNumberRight(size);
    moveAllRight(size);
}

function moveAllRight(size) {
    var i;
    var j;
    var l;

    for (l = 0; l < size - 1; l++) {
        for(i = 0 ; i < size ; i++){
            for(j = 0; j < size ; j++){
                var compteur1 = j - 1; 
                if(compteur1 >= 0){
                    var case1 = $("#"+i+"-"+j+"");
                    var number1 = parseInt(case1.text());
                    var case2 = $("#"+i+"-"+compteur1+"");
                    var number2 = parseInt(case2.text());
                    if(number1 == 0){
                        case1 = case1.html("<p class ='numero'>"+number2+"</p>");
                        case2 = case2.html("<p class ='numero'>0</p>");
                    }
                } 
            }
        }
    }
}



function sameNumberRight(size){
    var i;
    var j;
    for(i = 0 ; i < size ; i++){
        for(j = 0; j < size ; j++){
        var compteur1 = j - 1; 
        if(compteur1 >= 0){
            var case1 = $("#"+i+"-"+j+"");
            var case2 = $("#"+i+"-"+compteur1+"");

            var add = parseInt(case1.text());
            var add1 = parseInt(case2.text());
            var addition = add + add1;
                if(add == add1){
                    case1 = case1.html("<p class ='numero'>"+addition+"</p>");
                    case2 = case2.html("<p class ='numero'>0</p>"); 
                }
            }
        }
    }
}
// _________________________________________________________end move Right_____________________________________________________________//




//_______________________________________________________ move left____________________________________________________________________//
function moveLeft(size){
    moveAllLeft(size);
    sameNumberLeft(size);
    moveAllLeft(size);
}

function moveAllLeft(size) {
    var i;
    var j;
    var l;
    for(l = 0; l < size - 1; l++) {
        for(i = 0 ; i < size ; i++){
            for(j = 0; j < size ; j++){
                var compteur1 = j + 1; 
                var case1 = $("#"+i+"-"+j+"");
                var number1 = parseInt(case1.text());
                var case2 = $("#"+i+"-"+compteur1+"");
                var number2 = parseInt(case2.text());

                if(compteur1 < size){
                    if(number1 == 0){
                        case1 = case1.html("<p class ='numero'>"+number2+"</p>");
                        case2 = case2.html("<p class ='numero'>0</p>");
                    }
                } 
            }
        }
    }
}

function sameNumberLeft(size){
    var i;
    var j;
    for(i = 0 ; i <size ; i++){
        for(j = 0; j < size ; j++){
        var compteur1 = j + 1; 
        if(compteur1 < size){
            var case1 = $("#"+i+"-"+j+"");
            var case2 = $("#"+i+"-"+compteur1+"")
            
            var add = parseInt(case1.text());
            var add1 = parseInt(case2.text());
            
            var addition = add + add1;
                if(add == add1){
                    case1 = case1.html("<p class ='numero'>"+addition+"</p>");
                    case2 = case2.html("<p class ='numero'>0</p>");
                }
            }
        }
    }
}
//___________________________________________________end move left____________________________________________________________________//


drawGrid(size);
randomCase(size);
