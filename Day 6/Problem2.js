#!/usr/bin/env node
function countAnswers(answers){
    var objects = 0;
    for(i in answers){
        objects++;
    }
    return objects;
}
function removeSolo(answers){
    for(i in answers){
        if(answers[i]===1)
            delete answers[i];
        else
            answers[i] = 1;
    }
}

var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split("\n");
//console.log(array);

var answers = {};

var count = 0;
var newline = true;

for(i in array) {
    //console.log("Line: "+array[i]);
    if(array[i] === ""){
        console.log(answers);
        count += countAnswers(answers);
        answers = {};
        newline = true;
    }
    else if(newline){
        newline = false;
        for(j in array[i]){
            var question = array[i][j];
            answers[question]=1;
        }
    }
    else{
        for(j in array[i]){
            var question = array[i][j];
            //Mark every shared answer with 2
            if(answers[question]!==null && answers[question]===1){
                answers[question]=2;
            }
        }
        //remove unmarked answers and reset object
        removeSolo(answers);
    }
}
count += countAnswers(answers);
console.log("🎄🎫🎄: "+count);