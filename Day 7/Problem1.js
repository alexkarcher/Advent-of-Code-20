#!/usr/bin/env node
function countAnswers(answers){
    var objects = 0;
    for(i in answers){
        objects++;
    }
    return objects;
}
var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split("\n");
//console.log(array);

var answers = {};

var count = 0;

for(i in array) {
    //console.log("Line: "+array[i]);
    if(array[i] === ""){
        console.log(answers);
        count += countAnswers(answers);
        answers = {};
    }
    else{
        for(j in array[i]){
            var question = array[i][j];
            answers[question]=1;
        }
    }
}
count += countAnswers(answers);
console.log("🎄🎫🎄: "+count);