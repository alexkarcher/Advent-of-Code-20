#!/usr/bin/env node
var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split("\n");
console.log(array);
var answers = [];

var validpasswords = 0;

for(i = 0; i < array.length; i++) {
    var policy = array[i].split(" ");

    var range = policy[0].split("-");
    var lower = range[0];
    var upper = range[1];

    var letter = policy[1].substring(0,1);

    var password = policy[2];

    var counter = 0
    for(j = 0; j< password.length; j++){
        if(password.substring(j,j+1) === letter)
            counter++;
    }
    if(counter>=lower && counter <= upper){
        console.log("🎄🎄🎄"+password);
        validpasswords++;
    }
        
}

console.log("Valid Passwords: "+validpasswords);