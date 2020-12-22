#!/usr/bin/env node

function checkifValid(array,range,location){
    for(let loc = location-range; loc<location; loc++){
        for(let rambler = loc+1; rambler<location; rambler++){
            if(array[loc]+array[rambler]===array[location])return true;
        }
    }
    return false;
}


var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split("\n");

for(i in array){
    array[i]=parseInt(array[i]);
}

var preamble = 25

for(let i = preamble; i<array.length; i++){
    if(!checkifValid(array,preamble,i))
        console.log("🤫🤫🤫" + array[i]);
}