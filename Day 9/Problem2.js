#!/usr/bin/env node

function checkifValid(array,range,location){
    for(let loc = location-range; loc<location; loc++){
        for(let rambler = loc+1; rambler<location; rambler++){
            if(array[loc]+array[rambler]===array[location])return true;
        }
    }
    return false;
}

function sumArray(array, min, max){
    let answer = 0;
    for(let i=min; i<=max; i++){
        answer+=array[i];
    }
    return answer;
}
function compareNumbers(a, b) {
    return a - b;
  }

var fs = require('fs');
var array = fs.readFileSync('my-file.txt').toString().split("\n");

for(i in array){
    array[i]=parseInt(array[i]);
}

var preamble = 25
var secretcode;

for(let i = preamble; i<array.length; i++){
    if(!checkifValid(array,preamble,i)){
        console.log("🤫🤫🤫" + array[i]);
        secretcode = array[i];
    }       
}

for(let j = 0; j<array.length; j++){
    //console.log("🎁 "+array[j]);
    for(let q = j+1; q<array.length; q++){
        if(sumArray(array,j,q)===secretcode){
            let answers = [];
            for(let p = j; p<=q; p++) answers.push(array[p]);
            answers.sort(compareNumbers);
            console.log("🤫🎅🤫" + (answers[0]+answers[answers.length-1]))
    }

    
    }
}